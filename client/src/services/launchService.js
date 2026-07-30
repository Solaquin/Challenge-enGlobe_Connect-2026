import api from "../api/axios";

const LaunchService = {

    async getLaunches(filters = {}) {

        const response = await api.get("/launches", {
            params: filters
        });

        return response.data;
    },

    async getLaunch(id) {

        const response = await api.get(`/launches/${id}`);

        return response.data;
    },

    async createLaunch(data) {

        const response = await api.post("/launches", data);

        return response.data;
    },

    async updateLaunch(id, data) {

        const response = await api.put(`/launches/${id}`, data);

        return response.data;
    },

    async deleteLaunch(id) {

        const response = await api.delete(`/launches/${id}`);

        return response.data;
    }

};

export default LaunchService;