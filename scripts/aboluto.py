import requests
import subprocess
import json 
import sys
from confluent_kafka import Consumer, KafkaException

conf = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'consumer_group',
    'auto.offset.reset': 'latest',
    'enable.auto.commit': False
}

consumer = Consumer(conf)
consumer.subscribe(['report'])

