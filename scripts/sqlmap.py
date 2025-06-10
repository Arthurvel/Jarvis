import requests
import subprocess
import schedule
import time

def script():
    urlAPI = "http://localhost:3000/api/report"

    resposta = requests.get(url= urlAPI).json()

    urls = [url['url'] for url in resposta]

    target = urls[-1]
    
    

    cmd = [
    'sqlmap', 
    '-u', 
    target, 
    '--batch'
    ]

    fim = subprocess.run(cmd, capture_output=True, text=True)

    jayson = {
    "name": fim.stdout,
    'url': urlAPI
    }

    post = requests.post(url=urlAPI, json=jayson)
    

schedule.every(2).minute.do(script)

while True:
    schedule.run_pending()
    time.sleep(1)
