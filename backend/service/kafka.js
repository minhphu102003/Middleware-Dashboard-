import { Kafka } from "kafkajs";
import { CLIENTID,BROKERS } from "../config.js";

const kafka = new Kafka({
  clientId: CLIENTID,
  brokers: [BROKERS], 
});
const producer = kafka.producer();

const sendEmployeeChangeEvent = async (eventType, eventData,topic) => {
    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify({ EventType: eventType, Data: eventData }) }],
      });
    } catch (error) {
      console.error("Error occurred while sending message to Kafka:", error);
    }
  };
  
  export { sendEmployeeChangeEvent };