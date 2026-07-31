import * as LaunchModel from "../models/LaunchModel.js";

export function canEditLaunch(req, res, next) {

    const launch = LaunchModel.getLaunchById(req.params.id);

    if (!launch) {

        return res.status(404).json({
            success: false,
            message: "Launch not found."
        });

    }

    if (req.user.role !== "creator") {

        return res.status(403).json({
            success: false,
            message: "You don't have permission to edit launches."
        });

    }

    if (launch.created_by !== req.user.id) {

        return res.status(403).json({
            success: false,
            message: "You can only edit your own launches."
        });

    }

    if (launch.status !== "draft") {

        return res.status(403).json({
            success: false,
            message: "Only draft launches can be edited."
        });

    }

    req.launch = launch;

    next();

}