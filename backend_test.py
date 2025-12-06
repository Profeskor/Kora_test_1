#!/usr/bin/env python3

import requests
import json
import sys
from typing import Dict, Any

# Backend URL from frontend .env
BACKEND_URL = "https://file-mirror-3.preview.emergentagent.com"

def test_get_properties():
    """Test GET /api/properties endpoint"""
    print("Testing GET /api/properties...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/properties", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response structure: {list(data.keys())}")
            
            if "properties" in data:
                properties = data["properties"]
                print(f"Number of properties returned: {len(properties)}")
                
                if len(properties) > 0:
                    # Check first property structure
                    first_property = properties[0]
                    required_fields = ["id", "name", "project", "location", "price", "size", "bedrooms", "bathrooms", "status", "type"]
                    
                    missing_fields = [field for field in required_fields if field not in first_property]
                    if missing_fields:
                        print(f"❌ Missing required fields in property: {missing_fields}")
                        return False
                    
                    print(f"✅ Properties endpoint working correctly")
                    print(f"Sample property ID: {first_property['id']}")
                    return True
                else:
                    print("❌ No properties returned")
                    return False
            else:
                print("❌ Response missing 'properties' field")
                return False
        else:
            print(f"❌ Unexpected status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        return False

def test_get_property_by_id(property_id: str, should_exist: bool = True):
    """Test GET /api/properties/{property_id} endpoint"""
    print(f"\nTesting GET /api/properties/{property_id}...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/properties/{property_id}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if should_exist:
            if response.status_code == 200:
                data = response.json()
                
                # Check if it's a valid property object
                required_fields = ["id", "name", "project", "location", "price", "size", "bedrooms", "bathrooms", "status", "type"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    print(f"❌ Missing required fields: {missing_fields}")
                    return False
                
                if data["id"] == property_id:
                    print(f"✅ Property {property_id} retrieved successfully")
                    print(f"Property name: {data['name']}")
                    return True
                else:
                    print(f"❌ Returned property ID {data['id']} doesn't match requested ID {property_id}")
                    return False
            else:
                print(f"❌ Expected 200 but got {response.status_code}")
                print(f"Response: {response.text}")
                return False
        else:
            # Should return 404
            if response.status_code == 404:
                print(f"✅ Correctly returned 404 for non-existent property {property_id}")
                return True
            else:
                print(f"❌ Expected 404 but got {response.status_code}")
                print(f"Response: {response.text}")
                return False
                
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        return False

def test_health_endpoint():
    """Test the health endpoint to verify backend is running"""
    print("Testing backend health...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/health", timeout=10)
        if response.status_code == 200:
            print("✅ Backend is healthy")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed: {e}")
        return False

def seed_database():
    """Seed the database with test data"""
    print("Seeding database with test data...")
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/seed", timeout=30)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Database seeded successfully with {data.get('count', 0)} properties")
            return True
        else:
            print(f"❌ Seeding failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Seeding failed: {e}")
        return False

def main():
    """Run all backend tests"""
    print("=" * 60)
    print("BACKEND API TESTING")
    print("=" * 60)
    
    # Test results
    results = {}
    
    # 1. Health check
    results["health"] = test_health_endpoint()
    
    # 2. Seed database
    results["seed"] = seed_database()
    
    # 3. Test GET /api/properties
    results["get_properties"] = test_get_properties()
    
    # 4. Test GET /api/properties/1 (should exist)
    results["get_property_1"] = test_get_property_by_id("1", should_exist=True)
    
    # 5. Test GET /api/properties/999 (should return 404)
    results["get_property_999"] = test_get_property_by_id("999", should_exist=False)
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())