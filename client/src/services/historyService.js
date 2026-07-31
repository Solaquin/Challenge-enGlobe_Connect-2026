import api from "../api/axios";

const HistoryService = 
{
    async getHistory(id) {

        const response = await api.get(
            `/launches/${id}/history`
        );

        return response.data;

    }
}

export default HistoryService;