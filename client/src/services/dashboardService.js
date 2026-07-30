import api from "../api/axios";

const DashboardService = {

    async getStats() {

        const response = await api.get("/dashboard/stats");

        return response.data;

    }

};

export default DashboardService;