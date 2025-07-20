from confluent_kafka import Consumer, KafkaException
import requests
import json
import sys

conf = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'sqlmap_consumer_group',
    'auto.offset.reset': 'latest',
    'enable.auto.commit': False
}

consumer = Consumer(conf)
consumer.subscribe(['report'])

def process_message(msg):
    try:
        consumo = requests.get(url="http://localhost:3000/api/sqlmap")
        urls = [url['url'] for url in consumo.json()]
        target_url = urls[-1]

        message_data = json.loads(msg.value().decode('utf-8'))
        print(f"Processando mensagem: {message_data}")

        envio = {
            'name': 'funcionou',
            'url': 'https://envio-basico.com',
            'kafka_message': message_data
        }

        response = requests.post(url='http://localhost:3000/api/sqlmap', json=envio)
        
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

        process_message(msg)

except KeyboardInterrupt:
    print("Interrupção recebida, encerrando...")

finally:
    consumer.close()
