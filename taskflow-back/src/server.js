import "dotenv/config";

import mongoose from "mongoose";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;
const HOST = "127.0.0.1";

let server;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, HOST, () => {
      console.log(`Taskflow API running at http://${HOST}:${PORT}`);
    });

    server.on("error", (error) => {
      console.error("HTTP server error:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

const shutdown = (signal) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  console.log(`\n${signal} received. Shutting down...`);

  const closeDatabase = async () => {
    try {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Shutdown failed:", error.message);
      process.exit(1);
    }
  };

  if (!server) {
    closeDatabase();
    return;
  }

  server.close(() => {
    closeDatabase();
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
