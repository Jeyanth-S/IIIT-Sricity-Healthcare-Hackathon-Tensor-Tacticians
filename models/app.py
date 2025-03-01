import requests

url = "https://ehr-api-demo.loca.lt/process_text"
data = {"text": "Dr. Smith diagnosed John Doe, 40, with pneumonia and prescribed azithromycin."}

response = requests.post(url, json=data)
print(response.json())
