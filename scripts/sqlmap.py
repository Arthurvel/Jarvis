import requests
import subprocess
import httpx
import asyncio

async def verificar_api():
    async with httpx.AsyncClient() as client:
        resposta_http = await client.get("http://localhost:3000/api/report")
        
        resposta =await resposta_http.json()
        
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
        'url': target
        }

        await client.post(url="http://localhost:3000/api/report", json=jayson)

asyncio.run(verificar_api())
