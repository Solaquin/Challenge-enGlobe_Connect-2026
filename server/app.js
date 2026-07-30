import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import launchRoutes from "./src/routes/launchRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import assetRoutes from "./src/routes/assetRoutes.js";

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

// Servir archivos estáticos
app.use("/uploads",express.static(path.join(process.cwd(), "uploads")));


// API
app.use("/api/launches", launchRoutes);

app.use("/api/auth", authRoutes);

app.use("/api", assetRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Launches API!");
});

export default app;