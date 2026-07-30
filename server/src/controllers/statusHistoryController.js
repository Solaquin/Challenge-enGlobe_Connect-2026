import * as LaunchModel from "../models/launchModel.js";
import * as StatusHistoryModel from "../models/statusHistoryModel.js";

export function getLaunchHistory(req, res) {

    const { id } = req.params;

    const launch = LaunchModel.getLaunchById(id);

    if (!launch) {
        return res.status(404).json({
            message: "Launch not found"
        });
    }

    const history = StatusHistoryModel.getHistoryByLaunchId(id);

    return res.status(200).json({
        message: "Launch history retrieved successfully",
        data: history
    });

}

