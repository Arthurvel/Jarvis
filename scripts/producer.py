from kafka import KafkaProducer
import json

producer = KafkaProducer(bootstrap_servers = 'localhost:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))

mensagem = {'id': 1, 'msg': 'oi'}

producer.send('teste', mensagem)

print('msg enviada')

producer.flush()