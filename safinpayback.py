from datetime import datetime, timedelta, timezone
import json
import os
import secrets
import hashlib
from threading import Lock
from mimetypes import guess_type
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import psycopg
from psycopg.rows import dict_row
import requests
from werkzeug.security import check_password_hash, generate_password_hash
DATABASE_URL = os.getenv("DATABASE_URL")
app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv('DATABASE_URL', '')
MAX_CACHED_PRODUCTS = 20
BACKEND_PUBLIC_URL = os.getenv('BACKEND_PUBLIC_URL', 'https://safinpaybackend-production.up.railway.app').rstrip('/')
ACCESS_TOKEN_TTL_HOURS = 24
REFRESH_TOKEN_TTL_DAYS = 30
CACHE_LOCK = Lock()
APP_CACHE = {
    'loaded_at': None,
    'products': [],
    'products_by_id': {},
    'boutiques_by_id': {},
    'categories': [],
    'images_by_product_id': {},
    'images_by_source': {},
    'ready': False,
    'last_error': None,
}

DEFAULT_PRODUCT_IMAGE = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E"
    "%3Crect width='800' height='800' fill='%23f2f4f8'/%3E"
    "%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%23909aa6' font-size='28'%3E"
    "Produit SafinPay%3C/text%3E%3C/svg%3E"
)


def get_db_connection():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL manquant dans .env.local")
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


def _fetch_all(sql, params=None):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params or {})
            return cur.fetchall()


def _fetch_one(sql, params=None):
    rows = _fetch_all(sql, params)
    return rows[0] if rows else None


def _utcnow():
    return datetime.now(timezone.utc)


def _hash_token(token):
    return hashlib.sha256(token.encode('utf-8')).hexdigest()


def _new_public_id(prefix):
    return prefix + secrets.token_hex(7)


def _normalize_role(role):
    value = (role or 'client').strip().lower()
    if value in ('vendeur', 'seller', 'vendor'):
        return 'seller'
    return 'client'


def _role_table(role):
    return 'vendeur' if _normalize_role(role) == 'seller' else 'client'


def _role_name_fields(role):
    if _normalize_role(role) == 'seller':
        return 'nomvendeur', 'prenomvendeur'
    return 'nomclient', 'prenomclient'


def _role_email_field(role):
    return 'emailvendeur' if _normalize_role(role) == 'seller' else 'emailclient'


def _role_phone_field(role):
    return 'telephonevendeur' if _normalize_role(role) == 'seller' else 'telephoneclient'


def _role_password_field(role):
    return 'passwordvendeur' if _normalize_role(role) == 'seller' else 'passwordclient'


def _role_id_field(role):
    return 'idvendeur' if _normalize_role(role) == 'seller' else 'idclient'


def _table_label(role):
    return 'vendeur' if _normalize_role(role) == 'seller' else 'client'


def _admin_email_allowlist():
    raw_emails = os.getenv('ADMIN_EMAILS', os.getenv('ADMIN_EMAIL', ''))
    return {email.strip().lower() for email in raw_emails.split(',') if email.strip()}


def _is_superuser_user(user_row, role):
    email = (_pick(user_row, _role_email_field(role), default='') or '').strip().lower()
    if not email:
        return False

    allowlist = _admin_email_allowlist()
    if allowlist:
        return email in allowlist

    return email.startswith('admin')


def _ensure_auth_schema():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('''
                CREATE TABLE IF NOT EXISTS auth_sessions (
                    session_id varchar(32) PRIMARY KEY,
                    user_role varchar(20) NOT NULL,
                    user_id varchar(15) NOT NULL,
                    access_token_hash varchar(64) NOT NULL UNIQUE,
                    refresh_token_hash varchar(64) NOT NULL UNIQUE,
                    access_expires_at timestamptz NOT NULL,
                    refresh_expires_at timestamptz NOT NULL,
                    revoked_at timestamptz,
                    created_at timestamptz NOT NULL DEFAULT NOW()
                )
            ''')
            cur.execute('CREATE INDEX IF NOT EXISTS auth_sessions_access_token_hash_idx ON auth_sessions(access_token_hash)')
            cur.execute('CREATE INDEX IF NOT EXISTS auth_sessions_refresh_token_hash_idx ON auth_sessions(refresh_token_hash)')
            cur.execute('ALTER TABLE client ALTER COLUMN passwordclient TYPE varchar(255)')
            cur.execute('ALTER TABLE vendeur ALTER COLUMN passwordvendeur TYPE varchar(255)')
        conn.commit()


def _lookup_user_by_identifier(role, identifier):
    table = _table_label(role)
    email_field = _role_email_field(role)
    phone_field = _role_phone_field(role)
    query = f'''
        SELECT *
        FROM {table}
        WHERE LOWER(COALESCE({email_field}, '')) = LOWER(%s)
           OR COALESCE({phone_field}, '') = %s
        LIMIT 1
    '''
    return _fetch_one(query, (identifier, identifier))


def _lookup_user_by_email_any_role(email):
    client = _fetch_one('SELECT * FROM client WHERE LOWER(COALESCE(emailclient, \'\')) = LOWER(%s) LIMIT 1', (email,))
    if client:
        return 'client', client
    seller = _fetch_one('SELECT * FROM vendeur WHERE LOWER(COALESCE(emailvendeur, \'\')) = LOWER(%s) LIMIT 1', (email,))
    if seller:
        return 'seller', seller
    return None, None


def _lookup_user_by_id(role, user_id):
    table = _table_label(role)
    return _fetch_one(f'SELECT * FROM {table} WHERE {_role_id_field(role)} = %s LIMIT 1', (user_id,))


def _lookup_boutique_by_vendor_id(vendor_id):
    return _fetch_one('SELECT * FROM boutique WHERE idvendeur = %s ORDER BY datecreationboutique DESC NULLS LAST LIMIT 1', (vendor_id,))


def _user_full_name(user_row, role):
    first_name_field, last_name_field = _role_name_fields(role)
    first_name = _pick(user_row, first_name_field, default='') or ''
    last_name = _pick(user_row, last_name_field, default='') or ''
    full_name = ' '.join(part for part in [first_name, last_name] if part).strip()
    if full_name:
        return full_name
    return _pick(user_row, first_name_field, default='Utilisateur') or 'Utilisateur'


def _serialize_user(role, user_row):
    if not user_row:
        return None
    normalized_role = _normalize_role(role)
    email = _pick(user_row, _role_email_field(normalized_role), default='')
    phone = _pick(user_row, _role_phone_field(normalized_role), default='')
    user_id = _pick(user_row, _role_id_field(normalized_role), default='')
    boutique = _lookup_boutique_by_vendor_id(user_id) if normalized_role == 'seller' else None
    seller_id = _pick(boutique, 'idboutique', default=None) if boutique else None
    shop_name = _pick(boutique, 'nomboutique', default='') if boutique else ''

    return {
        'id': str(user_id),
        'email': email,
        'phone': phone,
        'first_name': _pick(user_row, _role_name_fields(normalized_role)[0], default='') or '',
        'last_name': _pick(user_row, _role_name_fields(normalized_role)[1], default='') or '',
        'name': _user_full_name(user_row, normalized_role),
        'role': normalized_role,
        'is_seller': normalized_role == 'seller',
        'is_superuser': _is_superuser_user(user_row, normalized_role),
        'seller_id': seller_id,
        'shop_name': shop_name,
        'raw': _json_safe_value(user_row),
    }


def _create_session(role, user_row):
    access_token = secrets.token_urlsafe(32)
    refresh_token = secrets.token_urlsafe(48)
    session_id = _new_public_id('S')
    now = _utcnow()
    access_expires_at = now + timedelta(hours=ACCESS_TOKEN_TTL_HOURS)
    refresh_expires_at = now + timedelta(days=REFRESH_TOKEN_TTL_DAYS)
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO auth_sessions (
                       session_id, user_role, user_id,
                       access_token_hash, refresh_token_hash,
                       access_expires_at, refresh_expires_at, revoked_at, created_at
                   ) VALUES (%s, %s, %s, %s, %s, %s, %s, NULL, %s)''',
                (
                    session_id,
                    _normalize_role(role),
                    str(_pick(user_row, _role_id_field(role), default='')),
                    _hash_token(access_token),
                    _hash_token(refresh_token),
                    access_expires_at,
                    refresh_expires_at,
                    now,
                )
            )
        conn.commit()
    return {
        'access': access_token,
        'refresh': refresh_token,
        'expires_at': access_expires_at.isoformat(),
        'refresh_expires_at': refresh_expires_at.isoformat(),
    }


def _ensure_cart_for_client(client_id):
    cart = _fetch_one('SELECT * FROM panier WHERE idclient = %s LIMIT 1', (client_id,))
    if cart:
        return cart

    cart_id = _new_public_id('P')
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO panier (idpanier, idclient, quantiteproduitpanier) VALUES (%s, %s, %s)',
                (cart_id, client_id, 0)
            )
        conn.commit()
    return _fetch_one('SELECT * FROM panier WHERE idpanier = %s LIMIT 1', (cart_id,))


def _cart_items_with_totals(client_id):
    rows = _cart_product_rows(client_id)
    items = []
    subtotal = 0
    for row in rows:
        quantity = int(_pick(row, 'nbproduitajout', default=1) or 1)
        price = float(_pick(row, 'prixproduit', default=0) or 0)
        line_total = round(price * quantity, 2)
        subtotal += line_total
        items.append({
            'row': row,
            'quantity': quantity,
            'unit_price': price,
            'line_total': line_total,
        })
    return items, round(subtotal, 2)


def _compute_checkout_totals(client_id):
    _items, subtotal = _cart_items_with_totals(client_id)
    shipping = 0 if subtotal > 500000 else 5000
    tax = round(subtotal * 0.18)
    total = round(subtotal + shipping + tax)
    return {
        'subtotal': subtotal,
        'shipping': shipping,
        'tax': tax,
        'total': total,
    }


def _ensure_default_livreur():
    livreur_id = 'LIVDEF001'
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO livreur (
                       idlivreur, nomprenomlivreur, emaillivreur, passwordlivreur,
                       adresselivreur, telephonelivreur, descriptionlivreur
                   ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                   ON CONFLICT (idlivreur) DO UPDATE SET
                       nomprenomlivreur = EXCLUDED.nomprenomlivreur,
                       emaillivreur = EXCLUDED.emaillivreur,
                       passwordlivreur = EXCLUDED.passwordlivreur,
                       adresselivreur = EXCLUDED.adresselivreur,
                       telephonelivreur = EXCLUDED.telephonelivreur,
                       descriptionlivreur = EXCLUDED.descriptionlivreur''',
                (
                    livreur_id,
                    'SafinPay Livraison',
                    'livraison@safinpay.local',
                    generate_password_hash('default123'),
                    'En ligne',
                    '+237650000000',
                    'Livreur fictif automatique pour les commandes SafinPay',
                )
            )
        conn.commit()
    return livreur_id


