import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";
import LaunchForm from "../components/createLaunch/LaunchForm";

import LaunchService from "../services/launchService";
import AssetService from "../services/assetsService";

function EditLaunch() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [launch, setLaunch] = useState(null);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLaunch();

    }, []);

    async function loadLaunch() {

        try {

            const [launchData, assetsData] = await Promise.all([

                LaunchService.getLaunch(id),

                AssetService.getAssets(id)

            ]);

            setLaunch(launchData);
            setAssets(assetsData.data);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ??
                "Unable to load the launch."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleUpdate({ formData, files }) {

        try {

            await LaunchService.updateLaunch(
                id,
                formData
            );

            if (files.length > 0) {

                await AssetService.uploadAssets(
                    id,
                    files
                );

            }

            toast.success("Launch updated successfully.");

            navigate(`/dashboard/launches/${id}`);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ??
                "Unable to update the launch."
            );

        }

    }

    if (loading) {

        return (

            <Layout>

                <div className="flex items-center justify-center py-24">

                    <p className="text-gray-500">

                        Loading launch...

                    </p>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="mx-auto w-full max-w-5xl">

                <LaunchForm

                    initialValues={launch}

                    initialAssets={assets}

                    onSubmit={handleUpdate}

                    submitLabel="Save Changes"

                    onCancel={() =>
                        navigate(`/dashboard/launches/${id}`)
                    }

                />

            </div>

        </Layout>

    );

}

export default EditLaunch;