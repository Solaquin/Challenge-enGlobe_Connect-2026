import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";
import LaunchForm from "../components/createLaunch/LaunchForm";

import LaunchService from "../services/launchService";
import AssetService from "../services/assetsService";

function CreateLaunch() {

    const navigate = useNavigate();

    async function handleCreate({ formData, files }) {

        try {

            const response = await LaunchService.createLaunch(formData);

            if (files.length > 0) {

                await AssetService.uploadAssets(
                    response.id,
                    files
                );

            }

            toast.success("Launch created successfully.");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ??
                "Unable to create the launch."
            );

        }

    }

    return (

        <Layout>

            <div className="mx-auto w-full max-w-5xl">

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