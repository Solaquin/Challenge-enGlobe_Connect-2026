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
        }
        catch (error) {

            toast.error("Failed to load launch.");

        }
        finally {

            setLoading(false);

        }

    }

    async function handleUpdate({

        formData,
        files

    }) {

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

            toast.success("Launch updated.");

            navigate(`/dashboard/launches/${id}`);

        }
        catch {

            toast.error("Failed to update launch.");

        }

    }

    if (loading) {

        return (

            <Layout>

                <p>Loading...</p>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">

                    Edit Launch

                </h1>

                <p className="text-gray-500 mb-8">

                    Edit the information for the product launch.

                </p>

                <LaunchForm

                    initialValues={launch}

                    initialAssets={assets}

                    onSubmit={handleUpdate}

                    submitLabel="Save Changes"

                    onCancel={() => navigate(`/dashboard/launches/${id}`)}

                />

            </div>

        </Layout>

    );

}

export default EditLaunch;