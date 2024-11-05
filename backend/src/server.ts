import express from "express";
import dotenv from "dotenv";
import dbConnection from "./configs/db-configs";
dotenv.config();
const APP_PORT = process.env.APP_PORT || 8000;

const app = express();

app.use(express.json());

app.listen(APP_PORT, () => {
  console.log(`Server is running on port http://localhost:${APP_PORT}`);
  dbConnection();
});
