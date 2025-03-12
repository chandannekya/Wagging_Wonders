const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Use "kafka:9092" inside Docker network
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  // Send a test message
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello from KafkaJS Producer!" }],
  });

  console.log("✅ Message sent!");
  await producer.disconnect();
};

run().catch(console.error);
