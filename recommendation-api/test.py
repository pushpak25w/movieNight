import requests
BASE="http://127.0.0.1:6000/"
response=requests.put(BASE+"category/test",{'data':'asda'})
data=response.json()
print(data)
