import { Router } from "express";

import * as StatusHistoryController from "../controllers/statusHistoryController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get(
    "/launches/:id/history",
    authenticateToken,
    authorizeRoles("creator", "approver"),
    StatusHistoryController.getLaunchHistory
);

export default router;