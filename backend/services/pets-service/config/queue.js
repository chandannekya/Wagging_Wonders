const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "pet-service",
  brokers: ["kafka:9093"], // Use "kafka:9092" inside Docker network
});

module.exports = kafka;
