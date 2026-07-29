import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import launchRoutes from "./routes/launchRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const corsOptions = {
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

dotenv.config();

import { initDatabase } from "./database/initDatabase.js";

const app = express();

initDatabase();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/launches", launchRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Launches API!");
});

export default app;