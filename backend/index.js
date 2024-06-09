import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import http from 'http';
import { WebSocketServer,WebSocket } from 'ws'; 
import bodyParser from "body-parser";

import { PORT } from "./config.js";

import employeeRoutes from "./routes/employee.routes.js";
import handleData from "./routes/handleData.routes.js";
import jobHistoryRoutes from "./routes/jobHistory.routes.js";
import benefitPlanRoutes from "./routes/benefitPlan.routes.js";

import { clean } from "./uses/cleaningData.js";
import setupKafkaConsumers from "./service/comsumer.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); 

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
const jsonParser = bodyParser.json();

// Vì Dashboard không có database nên ta cần 1 mảng hiện hữu khi app start ở front-end và 1 mảng nữa nằm ở backend
// Em đang định làm thêm một cái event message liên quan đến việc nhận biết khi nào 2 ứng dụng kia hoạt động thì gửi message vào kafka để backend và frontend dashboard
// nhận biết và tổng hợp lại dữ liệu

let cleaning = [];

(async () => {
  try {
    cleaning = await clean();
  } catch (error) {
    console.error("Error cleaning data:", error);
  }
})();


setupKafkaConsumers(wss, cleaning); 

const PORT1 = 5050;

server.listen(PORT1, () => {
  console.log(`Websocket is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.set("json spaces", 4);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/employee", employeeRoutes);
app.use("/api/handleData", handleData);
app.use("/api/jobHistory", jobHistoryRoutes);
app.use("/api/benefitPlan", benefitPlanRoutes);
