import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import projectRoutes from "./modules/projects/project.routes.js";

import errorHandler from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";

const app = express();

const allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:5173"];

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Health check
app.get("/api/v1/health", (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    message: "Taskflow API is running.",
    data: {
      server: "online",
      database: isDatabaseConnected ? "connected" : "disconnected",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    },
  });
});

// API modules
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
