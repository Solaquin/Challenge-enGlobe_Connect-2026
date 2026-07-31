import { Router } from "express";

import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { canEditLaunch } from "../middleware/launchPermisionMiddleware.js";

import * as LaunchController from "../controllers/launchController.js";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("creator", "approver"), LaunchController.getAllLaunches);

router.get("/:id", authenticateToken, authorizeRoles("creator", "approver"), LaunchController.getLaunchById);

router.post("/", authenticateToken, authorizeRoles("creator"), LaunchController.createLaunch);

router.put("/:id", authenticateToken, canEditLaunch, LaunchController.updateLaunch);

router.delete("/:id", authenticateToken, authorizeRoles("creator"), LaunchController.deleteLaunch);

router.patch("/:id/status", authenticateToken, authorizeRoles("creator", "approver"), LaunchController.updateLaunchStatus);

export default router;