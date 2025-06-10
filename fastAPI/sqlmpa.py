from fastapi import FastAPI
import httpx
import subprocess

app = FastAPI()

@app.get("/sqlmapa")
async def buscar_dados():
    async with httpx.AsyncClient() as client:
        resposta = await client.get("http://localhost:3000/api/report")
        dados = resposta.json()

    urls = [item['url'] for item in dados]

    target = urls[-1]

    cmd = [
        'sqlmap',
        '-u',
        target,
        '--batch'
    ]
    resultado = subprocess.run(cmd, capture_output=True, text=True)

    jayson = {
        "name": resultado.stdout,
        "url": target
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("http://localhost:3000/api/report", json=jayson)

    return {
        "target": target,
        "sqlmap_saida": resultado.stdout,
        "status_post": response.status_code
    }
