import { config } from "dotenv";
config();

// ! Cấu hình cho kafka
export const CLIENTID = process.env.CLIENTID || "middleware";
export const BROKERS = process.env.BROKERS || "tobi:9092";
export const TOPICMIDDLEWARE = process.env.TOPICMIDDLEWARE || "middlewaretest";
export const TOPICHR = process.env.TOPICHR || "hrtest1";
export const TOPICSIP = process.env.TOPICSIP || "siptest";

// Chưa được sử dụng vì không có đủ kĩ năng :((
export const CREATE_PARTITION = process.env.CREATE_PARTITION|| 0;
export const UPDATE_PARTITION  = process.env.UPDATE_PARTITION|| 1;
export const DELETE_PARTITION  = process.env.DELETE_PARTITION|| 2;


export const GROUPID = process.env.GROUPID || "group-middleware";


export const PORT = process.env.PORT || 8000;