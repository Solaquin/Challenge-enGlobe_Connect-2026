import { Router } from "express";

import * as LaunchController from "../controllers/launchController.js";

const router = Router();

router.get("/", LaunchController.getAllLaunches);
router.get("/:id", LaunchController.getLaunchById);
router.post("/", LaunchController.createLaunch);
router.put("/:id", LaunchController.updateLaunch);
router.delete("/:id", LaunchController.deleteLaunch);

export default router;