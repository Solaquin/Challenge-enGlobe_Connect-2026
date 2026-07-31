import api from "../api/axios";

const AssetService = {

    async uploadAssets(launchId, files) {

        const formData = new FormData();

        files.forEach(file => {


            formData.append("assets", file);

        });

        for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }

        const response = await api.post(
            `/launches/${launchId}/assets`,
            formData
        );

        console.log(response.data)

        return response.data;

    }

};

export default AssetService;