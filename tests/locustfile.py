from locust import HttpUser, between, task

class APITestUser(HttpUser):
    host = "http://44.214.174.192:8000"
    wait_time = between(1, 2)  # Wait between requests
    
    @task
    def test_api_endpoint(self):
       with open("test.json", "rb") as f:  # Assuming you want to send "test.json" as a file
            response = self.client.post("/predict/", files={"json_file": f})
            
            # Print status code and response text to the console
            print(f"Status Code: {response.status_code}")
            print(f"Response Content: {response.text}\n")
# Run the script with the following command in the terminal:
# locust -f locustfile.py