def _create_checkout_address(client_id, form_data, order_code):
    codeadresse = f'A{str(order_code).zfill(14)}'[:15]
    lieux = ' - '.join(part for part in [form_data.get('address') or '', form_data.get('city') or '', form_data.get('country') or ''] if part).strip() or 'Adresse client'
    contact = form_data.get('phone') or ''
    description = form_data.get('country') or form_data.get('address') or 'Adresse de commande'

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO adresse (codeadresse, idclient, lieuxadresse, contactadresse, description, nbadresse)
                   VALUES (%s, %s, %s, %s, %s, %s)
                   ON CONFLICT (codeadresse) DO UPDATE SET
                       idclient = EXCLUDED.idclient,
                       lieuxadresse = EXCLUDED.lieuxadresse,
                       contactadresse = EXCLUDED.contactadresse,
                       description = EXCLUDED.description,
                       nbadresse = EXCLUDED.nbadresse''',
                (codeadresse, client_id, lieux, contact, description, 1)
            )
        conn.commit()

    return codeadresse


def _create_livraison_record(order_code, codeadresse, shipping_fee):
    idlivraison = f'L{str(order_code).zfill(14)}'[:15]
    idlivreur = _ensure_default_livreur()
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO livraison (idlivraison, idlivreur, codeadresse, datelivraison, commissionlivraison)
                   VALUES (%s, %s, %s, %s, %s)
                   ON CONFLICT (idlivraison) DO UPDATE SET
                       idlivreur = EXCLUDED.idlivreur,
                       codeadresse = EXCLUDED.codeadresse,
                       datelivraison = EXCLUDED.datelivraison,
                       commissionlivraison = EXCLUDED.commissionlivraison''',
                (idlivraison, idlivreur, codeadresse, _utcnow().date(), int(shipping_fee or 0))
            )
        conn.commit()
    return idlivraison


