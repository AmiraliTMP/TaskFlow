import { Router } from "express";

import * as taskController from "./task.controller.js";

const router = Router();

// Create a task
router.post("/createTask", taskController.createTask);

// Get all tasks and optionally filter them
router.get("/getTasks", taskController.getTasks);

// Get a task by ID
router.get("/getTask/:taskId", taskController.getTaskById);

// Update a task
router.patch("/updateTask/:taskId", taskController.updateTask);

// Change task status
router.patch("/changeTaskStatus/:taskId", taskController.changeTaskStatus);

// Delete a task
router.delete("/deleteTask/:taskId", taskController.deleteTask);

export default router;
