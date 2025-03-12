const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Use "kafka:9092" inside Docker network
});

module.exports = kafka;