def _create_payment_record(order_code, client_id, payment_method, amount_total):
    idpayement = f'P{str(order_code).zfill(14)}'[:15]
    today = _utcnow().date()
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO payement (
                       idpayement, idclient, typepayement, methodepayement, datepayement, statuspayement, etaspayement
                   ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                   ON CONFLICT (idpayement) DO UPDATE SET
                       idclient = EXCLUDED.idclient,
                       typepayement = EXCLUDED.typepayement,
                       methodepayement = EXCLUDED.methodepayement,
                       datepayement = EXCLUDED.datepayement,
                       statuspayement = EXCLUDED.statuspayement,
                       etaspayement = EXCLUDED.etaspayement''',
                (idpayement, client_id, payment_method, payment_method, today, 'paid', 'paid')
            )
        conn.commit()
    return idpayement


def _next_order_code():
    row = _fetch_one('SELECT COALESCE(MAX(codecommande), 0) + 1 AS next_code FROM commande')
    return int(_pick(row, 'next_code', default=1) or 1)


def _serialize_order(order_row):
    cart_id = _pick(order_row, 'idpanier', default='')
    items_rows = _fetch_all(
        '''SELECT
               c.idproduit,
               c.idpanier,
               c.dateajoutp,
               c.nbproduitajout,
               c.heurajoutp,
               p.*,
               b.nomboutique AS boutique_nomboutique,
               b.idvendeur AS boutique_idvendeur
           FROM constituer c
           JOIN produit p ON p.idproduit = c.idproduit
           LEFT JOIN boutique b ON b.idboutique = p.idboutique
           WHERE c.idpanier = %s
           ORDER BY c.dateajoutp DESC NULLS LAST, c.heurajoutp DESC NULLS LAST, c.idproduit''',
        (cart_id,)
    )
    items = []
    for row in items_rows:
        quantity = int(_pick(row, 'nbproduitajout', default=1) or 1)
        product = _normalize_product(row)
        price = float(_pick(row, 'prixproduit', default=0) or 0)
        items.append({
            'product': product,
            'product_name': product.get('name') or product.get('title') or '',
            'quantity': quantity,
            'price': price,
            'line_total': round(price * quantity, 2),
        })

    return {
        'id': int(_pick(order_row, 'codecommande', default=0) or 0),
        'created_at': _pick(order_row, 'datecommande', default=None).isoformat() if hasattr(_pick(order_row, 'datecommande', default=None), 'isoformat') else str(_pick(order_row, 'datecommande', default='')),
        'status': (_pick(order_row, 'statuscommande', default='pending') or 'pending').lower(),
        'total_price': int(_pick(order_row, 'montantcommande', default=0) or 0),
        'cart_id': cart_id,
        'payment_id': _pick(order_row, 'idpayement', default=''),
        'delivery_id': _pick(order_row, 'idlivraison', default=''),
        'items': items,
    }


def _get_client_orders(client_id):
    rows = _fetch_all(
        '''SELECT c.*
           FROM commande c
           JOIN panier p ON p.idpanier = c.idpanier
           WHERE p.idclient = %s
           ORDER BY c.codecommande DESC''',
        (client_id,)
    )
    return [_serialize_order(row) for row in rows]


def _get_order_for_client(client_id, order_id):
    row = _fetch_one(
        '''SELECT c.*
           FROM commande c
           JOIN panier p ON p.idpanier = c.idpanier
           WHERE p.idclient = %s AND c.codecommande = %s
           LIMIT 1''',
        (client_id, order_id)
    )
    return _serialize_order(row) if row else None


def _cart_product_rows(client_id):
    return _fetch_all(
        '''SELECT
               c.idpanier,
               c.idproduit,
               c.dateajoutp,
               c.nbproduitajout,
               c.heurajoutp,
               p.*,
               b.nomboutique AS boutique_nomboutique,
               b.idvendeur AS boutique_idvendeur
           FROM panier pa
           JOIN constituer c ON c.idpanier = pa.idpanier
           JOIN produit p ON p.idproduit = c.idproduit
           LEFT JOIN boutique b ON b.idboutique = p.idboutique
           WHERE pa.idclient = %s
           ORDER BY c.dateajoutp DESC NULLS LAST, c.heurajoutp DESC NULLS LAST, c.idproduit''',
        (client_id,)
    )


def _serialize_cart(client_id):
    cart = _ensure_cart_for_client(client_id)
    rows = _cart_product_rows(client_id)
    items = []
    total_quantity = 0
    for row in rows:
        quantity = int(_pick(row, 'nbproduitajout', default=1) or 1)
        total_quantity += quantity
        product = _normalize_product(row)
        added_at = _pick(row, 'dateajoutp', default=None)
        added_time = _pick(row, 'heurajoutp', default=None)
        items.append({
            'product': product,
            'quantity': quantity,
            'added_at': added_at.isoformat() if hasattr(added_at, 'isoformat') else (str(added_at) if added_at is not None else ''),
            'added_time': added_time.isoformat() if hasattr(added_time, 'isoformat') else (str(added_time) if added_time is not None else ''),
        })

    return {
        'cart_id': _pick(cart, 'idpanier', default=''),
        'client_id': client_id,
        'total_quantity': total_quantity,
        'items': items,
    }


def _get_client_id_from_auth():
    auth_result = _require_auth(optional=False)
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    session, user_row, _token = auth_result
    if _normalize_role(session['user_role']) != 'client':
        return jsonify({'detail': 'Le panier est réservé aux clients'}), 403
    client_id = _pick(user_row, 'idclient', default='')
    if not client_id:
        return jsonify({'detail': 'Client introuvable'}), 404
    return session, user_row, client_id


def _get_session_by_access_token(token):
    return _fetch_one(
        '''SELECT * FROM auth_sessions
           WHERE access_token_hash = %s
             AND revoked_at IS NULL
             AND access_expires_at > NOW()
           LIMIT 1''',
        (_hash_token(token),)
    )


def _get_session_by_refresh_token(token):
    return _fetch_one(
        '''SELECT * FROM auth_sessions
           WHERE refresh_token_hash = %s
             AND revoked_at IS NULL
             AND refresh_expires_at > NOW()
           LIMIT 1''',
        (_hash_token(token),)
    )


def _revoke_session_by_access_token(token):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE auth_sessions SET revoked_at = NOW() WHERE access_token_hash = %s AND revoked_at IS NULL',
                (_hash_token(token),)
            )
        conn.commit()


def _require_auth(optional=False):
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None if optional else (jsonify({'error': 'Authentification requise'}), 401)
    token = auth_header.split(' ', 1)[1].strip()
    if not token:
        return None if optional else (jsonify({'error': 'Authentification requise'}), 401)
    session = _get_session_by_access_token(token)
    if not session:
        return None if optional else (jsonify({'error': 'Session expirée'}), 401)
    user = _lookup_user_by_id(session['user_role'], session['user_id'])
    if not user:
        return None if optional else (jsonify({'error': 'Utilisateur introuvable'}), 401)
    return session, user, token


def _upsert_boutique_for_vendor(vendor_id, shop_name, description='', address=''):
    existing = _lookup_boutique_by_vendor_id(vendor_id)
    payload = {
        'idboutique': _pick(existing, 'idboutique', default=_new_public_id('B')) if existing else _new_public_id('B'),
        'idvendeur': vendor_id,
        'nomboutique': shop_name,
        'descriptionboutique': description or '',
        'adresseboutique': address or '',
        'mentionverifierboutique': False,
        'datecreationboutique': _utcnow().date(),
    }
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            if existing:
                cur.execute(
                    '''UPDATE boutique
                       SET nomboutique = %s,
                           descriptionboutique = %s,
                           adresseboutique = %s
                       WHERE idboutique = %s''',
                    (
                        payload['nomboutique'],
                        payload['descriptionboutique'],
                        payload['adresseboutique'],
                        payload['idboutique'],
                    )
                )
            else:
                cur.execute(
                    '''INSERT INTO boutique (
                           idboutique, idvendeur, nomboutique, descriptionboutique,
                           adresseboutique, mentionverifierboutique, datecreationboutique
                       ) VALUES (%s, %s, %s, %s, %s, %s, %s)''',
                    (
                        payload['idboutique'],
                        payload['idvendeur'],
                        payload['nomboutique'],
                        payload['descriptionboutique'],
                        payload['adresseboutique'],
                        payload['mentionverifierboutique'],
                        payload['datecreationboutique'],
                    )
                )
        conn.commit()
    return payload


def _create_user(role, first_name, last_name, email, password, phone):
    normalized_role = _normalize_role(role)
    table = _table_label(normalized_role)
    user_id = _new_public_id('V' if normalized_role == 'seller' else 'C')
    password_hash = generate_password_hash(password)
    now_date = _utcnow().date()
    first_field, last_field = _role_name_fields(normalized_role)
    email_field = _role_email_field(normalized_role)
    phone_field = _role_phone_field(normalized_role)
    password_field = _role_password_field(normalized_role)
    id_field = _role_id_field(normalized_role)

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            if normalized_role == 'seller':
                cur.execute(
                    f'''INSERT INTO {table} (
                           {id_field}, {first_field}, {last_field}, {email_field},
                           {password_field}, {phone_field}, mentionverifiervendeur,
                           date_heurinscriptionvendeur, date_heureupdatevendeur
                       ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                    (user_id, first_name, last_name, email, password_hash, phone, False, now_date, now_date)
                )
            else:
                cur.execute(
                    f'''INSERT INTO {table} (
                           {id_field}, {first_field}, {last_field}, {email_field},
                           {password_field}, {phone_field}, date_heureinscriptionclient, dateupdateclient
                       ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
                    (user_id, first_name, last_name, email, password_hash, phone, now_date, now_date)
                )
        conn.commit()

    return _lookup_user_by_id(normalized_role, user_id)


def _authenticate_user(identifier, password, role):
    normalized_role = _normalize_role(role)
    user_row = _lookup_user_by_identifier(normalized_role, identifier)
    if not user_row:
        return None
    stored_password = _pick(user_row, _role_password_field(normalized_role), default='') or ''
    if not check_password_hash(stored_password, password):
        return None
    return user_row


def _fetch_products_raw(limit=None):
    sql = '''SELECT
                 p.idproduit,
                 p.idboutique,
                 p.nomproduit,
                 p.descriptionproduit,
                 p.quantiteminproduit,
                 p.quantitestockproduit,
                 p.prixproduit,
                 p.date_heureajoutproduit,
                 b.nomboutique AS boutique_nomboutique,
                 b.idvendeur AS boutique_idvendeur
             FROM produit p
             LEFT JOIN boutique b ON b.idboutique = p.idboutique
             ORDER BY p.idproduit'''
    if limit is not None:
        sql += ' LIMIT %s'
        return _fetch_all(sql, (limit,))
    return _fetch_all(sql)


def _fetch_boutiques_raw():
    return _fetch_all('SELECT * FROM boutique ORDER BY idboutique')


def _bucket_category(title="", description="", db_category_name=""):
    text = f"{title} {description} {db_category_name}".lower()
    if any(word in text for word in ['smartphone', 'téléphone', 'phone', 'samsung', 'xiaomi', 'zte', 'iphone', 'huawei', 'oppo', 'tecno', 'infinix', 'android', '4g', '5g', 'modem', 'wifi', 'laptop', 'ordinateur', 'pc', 'tablette', 'écouteur', 'earphone', 'tv', 'télévision', 'cinéma', 'console', 'playstation', 'xbox', 'ram', 'ssd', 'hdd', 'cpu', 'gpu', 'router']):
        return 'Électronique'
    if any(word in text for word in ['vêtement', 'robe', 'chemise', 'pantalon', 'jupe', 'pull', 'manteau', 'pagne', 'tissu', 'tenue', 'habit', 'chaussure', 'basket', 'sac']):
        return 'Vêtements'
    if any(word in text for word in ['livre', 'roman', 'manuel', 'dictionnaire', 'scolaire', 'bande dessinée']):
        return 'Livres'
    if any(word in text for word in ['riz', 'pâte', 'spaghetti', 'maïs', 'farine', 'sucre', 'sel', 'huile', 'lait', 'yaourt', 'céréale', 'cerelac', 'nido', 'biscuit', 'café', 'thé', 'jus', 'boisson', 'whisky', 'bière', 'eau', 'nourriture', 'alimentation', 'savon', 'déo', 'shampoing', 'nettoyage', 'drap', 'oreiller', 'électroménager', 'electromenager', 'cuisine']):
        return 'Maison'
    if any(word in text for word in ['guitare', 'piano', 'sport', 'football', 'basketball', 'vélo', 'fitness', 'yoga']):
        return 'Sports'
    return 'Maison'


def _pick(record, *keys, default=None):
    if not record:
        return default
    for key in keys:
        for actual_key, value in record.items():
            if actual_key.lower() == key.lower():
                return value
    return default


def _json_safe_value(value):
    if isinstance(value, dict):
        return {key: _json_safe_value(item) for key, item in value.items()}
    if isinstance(value, list):
        return [_json_safe_value(item) for item in value]
    if hasattr(value, 'isoformat'):
        return value.isoformat()
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    return str(value)


def _is_image_url(value):
    return isinstance(value, str) and value.startswith(('http://', 'https://', 'data:image/'))


def _image_source(product):
    source = _pick(
        product,
        'imagecouvertureproduit',
        'imageproduit',
        'image',
        'imageurl',
        'img',
        default=None,
    )
    if _is_image_url(source):
        return source
    images = _pick(product, 'images', default=None)
    if isinstance(images, list) and images:
        first = images[0]
        if _is_image_url(first):
            return first
    return DEFAULT_PRODUCT_IMAGE


def _product_image(product):
    product_id = str(_pick(product, 'idproduit', default=''))
    if product_id:
        local_path = f'{BACKEND_PUBLIC_URL}/api/images/{product_id}'
        APP_CACHE['images_by_product_id'][product_id] = local_path
        return local_path

    source = _image_source(product)
    return source if source else DEFAULT_PRODUCT_IMAGE


def _normalize_product(product, shop_lookup=None):
    product_id = _pick(product, 'idproduit', default='')
    title = _pick(product, 'nomproduit', default='Produit sans titre')
    description = _pick(product, 'descriptionproduit', default='')
    price = _pick(product, 'prixproduit', default=0) or 0
    db_category = _pick(product, 'nomcathegorieproduit', 'category_name', default='')
    category = _bucket_category(title, description, db_category)
    seller_name = _pick(product, 'boutique_nomboutique', 'nomboutique', default='SafinPay')
    seller_id = _pick(product, 'boutique_idvendeur', 'idvendeur', default=None)

    return {
        'id': str(product_id),
        'title': title,
        'name': title,
        'price': float(price) if str(price).strip() else 0,
        'description': description,
        'image': _product_image(product),
        'images': [_product_image(product)],
        'url': f'/product/{product_id}' if product_id else '#',
        'externalUrl': None,
        'category': category,
        'category_name': db_category or category,
        'seller_id': seller_id,
        'seller_shop_name': seller_name,
        'seller_name': seller_name,
        'reviews_count': 0,
        'discount': 0,
        'stock': _pick(product, 'quantitestockproduit', default=0),
        'min_quantity': _pick(product, 'quantiteminproduit', default=0),
        'raw': _json_safe_value(product),
    }


def _serialize_review(review_row):
    if not review_row:
        return None

    client_id = _pick(review_row, 'idclient', default='')
    client_row = _fetch_one('SELECT * FROM client WHERE idclient = %s LIMIT 1', (client_id,)) if client_id else None
    buyer_name = _user_full_name(client_row, 'client') if client_row else 'Utilisateur'
    rating = _pick(review_row, 'noteavis', default=5)
    comment = _pick(review_row, 'commentaireavis', default='') or ''
    posted_at = _pick(review_row, 'dateposteavis', default=None)

    if rating is None or str(rating).strip() == '':
        rating = 5

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        rating = 5

    return {
        'id': str(_pick(review_row, 'idavis', default='')),
        'product_id': str(_pick(review_row, 'idproduit', default='')),
        'shop_id': str(_pick(review_row, 'idboutique', default='')),
        'client_id': str(client_id),
        'buyer_name': buyer_name,
        'rating': rating,
        'title': 'Avis client',
        'comment': comment,
        'date': posted_at.isoformat() if hasattr(posted_at, 'isoformat') else (str(posted_at) if posted_at else None),
        'verified_purchase': True,
    }


def _download_image(source):
    if not _is_image_url(source) or source.startswith('data:image/'):
        return source.encode('utf-8'), 'image/svg+xml; charset=utf-8'

    response = requests.get(source, timeout=10)
    response.raise_for_status()
    content_type = response.headers.get('Content-Type') or guess_type(source)[0] or 'application/octet-stream'
    return response.content, content_type


def _escape_pdf_text(value):
    return str(value).replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')


def _build_receipt_pdf(lines, title='Reçu de paiement SafinPay'):
    content_parts = [
        'BT',
        '/F1 18 Tf',
        '72 800 Td',
        f'({_escape_pdf_text(title)}) Tj',
        '/F1 11 Tf',
    ]

    first_body_line = True
    for line in lines:
        safe_line = _escape_pdf_text(line)
        if first_body_line:
            content_parts.extend(['0 -28 Td', f'({safe_line}) Tj'])
            first_body_line = False
        else:
            content_parts.extend(['0 -16 Td', f'({safe_line}) Tj'])

    content_parts.append('ET')
    content_stream = '\n'.join(content_parts).encode('utf-8')

    objects = []
    objects.append(b'1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n')
    objects.append(b'2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n')
    objects.append(
        b'3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] '
        b'/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj\n'
    )
    objects.append(b'4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n')
    objects.append(
        f'5 0 obj << /Length {len(content_stream)} >> stream\n'.encode('utf-8')
        + content_stream
        + b'\nendstream\nendobj\n'
    )

    pdf = bytearray()
    pdf.extend(b'%PDF-1.4\n')
    offsets = [0]
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)

    xref_offset = len(pdf)
    pdf.extend(f'xref\n0 {len(offsets)}\n'.encode('utf-8'))
    pdf.extend(b'0000000000 65535 f \n')
    for offset in offsets[1:]:
        pdf.extend(f'{offset:010d} 00000 n \n'.encode('utf-8'))
    pdf.extend(
        b'trailer << /Size '
        + str(len(offsets)).encode('utf-8')
        + b' /Root 1 0 R >>\nstartxref\n'
        + str(xref_offset).encode('utf-8')
        + b'\n%%EOF'
    )
    return bytes(pdf)


def get_products_payload():
    if APP_CACHE['ready']:
        return APP_CACHE['products']

    products = _fetch_products_raw(MAX_CACHED_PRODUCTS)
    return [_normalize_product(product) for product in products]


def _search_products_from_cache(query_text='', category='', price_range='', limit=None):
    normalized_query = _normalize_search_text(query_text)
    normalized_category = _normalize_search_text(category)
    requested_limit = int(limit) if limit is not None else None
    results = []

    for product in APP_CACHE['products']:
        if normalized_category and _normalize_search_text(product.get('category', '')) != normalized_category:
            continue
        if price_range and not _matches_price_range(product.get('price', 0), price_range):
            continue

        if normalized_query:
            search_text = product.get('search_text') or _normalize_search_text(
                f"{product.get('title', '')} {product.get('description', '')} {product.get('seller_shop_name', '')} {product.get('category', '')}"
            )
            if normalized_query not in search_text:
                continue
            score = 2
            if search_text.startswith(normalized_query):
                score = 0
            elif normalized_query in (product.get('title', '') or '').lower():
                score = 1
            results.append((score, product))
        else:
            results.append((0, product))

    results.sort(key=lambda item: (item[0], item[1].get('name', '')))
    payload = [item[1] for item in results]
    if requested_limit is not None:
        return payload[:requested_limit]
    return payload


def _price_range_bounds(price_range):
    if price_range == '0-10000':
        return 0, 10000
    if price_range == '10000-50000':
        return 10000, 50000
    if price_range == '50000-200000':
        return 50000, 200000
    if price_range == '200000+':
        return 200000, None
    return None, None


def _matches_price_range(price_value, price_range):
    min_price, max_price = _price_range_bounds(price_range)
    if min_price is None and max_price is None:
        return True
    try:
        numeric_price = float(price_value or 0)
    except (TypeError, ValueError):
        return False
    if max_price is None:
        return numeric_price >= min_price
    return min_price <= numeric_price <= max_price

def _normalize_search_text(value):
    if not value:
        return ''
    return ' '.join(str(value).strip().lower().split())


def _sql_category_case():
    return "CASE WHEN (LOWER(COALESCE(p.nomproduit, '')) || ' ' || LOWER(COALESCE(p.descriptionproduit, '')) || ' ' || LOWER(COALESCE(p.nomcathegorieproduit, ''))) ~ '(smartphone|téléphone|phone|samsung|xiaomi|zte|iphone|huawei|oppo|tecno|infinix|android|4g|5g|modem|wifi|laptop|ordinateur|pc|tablette|écouteur|earphone|tv|télévision|cinéma|console|playstation|xbox|ram|ssd|hdd|cpu|gpu|router)' THEN 'électronique' WHEN (LOWER(COALESCE(p.nomproduit, '')) || ' ' || LOWER(COALESCE(p.descriptionproduit, '')) || ' ' || LOWER(COALESCE(p.nomcathegorieproduit, ''))) ~ '(vêtement|robe|chemise|pantalon|jupe|pull|manteau|pagne|tissu|tenue|habit|chaussure|basket|sac)' THEN 'vêtements' WHEN (LOWER(COALESCE(p.nomproduit, '')) || ' ' || LOWER(COALESCE(p.descriptionproduit, '')) || ' ' || LOWER(COALESCE(p.nomcathegorieproduit, ''))) ~ '(livre|roman|manuel|dictionnaire|scolaire|bande dessinée)' THEN 'livres' WHEN (LOWER(COALESCE(p.nomproduit, '')) || ' ' || LOWER(COALESCE(p.descriptionproduit, '')) || ' ' || LOWER(COALESCE(p.nomcathegorieproduit, ''))) ~ '(riz|pâte|spaghetti|maïs|farine|sucre|sel|huile|lait|yaourt|céréale|cerelac|nido|biscuit|café|thé|jus|boisson|whisky|bière|eau|nourriture|alimentation|savon|déo|shampoing|nettoyage|drap|oreiller|électroménager|electromenager|cuisine)' THEN 'maison' WHEN (LOWER(COALESCE(p.nomproduit, '')) || ' ' || LOWER(COALESCE(p.descriptionproduit, '')) || ' ' || LOWER(COALESCE(p.nomcathegorieproduit, ''))) ~ '(guitare|piano|sport|football|basketball|vélo|fitness|yoga)' THEN 'sports' ELSE 'maison' END"

def _build_search_filters(query_text='', category='', price_range='', strategy='contains'):
    params = {}
    where_clauses = []

    if query_text:
        if strategy == 'exact':
            where_clauses.append('(' \
                'LOWER(p.nomproduit) = %(exact_query)s OR ' \
                'LOWER(COALESCE(p.descriptionproduit, \'\')) = %(exact_query)s OR ' \
                'LOWER(COALESCE(b.nomboutique, \'\')) = %(exact_query)s' \
            ')')
            params['exact_query'] = query_text
        elif strategy == 'prefix':
            where_clauses.append('(' \
                'LOWER(p.nomproduit) LIKE %(prefix_query)s OR ' \
                'LOWER(COALESCE(p.descriptionproduit, \'\')) LIKE %(prefix_query)s OR ' \
                'LOWER(COALESCE(b.nomboutique, \'\')) LIKE %(prefix_query)s' \
            ')')
            params['prefix_query'] = f'{query_text}%'
        elif strategy == 'fts':
            where_clauses.append("to_tsvector('simple', concat_ws(' ', coalesce(p.nomproduit, ''), coalesce(p.descriptionproduit, ''), coalesce(b.nomboutique, ''))) @@ websearch_to_tsquery('simple', %(fts_query)s)")
            params['fts_query'] = query_text
        else:
            where_clauses.append('(' \
                'LOWER(p.nomproduit) LIKE %(query)s OR ' \
                'LOWER(COALESCE(p.descriptionproduit, \'\')) LIKE %(query)s OR ' \
                'LOWER(COALESCE(b.nomboutique, \'\')) LIKE %(query)s' \
            ')')
            params['query'] = f'%{query_text}%'

    if category:
        where_clauses.append(f"LOWER({_sql_category_case()}) = %(category)s")
        params['category'] = category.lower()

    if price_range:
        min_price, max_price = _price_range_bounds(price_range)
        if min_price is not None:
            where_clauses.append('COALESCE(p.prixproduit, 0) >= %(min_price)s')
            params['min_price'] = min_price
        if max_price is not None:
            where_clauses.append('COALESCE(p.prixproduit, 0) <= %(max_price)s')
            params['max_price'] = max_price

    return where_clauses, params


def _search_products_with_strategy(query_text='', category='', price_range='', limit=None, strategy='contains'):
    sql = '''SELECT
                 p.idproduit,
                 p.idboutique,
                 p.nomproduit,
                 p.descriptionproduit,
                 p.quantiteminproduit,
                 p.quantitestockproduit,
                 p.prixproduit,
                 p.date_heureajoutproduit,
                 b.nomboutique AS boutique_nomboutique,
                 b.idvendeur AS boutique_idvendeur
             FROM produit p
             LEFT JOIN boutique b ON b.idboutique = p.idboutique'''
    where_clauses, params = _build_search_filters(
        query_text=query_text,
        category=category,
        price_range=price_range,
        strategy=strategy,
    )

    if where_clauses:
        sql += ' WHERE ' + ' AND '.join(where_clauses)

    sql += ' ORDER BY p.idproduit'
    if limit is not None:
        sql += ' LIMIT %(limit)s'
        params['limit'] = int(limit)

    rows = _fetch_all(sql, params)
    return [_normalize_product(row) for row in rows]


def warm_cache():
    with CACHE_LOCK:
        try:
            APP_CACHE['images_by_product_id'] = {}
            APP_CACHE['images_by_source'] = {}
            products_raw = _fetch_products_raw(MAX_CACHED_PRODUCTS)
            products = [_normalize_product(product) for product in products_raw]
            unique_categories = []
            seen_categories = set()
            for product in products:
                category = product.get('category') or 'Maison'
                if category not in seen_categories:
                    seen_categories.add(category)
                    unique_categories.append(category)

            APP_CACHE['boutiques_by_id'] = {}
            APP_CACHE['products'] = products
            APP_CACHE['products_by_id'] = {str(product['id']): product for product in products if product.get('id')}
            APP_CACHE['categories'] = unique_categories
            APP_CACHE['loaded_at'] = datetime.now().isoformat()
            APP_CACHE['ready'] = True
            APP_CACHE['last_error'] = None
        except Exception as exc:
            APP_CACHE['ready'] = False
            APP_CACHE['last_error'] = str(exc)
            raise

def search_products_in_db(query_text="", category="", price_range="", limit=None, fast=True):
    normalized_query = _normalize_search_text(query_text)
    normalized_category = _normalize_search_text(category)

    if APP_CACHE['ready'] and fast and not normalized_query and not normalized_category and not price_range:
        return _search_products_from_cache(
            query_text=normalized_query,
            category=normalized_category,
            price_range=price_range,
            limit=limit,
        )

    if normalized_query and fast:
        strategies = ('fts', 'exact', 'prefix', 'contains')
        requested_limit = int(limit) if limit is not None else 1
        for strategy in strategies:
            results = _search_products_with_strategy(
                query_text=normalized_query,
                category=normalized_category,
                price_range=price_range,
                limit=requested_limit,
                strategy=strategy,
            )
            if results:
                return results
        return []

    effective_limit = int(limit) if limit is not None else (MAX_CACHED_PRODUCTS if (normalized_query or normalized_category or price_range) else MAX_CACHED_PRODUCTS)
    return _search_products_with_strategy(
        query_text=normalized_query,
        category=normalized_category,
        price_range=price_range,
        limit=effective_limit,
        strategy='contains',
    )


@app.route('/api/health', methods=['GET'])
@app.route('/health', methods=['GET'])
def health():
    try:
        result = _fetch_one('SELECT NOW() AS timestamp')
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.now().isoformat(),
            'database_time': str(result['timestamp']) if result else None,
            'cache_ready': APP_CACHE['ready'],
            'cache_loaded_at': APP_CACHE['loaded_at'],
        }), 200
    except Exception as exc:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(exc),
            'timestamp': datetime.now().isoformat(),
        }), 500


@app.route('/api/products', methods=['GET'], strict_slashes=False)
@app.route('/api/produits', methods=['GET'], strict_slashes=False)
def list_products():
    try:
        return jsonify(get_products_payload()), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/products/<product_id>', methods=['GET'], strict_slashes=False)
@app.route('/api/produit/<product_id>', methods=['GET'], strict_slashes=False)
def get_product(product_id):
    try:
        product = APP_CACHE['products_by_id'].get(str(product_id)) if APP_CACHE['ready'] else None
        if not product:
            raw_product = _fetch_one(
                '''SELECT
                       p.*,
                       b.nomboutique AS boutique_nomboutique,
                       b.idvendeur AS boutique_idvendeur
                   FROM produit p
                   LEFT JOIN boutique b ON b.idboutique = p.idboutique
                   WHERE p.idproduit = %s''',
                (product_id,)
            )
            if raw_product:
                product = _normalize_product(raw_product)
        if not product:
            return jsonify({'error': 'Produit non trouvé'}), 404
        return jsonify(product), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/products/search/', methods=['GET'], strict_slashes=False)
@app.route('/api/produits/recherche', methods=['GET'], strict_slashes=False)
def search_products():
    query = (request.args.get('q', '') or '').strip().lower()
    category = (request.args.get('category', '') or '').strip()
    price_range = (request.args.get('priceRange', '') or '').strip()
    mode = (request.args.get('mode', 'fast') or 'fast').strip().lower()
    fast = mode != 'full'
    limit_arg = request.args.get('limit', '').strip()
    limit = int(limit_arg) if limit_arg.isdigit() else MAX_CACHED_PRODUCTS

    try:
        results = search_products_in_db(query_text=query, category=category, price_range=price_range, limit=limit, fast=fast)
        return jsonify(results), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/auth/register/', methods=['POST'], strict_slashes=False)
def auth_register():
    data = request.get_json(silent=True) or {}
    role = _normalize_role(data.get('role'))
    first_name = (data.get('first_name') or data.get('prenom') or '').strip()
    last_name = (data.get('last_name') or data.get('nom') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    phone = (data.get('phone') or '').strip()

    if not email or not password:
        return jsonify({'detail': 'Email et mot de passe requis'}), 400

    if len(password) < 8:
        return jsonify({'detail': 'Le mot de passe doit contenir au moins 8 caractères'}), 400

    existing_role, existing_user = _lookup_user_by_email_any_role(email)
    if existing_user:
        return jsonify({'detail': 'Un compte existe déjà avec cet email', 'role': existing_role}), 409

    try:
        user_row = _create_user(role, first_name, last_name, email, password, phone)
        session = _create_session(role, user_row)
        return jsonify({
            'access': session['access'],
            'refresh': session['refresh'],
            'user': _serialize_user(role, user_row),
        }), 201
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/auth/login/', methods=['POST'], strict_slashes=False)
def auth_login():
    data = request.get_json(silent=True) or {}
    role = _normalize_role(data.get('role'))
    identifier = (data.get('identifier') or data.get('email') or data.get('phone') or '').strip()
    password = data.get('password') or ''

    if not identifier or not password:
        return jsonify({'detail': 'Identifiant et mot de passe requis'}), 400

    user_row = _authenticate_user(identifier, password, role)
    if not user_row:
        return jsonify({'detail': 'Email, téléphone ou mot de passe incorrect'}), 401

    session = _create_session(role, user_row)
    return jsonify({
        'access': session['access'],
        'refresh': session['refresh'],
        'user': _serialize_user(role, user_row),
    }), 200


@app.route('/api/auth/me/', methods=['GET'], strict_slashes=False)
def auth_me():
    auth_result = _require_auth(optional=False)
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    session, user_row, _token = auth_result
    role = _normalize_role(session['user_role'])
    return jsonify({
        'user': _serialize_user(role, user_row),
        'session': {
            'expires_at': session['access_expires_at'].isoformat(),
            'refresh_expires_at': session['refresh_expires_at'].isoformat(),
        }
    }), 200


@app.route('/api/auth/refresh/', methods=['POST'], strict_slashes=False)
def auth_refresh():
    data = request.get_json(silent=True) or {}
    refresh_token = (data.get('refresh') or data.get('refresh_token') or '').strip()
    if not refresh_token:
        return jsonify({'detail': 'Refresh token requis'}), 400

    session = _get_session_by_refresh_token(refresh_token)
    if not session:
        return jsonify({'detail': 'Session expirée'}), 401

    user_row = _lookup_user_by_id(session['user_role'], session['user_id'])
    if not user_row:
        return jsonify({'detail': 'Utilisateur introuvable'}), 401

    new_access = secrets.token_urlsafe(32)
    access_expires_at = _utcnow() + timedelta(hours=ACCESS_TOKEN_TTL_HOURS)
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''UPDATE auth_sessions
                   SET access_token_hash = %s,
                       access_expires_at = %s
                   WHERE session_id = %s''',
                (_hash_token(new_access), access_expires_at, session['session_id'])
            )
        conn.commit()

    return jsonify({
        'access': new_access,
        'refresh': refresh_token,
        'user': _serialize_user(session['user_role'], user_row),
        'expires_at': access_expires_at.isoformat(),
    }), 200


@app.route('/api/auth/logout/', methods=['POST'], strict_slashes=False)
def auth_logout():
    auth_result = _require_auth(optional=True)
    if not auth_result:
        return jsonify({'detail': 'Déjà déconnecté'}), 200

    _session, _user_row, token = auth_result
    _revoke_session_by_access_token(token)
    return jsonify({'detail': 'Déconnexion réussie'}), 200


@app.route('/api/auth/register-seller/', methods=['POST'], strict_slashes=False)
def auth_register_seller():
    auth_result = _require_auth(optional=False)
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    session, user_row, _token = auth_result
    current_role = _normalize_role(session['user_role'])
    data = request.get_json(silent=True) or {}
    shop_name = (data.get('shop_name') or data.get('nomboutique') or '').strip()
    description = (data.get('description') or data.get('descriptionboutique') or '').strip()
    address = (data.get('address') or data.get('adresse') or '').strip()

    if not shop_name:
        return jsonify({'detail': 'Le nom de la boutique est requis'}), 400

    if current_role == 'seller':
        vendor_id = _pick(user_row, 'idvendeur', default='')
        boutique = _upsert_boutique_for_vendor(vendor_id, shop_name, description, address)
        return jsonify({
            'access': request.headers.get('Authorization', '').split(' ', 1)[1].strip(),
            'refresh': None,
            'user': _serialize_user('seller', user_row),
            'boutique': boutique,
        }), 200

    vendor_password = _pick(user_row, 'passwordclient', default='') or ''
    vendor_row = _create_user(
        'seller',
        _pick(user_row, 'nomclient', default='') or '',
        _pick(user_row, 'prenomclient', default='') or '',
        _pick(user_row, 'emailclient', default='') or '',
        vendor_password,
        _pick(user_row, 'telephoneclient', default='') or '',
    )
    boutique = _upsert_boutique_for_vendor(_pick(vendor_row, 'idvendeur', default=''), shop_name, description, address)

    _revoke_session_by_access_token(request.headers.get('Authorization', '').split(' ', 1)[1].strip())
    session_data = _create_session('seller', vendor_row)
    return jsonify({
        'access': session_data['access'],
        'refresh': session_data['refresh'],
        'user': _serialize_user('seller', vendor_row),
        'boutique': boutique,
    }), 201


@app.route('/api/cart/my_cart/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def cart_my_cart():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    _session, _user_row, client_id = auth_result
    try:
        return jsonify(_serialize_cart(client_id)), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/cart/add_item/', methods=['POST', 'OPTIONS'], strict_slashes=False)
def cart_add_item():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    _session, _user_row, client_id = auth_result
    data = request.get_json(silent=True) or {}
    product_id = str(data.get('product_id') or data.get('idproduit') or data.get('id') or '').strip()
    quantity = int(data.get('quantity') or 1)

    if not product_id:
        return jsonify({'detail': 'Produit requis'}), 400
    if quantity <= 0:
        return jsonify({'detail': 'Quantité invalide'}), 400

    product = _fetch_one('SELECT * FROM produit WHERE idproduit = %s LIMIT 1', (product_id,))
    if not product:
        return jsonify({'detail': 'Produit introuvable'}), 404

    cart = _ensure_cart_for_client(client_id)
    now = _utcnow()

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO constituer (idproduit, idpanier, dateajoutp, nbproduitajout, heurajoutp)
                   VALUES (%s, %s, %s, %s, %s)
                   ON CONFLICT (idproduit, idpanier)
                   DO UPDATE SET
                       nbproduitajout = constituer.nbproduitajout + EXCLUDED.nbproduitajout,
                       dateajoutp = EXCLUDED.dateajoutp,
                       heurajoutp = EXCLUDED.heurajoutp''',
                (product_id, _pick(cart, 'idpanier', default=''), now.date(), quantity, now.time())
            )
            cur.execute(
                '''UPDATE panier
                   SET quantiteproduitpanier = (
                       SELECT COALESCE(SUM(nbproduitajout), 0)
                       FROM constituer
                       WHERE idpanier = %s
                   )
                   WHERE idpanier = %s''',
                (_pick(cart, 'idpanier', default=''), _pick(cart, 'idpanier', default=''))
            )
        conn.commit()

    return jsonify(_serialize_cart(client_id)), 200


@app.route('/api/cart/remove_item/', methods=['POST', 'OPTIONS'], strict_slashes=False)
def cart_remove_item():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    _session, _user_row, client_id = auth_result
    data = request.get_json(silent=True) or {}
    product_id = str(data.get('product_id') or data.get('idproduit') or data.get('id') or '').strip()

    if not product_id:
        return jsonify({'detail': 'Produit requis'}), 400

    cart = _ensure_cart_for_client(client_id)
    cart_id = _pick(cart, 'idpanier', default='')
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM constituer WHERE idpanier = %s AND idproduit = %s', (cart_id, product_id))
            cur.execute(
                '''UPDATE panier
                   SET quantiteproduitpanier = (
                       SELECT COALESCE(SUM(nbproduitajout), 0)
                       FROM constituer
                       WHERE idpanier = %s
                   )
                   WHERE idpanier = %s''',
                (cart_id, cart_id)
            )
        conn.commit()

    return jsonify(_serialize_cart(client_id)), 200


@app.route('/api/cart/update_item/', methods=['POST', 'OPTIONS'], strict_slashes=False)
def cart_update_item():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    _session, _user_row, client_id = auth_result
    data = request.get_json(silent=True) or {}
    product_id = str(data.get('product_id') or data.get('idproduit') or data.get('id') or '').strip()
    quantity = int(data.get('quantity') or 1)

    if not product_id:
        return jsonify({'detail': 'Produit requis'}), 400

    cart = _ensure_cart_for_client(client_id)
    cart_id = _pick(cart, 'idpanier', default='')

    if quantity <= 0:
        return cart_remove_item()

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''UPDATE constituer
                   SET nbproduitajout = %s,
                       dateajoutp = %s,
                       heurajoutp = %s
                   WHERE idpanier = %s AND idproduit = %s''',
                (quantity, _utcnow().date(), _utcnow().time(), cart_id, product_id)
            )
            cur.execute(
                '''UPDATE panier
                   SET quantiteproduitpanier = (
                       SELECT COALESCE(SUM(nbproduitajout), 0)
                       FROM constituer
                       WHERE idpanier = %s
                   )
                   WHERE idpanier = %s''',
                (cart_id, cart_id)
            )
        conn.commit()

    return jsonify(_serialize_cart(client_id)), 200


@app.route('/api/cart/clear/', methods=['POST', 'OPTIONS'], strict_slashes=False)
def cart_clear():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    _session, _user_row, client_id = auth_result
    cart = _ensure_cart_for_client(client_id)
    cart_id = _pick(cart, 'idpanier', default='')

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM constituer WHERE idpanier = %s', (cart_id,))
            cur.execute('UPDATE panier SET quantiteproduitpanier = 0 WHERE idpanier = %s', (cart_id,))
        conn.commit()

    return jsonify(_serialize_cart(client_id)), 200


@app.route('/api/orders/create_from_cart/', methods=['POST', 'OPTIONS'], strict_slashes=False)
def orders_create_from_cart():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    _session, user_row, client_id = auth_result
    data = request.get_json(silent=True) or {}
    cart = _ensure_cart_for_client(client_id)
    cart_id = _pick(cart, 'idpanier', default='')
    items, subtotal = _cart_items_with_totals(client_id)

    if not items:
        return jsonify({'detail': 'Panier vide'}), 400

    totals = _compute_checkout_totals(client_id)
    order_code = _next_order_code()
    payment_method = str(data.get('payment_method') or data.get('method') or 'card').strip() or 'card'
    shipping_country = str(data.get('shipping_country') or data.get('country') or '').strip()
    address_line = str(data.get('address') or '').strip()
    city = str(data.get('city') or '').strip()
    postal_code = str(data.get('postal_code') or data.get('postalCode') or '').strip()
    full_name = str(data.get('name') or data.get('customer_name') or '').strip()
    if not full_name:
        full_name = _user_full_name(user_row, 'client')

    address_code = _create_checkout_address(client_id, {
        'address': address_line,
        'city': city,
        'country': shipping_country,
        'phone': str(data.get('phone') or '').strip(),
        'postal_code': postal_code,
    }, order_code)
    livraison_id = _create_livraison_record(order_code, address_code, totals['shipping'])
    payment_id = _create_payment_record(order_code, client_id, payment_method, totals['total'])

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''INSERT INTO commande (
                       codecommande, idlivraison, idpanier, idpayement, datecommande, montantcommande, statuscommande
                   ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                   ON CONFLICT (codecommande) DO UPDATE SET
                       idlivraison = EXCLUDED.idlivraison,
                       idpanier = EXCLUDED.idpanier,
                       idpayement = EXCLUDED.idpayement,
                       datecommande = EXCLUDED.datecommande,
                       montantcommande = EXCLUDED.montantcommande,
                       statuscommande = EXCLUDED.statuscommande''',
                (order_code, livraison_id, cart_id, payment_id, _utcnow().date(), totals['total'], 'pending')
            )
        conn.commit()

    order = _get_order_for_client(client_id, order_code)
    receipt_payload = {
        'buyer': full_name,
        'email': _pick(user_row, 'emailclient', default='') or data.get('email') or '',
        'paymentMethod': payment_method,
        'currency': data.get('currency') or 'XOF',
        'fxRate': data.get('exchange_rate') or data.get('fx_rate') or 1,
        'amountFcfa': totals['total'],
        'amountLocal': data.get('amount_local') or totals['total'],
        'shippingCountry': shipping_country,
        'paidAt': _utcnow().strftime('%d/%m/%Y %H:%M'),
        'items': [
            {
                'name': item['row'].get('title') or item['row'].get('name') or item['row'].get('nomproduit') or 'Produit',
                'quantity': item['quantity'],
                'price': item['unit_price'],
            }
            for item in items
        ],
    }

    return jsonify({
        'id': order_code,
        'status': 'pending',
        'cart_id': cart_id,
        'total_price': totals['total'],
        'created_at': _utcnow().isoformat(),
        'items': order['items'] if order else [],
        'receipt_payload': receipt_payload,
    }), 201


@app.route('/api/orders/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def orders_list():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    _session, _user_row, client_id = auth_result
    try:
        return jsonify(_get_client_orders(client_id)), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/orders/<int:order_id>/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def orders_detail(order_id):
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    _session, _user_row, client_id = auth_result
    order = _get_order_for_client(client_id, order_id)
    if not order:
        return jsonify({'detail': 'Commande introuvable'}), 404
    return jsonify(order), 200


@app.route('/api/orders/<int:order_id>/update_status/', methods=['PATCH', 'OPTIONS'], strict_slashes=False)
def orders_update_status(order_id):
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _get_client_id_from_auth()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    _session, _user_row, client_id = auth_result
    data = request.get_json(silent=True) or {}
    new_status = str(data.get('status') or 'pending').strip().lower()
    allowed_statuses = {'pending', 'processing', 'shipped', 'delivered', 'cancelled'}
    if new_status not in allowed_statuses:
        return jsonify({'detail': 'Statut invalide'}), 400

    order = _get_order_for_client(client_id, order_id)
    if not order:
        return jsonify({'detail': 'Commande introuvable'}), 404

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE commande SET statuscommande = %s WHERE codecommande = %s',
                (new_status, order_id)
            )
            if new_status == 'cancelled':
                cur.execute(
                    'UPDATE payement SET statuspayement = %s, etaspayement = %s WHERE idpayement = %s',
                    (new_status, new_status, order['payment_id'])
                )
        conn.commit()

    updated = _get_order_for_client(client_id, order_id)
    return jsonify(updated or order), 200


@app.route('/api/categories', methods=['GET'], strict_slashes=False)
@app.route('/api/categorie', methods=['GET'], strict_slashes=False)
def list_categories():
    try:
        categories = APP_CACHE['categories'] if APP_CACHE['ready'] else sorted({product.get('category', 'Maison') for product in get_products_payload()})
        return jsonify(categories), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/boutiques', methods=['GET'], strict_slashes=False)
def list_boutiques():
    try:
        boutiques = list(APP_CACHE['boutiques_by_id'].values()) if APP_CACHE['ready'] else _fetch_boutiques_raw()
        return jsonify(boutiques), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/boutique/<boutique_id>', methods=['GET'], strict_slashes=False)
def get_boutique(boutique_id):
    try:
        boutique = APP_CACHE['boutiques_by_id'].get(str(boutique_id)) if APP_CACHE['ready'] else None
        if not boutique:
            boutique = _fetch_one('SELECT idboutique, idvendeur, nomboutique, descriptionboutique, adresseboutique, mentionverifierboutique, datecreationboutique FROM boutique WHERE idboutique = %s', (boutique_id,))
        if not boutique:
            return jsonify({'error': 'Boutique non trouvée'}), 404
        products = [product for product in (APP_CACHE['products'] if APP_CACHE['ready'] else get_products_payload()) if str(product.get('raw', {}).get('idboutique', '')) == str(boutique_id)]
        return jsonify({
            'boutique': boutique,
            'produits': products,
        }), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


def _to_int(value, default=0):
    try:
        return int(value or default)
    except (TypeError, ValueError):
        return default


def _to_float(value, default=0.0):
    try:
        return float(value or default)
    except (TypeError, ValueError):
        return default


def _normalize_order_status(status):
    return str(status or 'pending').strip().lower()


def _boutique_created_days_ago(boutique_row):
    created_at = _pick(boutique_row, 'datecreationboutique', default=None)
    if not created_at:
        return None
    if hasattr(created_at, 'date'):
        created_date = created_at.date() if hasattr(created_at, 'date') else created_at
    else:
        created_date = created_at
    if hasattr(created_date, 'isoformat') and hasattr(created_date, 'year'):
        try:
            return (_utcnow().date() - created_date).days
        except Exception:
            return None
    return None


def _build_boutique_fraud_report():
    boutiques = list(APP_CACHE['boutiques_by_id'].values()) if APP_CACHE['ready'] else _fetch_boutiques_raw()

    product_stats = {
        str(row['idboutique']): row
        for row in _fetch_all(
            '''SELECT idboutique,
                      COUNT(*) AS product_count,
                      AVG(prixproduit) AS avg_price,
                      MIN(prixproduit) AS min_price,
                      MAX(prixproduit) AS max_price
               FROM produit
               GROUP BY idboutique'''
        )
    }

    order_stats = {
        str(row['idboutique']): row
        for row in _fetch_all(
            '''SELECT p.idboutique,
                      COUNT(DISTINCT c.codecommande) AS total_orders,
                      COUNT(DISTINCT CASE WHEN LOWER(COALESCE(c.statuscommande, '')) = 'cancelled' THEN c.codecommande END) AS cancelled_orders,
                      COUNT(DISTINCT CASE WHEN LOWER(COALESCE(c.statuscommande, '')) = 'delivered' THEN c.codecommande END) AS delivered_orders,
                      COUNT(DISTINCT CASE WHEN LOWER(COALESCE(c.statuscommande, '')) IN ('processing', 'shipped') THEN c.codecommande END) AS active_orders,
                      MAX(c.datecommande) AS last_order_date
               FROM produit p
               LEFT JOIN constituer ct ON ct.idproduit = p.idproduit
               LEFT JOIN commande c ON c.idpanier = ct.idpanier
               GROUP BY p.idboutique'''
        )
    }

    review_stats = {
        str(row['idboutique']): row
        for row in _fetch_all(
            '''SELECT idboutique,
                      COUNT(*) AS review_count,
                      AVG(noteavis) AS avg_rating,
                      COUNT(CASE WHEN COALESCE(noteavis, 0) <= 2 THEN 1 END) AS bad_reviews
               FROM avis
               GROUP BY idboutique'''
        )
    }

    global_avg_price_row = _fetch_one('SELECT AVG(prixproduit) AS avg_price FROM produit') or {}
    global_avg_price = _to_float(_pick(global_avg_price_row, 'avg_price', default=0), 0.0)

    report = []
    counts = {
        'total_boutiques': len(boutiques),
        'flagged_boutiques': 0,
        'high_risk': 0,
        'medium_risk': 0,
        'low_risk': 0,
        'verified_boutiques': 0,
        'unverified_boutiques': 0,
        'total_products': 0,
        'total_orders': 0,
        'cancelled_orders': 0,
        'delivered_orders': 0,
    }

    for boutique in boutiques:
        boutique_id = str(_pick(boutique, 'idboutique', default='')).strip()
        if not boutique_id:
            continue

        product_row = product_stats.get(boutique_id, {})
        order_row = order_stats.get(boutique_id, {})
        review_row = review_stats.get(boutique_id, {})

        product_count = _to_int(_pick(product_row, 'product_count', default=0), 0)
        avg_price = _to_float(_pick(product_row, 'avg_price', default=0), 0.0)
        min_price = _to_float(_pick(product_row, 'min_price', default=0), 0.0)
        max_price = _to_float(_pick(product_row, 'max_price', default=0), 0.0)
        total_orders = _to_int(_pick(order_row, 'total_orders', default=0), 0)
        cancelled_orders = _to_int(_pick(order_row, 'cancelled_orders', default=0), 0)
        delivered_orders = _to_int(_pick(order_row, 'delivered_orders', default=0), 0)
        active_orders = _to_int(_pick(order_row, 'active_orders', default=0), 0)
        review_count = _to_int(_pick(review_row, 'review_count', default=0), 0)
        avg_rating = _to_float(_pick(review_row, 'avg_rating', default=0), 0.0)
        bad_reviews = _to_int(_pick(review_row, 'bad_reviews', default=0), 0)
        verified = bool(_pick(boutique, 'mentionverifierboutique', default=False))
        age_days = _boutique_created_days_ago(boutique)

        score = 0
        reasons = []

        if not verified:
            score += 15
            reasons.append("Boutique non vérifiée")
            counts['unverified_boutiques'] += 1
        else:
            counts['verified_boutiques'] += 1

        if product_count == 0:
            score += 20
            reasons.append("Aucun produit publié")

        if product_count >= 15 and total_orders == 0:
            score += 10
            reasons.append("Beaucoup de produits mais aucune commande")

        if age_days is not None and age_days <= 30 and product_count >= 8:
            score += 10
            reasons.append("Boutique très récente avec volume produit élevé")

        if total_orders > 0:
            cancelled_rate = cancelled_orders / max(total_orders, 1)
            if total_orders >= 5 and cancelled_rate >= 0.5:
                score += 30
                reasons.append("Taux d'annulation très élevé")
            elif total_orders >= 3 and cancelled_rate >= 0.25:
                score += 15
                reasons.append("Taux d'annulation anormal")

            if delivered_orders == 0 and total_orders >= 5:
                score += 10
                reasons.append("Aucune commande livrée malgré plusieurs ventes")

            if active_orders > 0 and cancelled_orders > delivered_orders and total_orders >= 4:
                score += 10
                reasons.append("Plus d'annulations que de livraisons")

        if review_count >= 3 and avg_rating <= 2.5:
            score += 25
            reasons.append("Avis très négatifs")
        elif review_count >= 5 and avg_rating < 4:
            score += 10
            reasons.append("Note moyenne faible")

        if review_count == 0 and product_count >= 10:
            score += 5
            reasons.append("Boutique très active sans avis")

        if global_avg_price > 0 and avg_price > global_avg_price * 3 and product_count >= 5:
            score += 10
            reasons.append("Prix moyens nettement supérieurs au marché")

        score = min(score, 100)
        risk_level = 'high' if score >= 50 else 'medium' if score >= 25 else 'low'

        counts['total_products'] += product_count
        counts['total_orders'] += total_orders
        counts['cancelled_orders'] += cancelled_orders
        counts['delivered_orders'] += delivered_orders

        if score >= 25:
            counts['flagged_boutiques'] += 1
            if risk_level == 'high':
                counts['high_risk'] += 1
            elif risk_level == 'medium':
                counts['medium_risk'] += 1
        else:
            counts['low_risk'] += 1

        report.append({
            'id': boutique_id,
            'name': _pick(boutique, 'nomboutique', default='Boutique sans nom'),
            'verified': verified,
            'age_days': age_days,
            'product_count': product_count,
            'avg_price': round(avg_price, 2),
            'min_price': round(min_price, 2),
            'max_price': round(max_price, 2),
            'total_orders': total_orders,
            'cancelled_orders': cancelled_orders,
            'delivered_orders': delivered_orders,
            'active_orders': active_orders,
            'review_count': review_count,
            'avg_rating': round(avg_rating, 2),
            'bad_reviews': bad_reviews,
            'risk_score': score,
            'risk_level': risk_level,
            'reasons': reasons,
            'address': _pick(boutique, 'adresseboutique', default=''),
        })

    report.sort(key=lambda item: (item['risk_score'], item['review_count'], item['total_orders']), reverse=True)
    flagged = [boutique for boutique in report if boutique['risk_score'] >= 25]
    return {
        'generated_at': _utcnow().isoformat(),
        'summary': counts,
        'boutiques': report,
        'flagged_boutiques': flagged,
    }


def _build_admin_stats():
    total_users_row = _fetch_one('SELECT (SELECT COUNT(*) FROM client) + (SELECT COUNT(*) FROM vendeur) AS total_users') or {}
    total_sellers_row = _fetch_one('SELECT COUNT(*) AS total_sellers FROM vendeur') or {}
    total_products_row = _fetch_one('SELECT COUNT(*) AS total_products FROM produit') or {}
    total_orders_row = _fetch_one('SELECT COUNT(*) AS total_orders FROM commande') or {}
    total_revenue_row = _fetch_one('SELECT COALESCE(SUM(montantcommande), 0) AS total_revenue FROM commande') or {}
    pending_sellers_row = _fetch_one('SELECT COUNT(*) AS pending_sellers FROM boutique WHERE COALESCE(mentionverifierboutique, FALSE) = FALSE') or {}

    return {
        'totalUsers': _to_int(_pick(total_users_row, 'total_users', default=0), 0),
        'totalSellers': _to_int(_pick(total_sellers_row, 'total_sellers', default=0), 0),
        'totalProducts': _to_int(_pick(total_products_row, 'total_products', default=0), 0),
        'totalOrders': _to_int(_pick(total_orders_row, 'total_orders', default=0), 0),
        'totalRevenue': _to_int(_pick(total_revenue_row, 'total_revenue', default=0), 0),
        'pendingSellers': _to_int(_pick(pending_sellers_row, 'pending_sellers', default=0), 0),
    }


def _build_recent_orders(limit=5):
    rows = _fetch_all(
        '''SELECT c.*
           FROM commande c
           ORDER BY c.datecommande DESC NULLS LAST, c.codecommande DESC
           LIMIT %s''',
        (limit,)
    )
    return [_serialize_order(row) for row in rows]


def _require_admin_context():
    auth_result = _require_auth(optional=False)
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result
    return auth_result


@app.route('/api/admin/stats/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def admin_stats():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _require_admin_context()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    try:
        return jsonify(_build_admin_stats()), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/admin/recent-orders/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def admin_recent_orders():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _require_admin_context()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    try:
        return jsonify(_build_recent_orders(limit=10)), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/admin/fraud-signals/', methods=['GET', 'OPTIONS'], strict_slashes=False)
def admin_fraud_signals():
    if request.method == 'OPTIONS':
        return '', 204

    auth_result = _require_admin_context()
    if isinstance(auth_result, tuple) and len(auth_result) == 2 and isinstance(auth_result[1], int):
        return auth_result

    try:
        return jsonify(_build_boutique_fraud_report()), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/api/images/<product_id>', methods=['GET'], strict_slashes=False)
def get_product_image(product_id):
    product = APP_CACHE['products_by_id'].get(str(product_id)) if APP_CACHE['ready'] else None
    if not product:
        raw_product = _fetch_one('SELECT * FROM produit WHERE idproduit = %s', (product_id,))
        if raw_product:
            product = _normalize_product(raw_product)
            APP_CACHE['products_by_id'][str(product_id)] = product
        else:
            return jsonify({'error': 'Image non trouvée'}), 404

    raw_product = product.get('raw', {}) or {}
    source = _image_source(raw_product)
    if source == DEFAULT_PRODUCT_IMAGE:
        return Response(source.encode('utf-8'), mimetype='image/svg+xml', headers={'Cache-Control': 'public, max-age=86400'})

    cached = APP_CACHE['images_by_source'].get(source)
    if cached:
        return Response(
            cached['body'],
            mimetype=cached['content_type'],
            headers={'Cache-Control': 'public, max-age=31536000, immutable'}
        )

    try:
        body, content_type = _download_image(source)
        APP_CACHE['images_by_source'][source] = {'body': body, 'content_type': content_type}
        APP_CACHE['images_by_product_id'][str(product_id)] = f'/api/images/{product_id}'
        return Response(body, mimetype=content_type, headers={'Cache-Control': 'public, max-age=31536000, immutable'})
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


@app.route('/api/receipts/<order_id>.pdf', methods=['GET'], strict_slashes=False)
def download_receipt_pdf(order_id):
    order_row = _fetch_one(
        '''SELECT c.*, p.idclient
           FROM commande c
           JOIN panier p ON p.idpanier = c.idpanier
           WHERE c.codecommande = %s
           LIMIT 1''',
        (order_id,)
    )
    order = _serialize_order(order_row) if order_row else None
    client_row = None
    if order_row:
        client_row = _fetch_one('SELECT * FROM client WHERE idclient = %s LIMIT 1', (_pick(order_row, 'idclient', default=''),))

    buyer = request.args.get('buyer', '') or (_user_full_name(client_row, 'client') if client_row else '')
    email = request.args.get('email', '') or (_pick(client_row, 'emailclient', default='') if client_row else '')
    payment_method = request.args.get('payment_method', '') or (_pick(_fetch_one('SELECT * FROM payement WHERE idpayement = %s LIMIT 1', (_pick(order_row, 'idpayement', default=''),)) if order_row else None, 'methodepayement', default='') if order_row else '')
    currency = request.args.get('currency', 'XOF')
    fx_rate = request.args.get('fx_rate', '1')
    amount_fcfa = request.args.get('amount_fcfa', '0') or (str(_pick(order_row, 'montantcommande', default='0')) if order_row else '0')
    amount_local = request.args.get('amount_local', amount_fcfa)
    shipping_country = request.args.get('shipping_country', '')
    paid_at = request.args.get('paid_at', '') or (_pick(order_row, 'datecommande', default=None).strftime('%d/%m/%Y') if order_row and _pick(order_row, 'datecommande', default=None) else _utcnow().strftime('%d/%m/%Y %H:%M'))

    if request.args.get('items'):
        try:
            items = json.loads(request.args.get('items', '[]'))
            if not isinstance(items, list):
                items = []
        except Exception:
            items = []
    else:
        items = order.get('items', []) if order else []

    lines = [
        f'Commande : {order_id}',
        f'Client : {buyer}',
        f'Email : {email}',
        f'Pays de livraison : {shipping_country}',
        f'Methode de paiement : {payment_method}',
        f'Date de paiement : {paid_at}',
        f'Montant FCFA : {amount_fcfa}',
        f'Devise choisie : {currency}',
        f'Taux de change actuel : {fx_rate}',
        f'Montant converti : {amount_local} {currency}',
        ' ',
        'Articles :',
    ]

    for item in items[:10]:
        name = item.get('name') or item.get('product_name') or 'Produit'
        quantity = item.get('quantity', 1)
        price = item.get('price', 0)
        lines.append(f'- {name} x{quantity} - {price} FCFA')

    if len(items) > 10:
        lines.append(f'... et {len(items) - 10} article(s) supplémentaire(s)')

    lines.extend([
        ' ',
        'Merci pour votre achat sur SafinPay.',
        'SafinPay - le commerce africain qui avance avec vous.',
    ])

    pdf_bytes = _build_receipt_pdf(lines)
    return Response(
        pdf_bytes,
        mimetype='application/pdf',
        headers={
            'Content-Disposition': f'inline; filename="receipt-{order_id}.pdf"',
            'Cache-Control': 'no-store',
        },
    )


@app.route('/api/reviews/', methods=['GET', 'OPTIONS'], strict_slashes=False)
@app.route('/api/avis/', methods=['GET', 'OPTIONS'], strict_slashes=False)
@app.route('/api/produit/<product_id>/avis', methods=['GET', 'OPTIONS'], strict_slashes=False)
def list_reviews():
    if request.method == 'OPTIONS':
        return '', 204

    product_id = str(
        (request.view_args or {}).get('product_id')
        or request.args.get('product_id')
        or request.args.get('idproduit')
        or ''
    ).strip()
    if not product_id:
        return jsonify({'detail': 'Produit requis'}), 400

    try:
        reviews = _fetch_all(
            '''SELECT idavis, idclient, idproduit, idboutique, idlivraison, noteavis, commentaireavis, dateposteavis
               FROM avis
               WHERE idproduit = %s
               ORDER BY dateposteavis DESC NULLS LAST, idavis DESC''',
            (product_id,)
        )
        return jsonify([review for review in (_serialize_review(review_row) for review_row in reviews) if review]), 200
    except Exception as exc:
        return jsonify({'detail': str(exc)}), 500


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'app': 'SafinPay Backend',
        'status': 'running',
        'backend': 'PostgreSQL direct',
        'endpoints': {
            'health': '/api/health',
            'products': '/api/products',
            'product': '/api/products/<id>',
            'search': '/api/products/search/?q=...'
        }
    }), 200


if __name__ == '__main__':
    try:
        _ensure_auth_schema()
        warm_cache()
        print(f"Cache chargé: {len(APP_CACHE['products'])} produits")
    except Exception as exc:
        print(f"Cache non chargé au démarrage: {exc}")
    app.run(debug=True, host='0.0.0.0', port=8000)
