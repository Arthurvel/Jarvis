const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'app-target',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer conectado.");
};

const sendMessage = async (topic, message) => {
  console.log('Enviando para o tópico:', topic);
  if (!topic || typeof topic !== 'string' || topic.trim() === '') {
    throw new Error(`Tópico inválido: "${topic}"`);
  }
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};


module.exports = {
  connectProducer,
  sendMessage,
};
