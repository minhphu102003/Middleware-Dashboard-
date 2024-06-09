import { Kafka } from "kafkajs";
import { BROKERS, CLIENTID, TOPICHR } from "../config.js";

const kafka = new Kafka({
  clientId: CLIENTID,
  brokers: [BROKERS],
});

const consumer = kafka.consumer({ groupId: "hr-group" });



// Hàm xử lý dữ liệu từ Kafka topic
export const handleEmployeeChange = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPICHR, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received message:", message);
      const eventData = JSON.parse(message);
      const { EventType, Data } = eventData;
      // Xử lý tin nhắn dựa trên partition
      switch (partition) {
        case 0:
          {
            try {
              const {
                Employee_ID,
                First_Name,
                Last_Name,
                Gender,
                Shareholder_Status,
                Benefit_Plans,
                Ethnicity,
              } = Data;
              const dataToSendToFrontend = {
                Employee_ID,
                First_Name,
                Last_Name,
                Gender,
                Shareholder_Status,
                Benefit_Plans,
                Ethnicity,
              };
              console.log(dataToSendToFrontend);
            } catch (error) {
              console.error("Error calling API:", error);
            }
          }
          break;
        case 1:
          {
            try {
              const {
                Employee_ID,
                First_Name,
                Last_Name,
                Gender,
                Shareholder_Status,
                Benefit_Plans,
                Ethnicity,
              } = Data;

              const dataToSendToFrontend = {
                Employee_ID,
                First_Name,
                Last_Name,
                Gender,
                Shareholder_Status,
                Benefit_Plans,
                Ethnicity,
              };
              console.log(dataToSendToFrontend);
            } catch (error) {
              console.error("Error calling API:", error);
            }
          }
          break;
        case 2:
          {
            try {
              const { employeeId } = Data;
              const dataToDeleteFrontend = {
                employeeId,
              };
              console.log(dataToDeleteFrontend);
            } catch (error) {
              console.error("Error calling API:", error);
            }
          }
          break;
        default:
          console.log("Unknown partition:", partition);
          break;
      }
    },
  });
};
