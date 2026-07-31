import Layout from "../components/layout/Layout";
import LaunchForm from "../components/createLaunch/LaunchForm";

import LaunchService from "../services/launchService";
import AssetService from "../services/assetsService";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateLaunch() {

    const navigate = useNavigate();

    async function handleCreate({
        formData,
        files

    }) {

        const response = await LaunchService.createLaunch(

            formData
        );

        if (files.length > 0) {

            await AssetService.uploadAssets(

                response.id,
                files

            );

        }

        toast.success("Launch created.");

        navigate("/dashboard");

    }

    return (

        <Layout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">

                    Create Launch

                </h1>

                <p className="text-gray-500 mb-8">

                    Fill in the information for the new product launch.

                </p>

                <LaunchForm
                    onSubmit={handleCreate}
                    submitLabel="Create Launch"
                    onCancel={() => navigate("/dashboard")}
                />

            </div>

        </Layout>

    );

}

export default CreateLaunch;