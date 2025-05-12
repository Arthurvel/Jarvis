import requests
import subprocess

urlGet = "http://localhost:3000/api/report"
urlPost = "http://localhost:3000/api/report"


resposta = requests.get(url=urlGet)

urls = [url['url'] for url in resposta.json()]


target = urls[-1]

cmd = [
    'xsstrike', '-u', target
]

process = subprocess.Popen(
        cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

stdout, stderr = process.communicate(input='n\n')

jayson = {
        "name": stdout,
        "url": target
    }

post = requests.post(url=urlPost, json=jayson)


