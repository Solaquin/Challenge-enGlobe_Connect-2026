import api from "../api/axios";

const AssetService = {

    async uploadAssets(launchId, files) {

        const formData = new FormData();

        files.forEach(file => {


            formData.append("assets", file);

        });

        const response = await api.post(
            `/launches/${launchId}/assets`,
            formData
        );

        return response.data;

    },

    async getAssets(id) {

        const response = await api.get(
            `/launches/${id}/assets`
        );

        return response.data;
    },

    async deleteAsset(assetId) {

        const response = await api.delete(`/assets/${assetId}`);

        return response.data;

    }

};

export default AssetService;