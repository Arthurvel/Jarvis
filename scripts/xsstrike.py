import requests
import subprocess
import json 
import sys
from confluent_kafka import Consumer, KafkaException

conf = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'xss_consumer_group',
    'auto.offset.reset': 'latest', 
    'enable.auto.commit': False
}

consumer = Consumer(conf)
consumer.subscribe(['report'])

def send(msg):
    try:
        consumo = requests.get(url="http://localhost:3000/api/report").json()
        
        #urls = [url['url'] for url in consumo]

        #target = urls[-1]

        message_data = json.loads(msg.value().decode('utf-8'))
        
        target = message_data.get("url")
        

        cmd = ['xsstrike', '-u', target]

        process = subprocess.Popen(
            cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        stdout, stderr = process.communicate(input='n\n')


        processo = {
            "name": stdout[:5000],  # Limita a saída se necessário
            "url": target
        }
        
        message_data = json.loads(msg.value().decode('utf-8'))
        
        print(f"Processando mensagem: {message_data}")
        
        response = requests.post(url='http://localhost:3000/api/xss', json=processo)
        
        print(f"Resposta do servidor: {response.status_code}")

        consumer.commit(msg)
        
    except Exception as e:
        print(f"Erro ao processar mensagem: {e}", file=sys.stderr)
        
try:
    print("Aguardando mensagens do tópico 'report'...")
    while True:
        msg = consumer.poll(timeout=1.0)

        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaException._PARTITION_EOF:
                continue
            else:
                print(f"Erro no consumidor: {msg.error()}", file=sys.stderr)
                break

        send(msg)

except KeyboardInterrupt:
    print("Interrupção recebida, encerrando...")

finally:
    consumer.close()