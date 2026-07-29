import express from "express";
import cors from "cors";

import launchRoutes from "./routes/launchRoutes.js";

const corsOptions = {
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

import { initDatabase } from "./database/initDatabase.js";

const app = express();

initDatabase();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Welcome to the Launches API!");
});

app.use("/api/launches", launchRoutes);

export default app;