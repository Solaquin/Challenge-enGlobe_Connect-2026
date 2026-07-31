import * as AssetModel from "../models/assetModel.js";
import * as LaunchModel from "../models/launchModel.js";
import fs from "fs-extra";

export function uploadAsset(req, res) {

    try {

        const launchId = Number(req.params.id);

        const launch = LaunchModel.getLaunchById(launchId);

        if (!launch) {

            if (req.files) {

                req.files.forEach(file => fs.removeSync(file.path));

            }

            return res.status(404).json({
                success: false,
                message: "Launch not found"
            });

        }

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                success: false,
                message: "No files uploaded"
            });

        }

        const assetIds = [];

        req.files.forEach(file => {

            let fileType = "document";

            if (file.mimetype.startsWith("image/")) {

                fileType = "image";

            } else if (file.mimetype.startsWith("video/")) {

                fileType = "video";

            }

            const assetId = AssetModel.createAsset({

                launch_id: launchId,
                original_name: file.originalname,
                file_name: file.filename,
                mime_type: file.mimetype,
                file_type: fileType,
                file_size: file.size,
                file_path: file.path.replace(/\\/g, "/"),
                uploaded_by: req.user.id

            });

            assetIds.push(assetId);

        });

        res.status(201).json({

            success: true,

            message: "Asset uploaded successfully",

            data: {

                ids: assetIds

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

        console.log("Deleting asset:", req.params.id);

        const asset = AssetModel.getAssetById(req.params.id);

        console.log(asset);

        if (!asset) {

            return res.status(404).json({

                success: false,
                message: "Asset not found"

            });

        }

        if (asset.file_path && fs.existsSync(asset.file_path)) {
            fs.removeSync(asset.file_path);
        }

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