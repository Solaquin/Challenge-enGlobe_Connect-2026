import * as AssetModel from "../models/assetModel.js";
import * as LaunchModel from "../models/launchModel.js";
import fs from "fs-extra";

export function uploadAsset(req, res) {

    try {

        const launchId = Number(req.params.id);

        const launch = LaunchModel.getLaunchById(launchId);

        if (!launch) {

            if (req.file) {

                fs.removeSync(req.file.path);

            }

            return res.status(404).json({
                success: false,
                message: "Launch not found"
            });

        }

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        let fileType = "document";

        if (req.file.mimetype.startsWith("image/")) {

            fileType = "image";

        } else if (req.file.mimetype.startsWith("video/")) {

            fileType = "video";

        }

        const assetId = AssetModel.createAsset({

            launch_id: launchId,
            original_name: req.file.originalname,
            file_name: req.file.filename,
            mime_type: req.file.mimetype,
            file_type: fileType,
            file_size: req.file.size,
            file_path: req.file.path.replace(/\\/g, "/"),
            uploaded_by: req.user.id

        });

        res.status(201).json({

            success: true,

            message: "Asset uploaded successfully",

            data: {

                id: assetId

            }

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal server error"

        });

    }

}

export function getAssetsByLaunch(req, res) {

    try {

        const launch = LaunchModel.getLaunchById(req.params.id);

        if (!launch) {

            return res.status(404).json({

                success: false,
                message: "Launch not found"

            });

        }

        const assets = AssetModel.getAssetsByLaunchId(req.params.id);

        res.json({

            success: true,
            data: assets

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal server error"

        });

    }

}

export function deleteAsset(req, res) {

    try {

        const asset = AssetModel.getAssetById(req.params.id);

        if (!asset) {

            return res.status(404).json({

                success: false,
                message: "Asset not found"

            });

        }

        fs.removeSync(asset.file_path);

        AssetModel.deleteAsset(req.params.id);

        res.json({

            success: true,
            message: "Asset deleted successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal server error"

        });

    }

}