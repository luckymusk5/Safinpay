                                                           Project Milestone 1
TITLE : Safinpay

TEAM MEMBER :

1-KAMGA DJITAFO EMMANUEL PARFAIT (ICTU20234091)
2-HOL ODILE GRACE (ICTU20233965)
3-KAMGUI KAMDEM MELVIN CABREL (ICTU20251514)
4-MBEY JOSEPH JUNIOR (ICTU20233903)


List of core entities and their relationships:
Core entities:
Utilisateur :
-id_utilisateur
-nom
-email
-mot_de_passe
-date_inscription
-telephone
Avis :

-id_avis
-note
-commentaire_avis
-date_poste_avis
commande :

-id_commande
-id_utilisateur
-date_commande
-statut
-total
Panier :

-id_panier
-id_utilisateur
-date_creation
-statut
adresse :

-id_adresse
-id_utilisateur
-rue
-ville
-code_postal
-pays
Payment :

-id_paiement
-id_utilisateur
-type
-methodePaiement
-datePaiement
-statutPaiement
-etatsPaiement
message :

-id_message
-id_utilisateur
-dateCreationMessage
-heure_message
-contenu_message
livreur :

-id_livreur
-nom_livreur
-email
-adresseLivreur
-telephone
Livraison_expedition :

-id_livraison
-id_livreur
-id_commande
-code_adresse
-date_livraison
-commission_livraison
Produit :

-id_produit
-id_categorie
-id_vendeur
-nom_produit
-description
-prix
-marque
-quantite
categorie :

-id_categorie
-nom
-nobredecategorie
boutique :

-id_boutique
-id_vendeur
-ville
-pays
-cod_postal
vendeur :

-id_vendeur
-id_message
-nom_vendeur
-email
-telephone
-adresse


Relationships :
The following relationships define how these entities interact:
Shopping & Management:
Utilisateur passer commande (1,n): Users create purchase orders.
Utilisateur creer Panier (1,n): Users manage items in a shopping cart.
vendeur vendre Produit (1,n): Vendors list and manage products for sale.
Produit classer categorie (1,n): Products are grouped into specific classifications.
Logistics & Fulfillment:
livreur effectue Livraison_expedition (1,1): Delivery personnel are assigned to specific shipping tasks.
Livraison_expedition confirmer vendeur (1,1): Vendors verify the shipment process.
Interaction & Account:
Utilisateur ecrire Avis (0,n): Users provide feedback on products.
Utilisateur envoyer message (1,n): Users communicate via the platform.
vendeur Repondre message (1,n): Vendors respond to user inquiries.
Utilisateur peut devenir vendeur: An account status transformation from standard user to vendor.



Advanced Features Planned :

1- Inventory Management with Stock Alerts
Automatic stock control system that :
-updates inventory after each order
-alerts sellers when stock is low
-prevents orders when products are out of stock

2-Smart Product Search & Filtering
Advanced search system allowing users to filter products by:
-category
-price range
-rating
-popularity

3- Multi-Vendor Marketplace
Allow multiple sellers to register and manage their own products, similar to large marketplaces.
Features:
-seller dashboard
-product management
-sales tracking






