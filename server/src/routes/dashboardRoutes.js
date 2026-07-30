import { Router } from "express";

import DashboardController from "../controllers/dashboardController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get(

    "/dashboard/stats",

    authenticateToken,

    DashboardController.getStats

);

export default router;