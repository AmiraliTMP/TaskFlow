import { Router } from "express";

import * as dashboardController from "./dashboard.controller.js";

const router = Router();

// Get dashboard overview and statistics
router.get("/getDashboard", dashboardController.getDashboard);

export default router;
