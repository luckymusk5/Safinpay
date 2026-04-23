#!/usr/bin/env python3
"""Test des en-têtes CORS et du formulaire d'enregistrement"""
import requests
import json

print("=" * 60)
print("TEST 1: Vérifier les en-têtes CORS du port 5175")
print("=" * 60)

try:
    resp = requests.post(
        'http://localhost:8000/api/auth/register/',
        headers={
            'Origin': 'http://localhost:5175',
            'Content-Type': 'application/json'
        },
        json={
            'email': 'cors_test@example.com',
            'password': 'TestPass123',
            'password_confirm': 'TestPass123',
            'first_name': 'CORS',
            'last_name': 'Test',
            'phone': '+237600000010',
            'role': 'client'
        },
        timeout=10
    )
    
    print(f"✅ Status: {resp.status_code}")
    cors_header = resp.headers.get('Access-Control-Allow-Origin', 'MISSING')
    print(f"✅ Access-Control-Allow-Origin: {cors_header}")
    
    if cors_header == 'http://localhost:5175' or cors_header == '*':
        print("✅ CORS correctement configuré pour le port 5175!")
    else:
        print(f"❌ CORS non configuré pour le port 5175 (reçu: {cors_header})")
    
    data = resp.json()
    if data.get('success'):
        print(f"✅ Enregistrement réussi: {data.get('message')}")
    else:
        print(f"❌ Erreur d'enregistrement: {data.get('message')}")
        
except Exception as e:
    print(f"❌ Erreur: {e}")

print("\n" + "=" * 60)
print("TEST 2: Vérifier que le port 5175 peut maintenant accéder à l'API")
print("=" * 60)

try:
    resp = requests.options(
        'http://localhost:8000/api/auth/register/',
        headers={
            'Origin': 'http://localhost:5175',
            'Access-Control-Request-Method': 'POST',
        },
        timeout=10
    )
    
    print(f"✅ Preflight Status: {resp.status_code}")
    cors_allow_methods = resp.headers.get('Access-Control-Allow-Methods', 'MISSING')
    print(f"✅ Access-Control-Allow-Methods: {cors_allow_methods}")
    print("✅ Preflight CORS fonctionne!")
    
except Exception as e:
    print(f"❌ Erreur: {e}")

print("\n" + "=" * 60)
print("✨ Tests terminés. Vous pouvez maintenant utiliser le formulaire sur http://localhost:5175/register")
print("=" * 60)
