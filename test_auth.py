#!/usr/bin/env python3
import requests
import json

# Test 1: Duplicate email (should return 409)
print("=== Test 1: Duplicate email ===")
response = requests.post('http://localhost:8000/api/auth/register/', json={
    'email': 'test@example.com',
    'password': 'TestPassword123',
    'password_confirm': 'TestPassword123',
    'first_name': 'Duplicate',
    'last_name': 'User',
    'phone': '+237600000001',
    'role': 'client'
})
print(f"Status: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Test 2: Invalid password (< 8 chars, should return 400)
print("=== Test 2: Short password ===")
response = requests.post('http://localhost:8000/api/auth/register/', json={
    'email': 'newuser@example.com',
    'password': 'short',
    'password_confirm': 'short',
    'first_name': 'New',
    'last_name': 'User',
    'phone': '+237600000002',
    'role': 'client'
})
print(f"Status: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Test 3: Login with valid credentials
print("=== Test 3: Login with correct credentials ===")
response = requests.post('http://localhost:8000/api/auth/login/', json={
    'identifier': 'test@example.com',
    'password': 'TestPassword123',
    'role': 'client'
})
print(f"Status: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Test 4: Login with wrong password
print("=== Test 4: Login with wrong password ===")
response = requests.post('http://localhost:8000/api/auth/login/', json={
    'identifier': 'test@example.com',
    'password': 'WrongPassword',
    'role': 'client'
})
print(f"Status: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")
