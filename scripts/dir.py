import requests
import subprocess
import json 

urlGet = "http://localhost:3000/api/report"

urlPost = "http://localhost:3000/api/report"


resposta = requests.get(url= urlGet).json()

urls = [url['url'] for url in resposta]

target = urls[-1]

cmd = [
    'dirsearch',
    '-u',  
    target
    ,'--include-status=200', 
    '--format=plain',
    't-50', 
    '-q'
]

fim = subprocess.run(cmd, capture_output=True, text=True)

jayson = {
    "name": fim.stdout,
    'url': urlGet
}

post = requests.post(url=urlPost, data=jayson)