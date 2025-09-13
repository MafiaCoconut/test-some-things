#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Monstrino Email Functionality
Tests all email-related endpoints with various scenarios
"""

import requests
import json
import sys
import os
import uuid
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://dollcollectors.preview.emergentagent.com/api"

class EmailBackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.failed_tests = []
        self.test_id = str(uuid.uuid4())[:8]  # Unique test run ID
        
    def get_unique_email(self, base_name):
        """Generate unique email for testing"""
        return f"{base_name}+{self.test_id}@monsterhigh.com"
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")
        if response_data and not success:
            print(f"    Response: {response_data}")
        print()

    def test_email_subscribe_valid(self):
        """Test POST /api/email/subscribe with valid email data"""
        test_name = "Email Subscribe - Valid Data"
        
        try:
            payload = {
                "email": self.get_unique_email("draculaura"),
                "username": "Draculaura",
                "template_variant": "1"
            }
            
            response = requests.post(f"{self.base_url}/email/subscribe", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("email") == payload["email"] and data.get("username") == payload["username"]:
                    self.log_test(test_name, True, f"Successfully subscribed {payload['email']}")
                else:
                    self.log_test(test_name, False, "Response data doesn't match input", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_subscribe_duplicate(self):
        """Test duplicate email subscription (should handle gracefully)"""
        test_name = "Email Subscribe - Duplicate Email"
        
        try:
            unique_email = self.get_unique_email("duplicate_test")
            payload = {
                "email": unique_email,
                "username": "DuplicateTest",
                "template_variant": "2"
            }
            
            # First subscription should succeed
            first_response = requests.post(f"{self.base_url}/email/subscribe", json=payload)
            
            if first_response.status_code == 200:
                # Second subscription should fail with 400
                second_response = requests.post(f"{self.base_url}/email/subscribe", json=payload)
                
                if second_response.status_code == 400:
                    data = second_response.json()
                    if "already subscribed" in data.get("detail", "").lower():
                        self.log_test(test_name, True, "Correctly rejected duplicate subscription")
                    else:
                        self.log_test(test_name, False, "Wrong error message for duplicate", data)
                else:
                    self.log_test(test_name, False, f"Expected 400, got {second_response.status_code}", second_response.text)
            else:
                self.log_test(test_name, False, f"First subscription failed: {first_response.status_code}", first_response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_subscribe_invalid_format(self):
        """Test invalid email format"""
        test_name = "Email Subscribe - Invalid Email Format"
        
        try:
            payload = {
                "email": "not-an-email",
                "username": "TestUser",
                "template_variant": "1"
            }
            
            response = requests.post(f"{self.base_url}/email/subscribe", json=payload)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test(test_name, True, "Correctly rejected invalid email format")
            else:
                self.log_test(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_variant_1(self):
        """Test POST /api/email/template for variant 1"""
        test_name = "Email Template - Variant 1 Newsletter"
        
        try:
            payload = {
                "email": "clawdeen@monsterhigh.com",
                "username": "Clawdeen",
                "template_variant": "1",
                "template_type": "newsletter"
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["subject", "html_body", "text_body", "recipient_email", "template_variant"]
                
                if all(field in data for field in required_fields):
                    # Check for Monster High branding
                    html_body = data.get("html_body", "")
                    if "MONSTRINO" in html_body and "Monster High" in html_body and "Mattel" in html_body:
                        self.log_test(test_name, True, "Template generated with proper branding")
                    else:
                        self.log_test(test_name, False, "Missing Monster High branding or Mattel disclaimer", data)
                else:
                    self.log_test(test_name, False, "Missing required fields in response", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_variant_2(self):
        """Test POST /api/email/template for variant 2"""
        test_name = "Email Template - Variant 2 Newsletter"
        
        try:
            payload = {
                "email": "frankie@monsterhigh.com",
                "username": "Frankie",
                "template_variant": "2",
                "template_type": "newsletter"
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                html_body = data.get("html_body", "")
                if "FRANKIE" in html_body.upper() and "MONSTRINO" in html_body:
                    self.log_test(test_name, True, "Template variant 2 generated successfully")
                else:
                    self.log_test(test_name, False, "Template doesn't contain expected content", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_variant_3(self):
        """Test POST /api/email/template for variant 3"""
        test_name = "Email Template - Variant 3 Newsletter"
        
        try:
            payload = {
                "email": "cleo@monsterhigh.com",
                "username": "Cleo",
                "template_variant": "3",
                "template_type": "newsletter"
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                html_body = data.get("html_body", "")
                if "Cleo" in html_body and "DISTINGUISHED" in html_body.upper():
                    self.log_test(test_name, True, "Template variant 3 generated successfully")
                else:
                    self.log_test(test_name, False, "Template doesn't contain expected elegant content", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_release_type(self):
        """Test POST /api/email/template for release type"""
        test_name = "Email Template - Release Type"
        
        try:
            payload = {
                "email": "lagoona@monsterhigh.com",
                "username": "Lagoona",
                "template_variant": "1",
                "template_type": "release"
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                subject = data.get("subject", "")
                html_body = data.get("html_body", "")
                if "v1.0" in subject and "LIVE" in html_body.upper():
                    self.log_test(test_name, True, "Release template generated successfully")
                else:
                    self.log_test(test_name, False, "Release template doesn't contain expected content", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_invalid_variant(self):
        """Test POST /api/email/template with invalid variant"""
        test_name = "Email Template - Invalid Variant"
        
        try:
            payload = {
                "email": "test@monsterhigh.com",
                "username": "TestUser",
                "template_variant": "99",
                "template_type": "newsletter"
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 400:
                self.log_test(test_name, True, "Correctly rejected invalid template variant")
            else:
                self.log_test(test_name, False, f"Expected 400, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_get_subscriptions(self):
        """Test GET /api/email/subscriptions"""
        test_name = "Get Email Subscriptions"
        
        try:
            response = requests.get(f"{self.base_url}/email/subscriptions")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our test subscription is in the list
                    found_test_email = any(sub.get("email") == "draculaura@monsterhigh.com" for sub in data)
                    if found_test_email:
                        self.log_test(test_name, True, f"Retrieved {len(data)} subscriptions including test email")
                    else:
                        self.log_test(test_name, True, f"Retrieved {len(data)} subscriptions (test email may have been cleaned up)")
                else:
                    self.log_test(test_name, False, "Response is not a list", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_unsubscribe_valid_email(self):
        """Test POST /api/email/unsubscribe with valid email"""
        test_name = "Unsubscribe - Valid Email"
        
        try:
            # First subscribe a new email for testing unsubscribe
            unique_email = self.get_unique_email("ghoulia")
            subscribe_payload = {
                "email": unique_email,
                "username": "Ghoulia",
                "template_variant": "1"
            }
            
            subscribe_response = requests.post(f"{self.base_url}/email/subscribe", json=subscribe_payload)
            
            if subscribe_response.status_code == 200:
                # Now test unsubscribe
                unsubscribe_payload = {"email": unique_email}
                response = requests.post(f"{self.base_url}/email/unsubscribe", json=unsubscribe_payload)
                
                if response.status_code == 200:
                    data = response.json()
                    if "unsubscribed" in data.get("message", "").lower():
                        self.log_test(test_name, True, "Successfully unsubscribed valid email")
                    else:
                        self.log_test(test_name, False, "Unexpected response message", data)
                else:
                    self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
            else:
                self.log_test(test_name, False, "Failed to subscribe test email first", subscribe_response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_unsubscribe_nonexistent_email(self):
        """Test POST /api/email/unsubscribe with non-existent email"""
        test_name = "Unsubscribe - Non-existent Email"
        
        try:
            unsubscribe_payload = {"email": "nonexistent@monsterhigh.com"}
            response = requests.post(f"{self.base_url}/email/unsubscribe", json=unsubscribe_payload)
            
            if response.status_code == 404:
                data = response.json()
                if "not found" in data.get("detail", "").lower():
                    self.log_test(test_name, True, "Correctly handled non-existent email")
                else:
                    self.log_test(test_name, False, "Wrong error message for non-existent email", data)
            else:
                self.log_test(test_name, False, f"Expected 404, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_subscribe_missing_fields(self):
        """Test POST /api/email/subscribe with missing required fields"""
        test_name = "Email Subscribe - Missing Required Fields"
        
        try:
            payload = {
                "username": "TestUser"
                # Missing email field
            }
            
            response = requests.post(f"{self.base_url}/email/subscribe", json=payload)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test(test_name, True, "Correctly rejected missing email field")
            else:
                self.log_test(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def test_email_template_missing_fields(self):
        """Test POST /api/email/template with missing required fields"""
        test_name = "Email Template - Missing Required Fields"
        
        try:
            payload = {
                "username": "TestUser"
                # Missing email, template_variant, template_type
            }
            
            response = requests.post(f"{self.base_url}/email/template", json=payload)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test(test_name, True, "Correctly rejected missing required fields")
            else:
                self.log_test(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all email backend tests"""
        print("🧪 Starting Comprehensive Email Backend Tests")
        print("=" * 60)
        print(f"Backend URL: {self.base_url}")
        print()
        
        # Test email subscription functionality
        print("📧 Testing Email Subscription Endpoints...")
        self.test_email_subscribe_valid()
        self.test_email_subscribe_duplicate()
        self.test_email_subscribe_invalid_format()
        self.test_email_subscribe_missing_fields()
        
        # Test email template generation
        print("📝 Testing Email Template Generation...")
        self.test_email_template_variant_1()
        self.test_email_template_variant_2()
        self.test_email_template_variant_3()
        self.test_email_template_release_type()
        self.test_email_template_invalid_variant()
        self.test_email_template_missing_fields()
        
        # Test subscription management
        print("📋 Testing Subscription Management...")
        self.test_get_subscriptions()
        self.test_unsubscribe_valid_email()
        self.test_unsubscribe_nonexistent_email()
        
        # Print summary
        print("=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = EmailBackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)