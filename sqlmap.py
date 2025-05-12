import requests
import subprocess

urlGet = "http://localhost:3000/api/report"
urlPost = "http://localhost:3000/api/report"

# Obter as URLs via GET

resposta = requests.get(url=urlGet)

urls = [url['url'] for url in resposta.json()]


target_url = urls[-1]

# Comando XSStrike
cmd = [
    'xsstrike', '-u', target_url
]

# Rodar XSStrike e responder "n" para o prompt automaticamente

process = subprocess.Popen(
        cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Enviar 'n' para o prompt "Would you like to continue scanning? [y/N]"
stdout, stderr = process.communicate(input='n\n')

    # Criar o JSON com o resultado
jayson = {
        "name": stdout,
        "url": target_url
    }

post = requests.post(url=urlPost, json=jayson)


