import requests
import subprocess
import json 

urlGet = "http://localhost:3000/api/report"

urlPost = "http://localhost:3000/api/report"


resposta = requests.get(url= urlGet).json()

urls = [url['url'] for url in resposta]

target = urls[-1]

cmd = [
    'arjun',
    '-u',  
    target
]

fim = subprocess.run(cmd, capture_output=True, text=True)

jayson = {
    "name": fim.stdout,
    'url': urlGet
}

post = requests.post(url=urlPost, data=jayson)