const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Use "kafka:9092" inside Docker network
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`🔹 Received message: ${message.value.toString()}`);
    },
  });
};

run().catch(console.error);
