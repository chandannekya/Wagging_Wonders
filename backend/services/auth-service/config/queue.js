const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: ["kafka:9093"], // Use "kafka:9092" inside Docker network
});

module.exports = kafka;
