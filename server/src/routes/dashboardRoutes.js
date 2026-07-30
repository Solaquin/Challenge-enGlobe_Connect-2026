import { Router } from "express";

import DashboardController from "../controllers/dashboardController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(

    "/dashboard/stats",

    authenticateToken,

    DashboardController.getStats

);

export default router;