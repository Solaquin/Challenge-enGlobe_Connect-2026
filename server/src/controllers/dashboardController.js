import DashboardModel from "../models/dashboardModel.js";

function getStats(req, res) {

    const stats = DashboardModel.getStats();

    res.json({

        success: true,

        data: stats

    });

}

export default {

    getStats

};