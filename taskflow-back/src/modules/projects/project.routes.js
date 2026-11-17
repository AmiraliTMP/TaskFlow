import { Router } from "express";

import * as projectController from "./project.controller.js";

const router = Router();

// Create a project
router.post("/createProject", projectController.createProject);

// Get all projects
router.get("/getProjects", projectController.getProjects);

// Get a project by ID
router.get("/getProject/:projectId", projectController.getProjectById);

// Update a project
router.patch("/updateProject/:projectId", projectController.updateProject);

// Archive a project
router.patch("/archiveProject/:projectId", projectController.archiveProject);

// Restore an archived project
router.patch("/restoreProject/:projectId", projectController.restoreProject);

export default router;
