import { Router } from "express";

import * as AssetController from "../controllers/assetController.js";

import upload from "../middleware/uploadMiddleware.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.post(

    "/launches/:id/assets",

    authenticateToken,

    authorizeRoles("creator"),

    upload.single("file"),

    AssetController.uploadAsset

);

router.get(

    "/launches/:id/assets",

    authenticateToken,

    authorizeRoles("creator", "approver"),

    AssetController.getAssetsByLaunch

);

router.delete(

    "/assets/:id",

    authenticateToken,

    authorizeRoles("creator"),

    AssetController.deleteAsset

);

export default router;