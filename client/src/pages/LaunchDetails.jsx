import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";

import LaunchHeader from "../components/launch/LaunchHeader";
import LaunchInfoCard from "../components/launch/LaunchInfoCard";
import LaunchAssetsCard from "../components/launch/LaunchAssetsCard";
import LaunchHistoryCard from "../components/launch/LaunchHistoryCard";
import LaunchActionsCard from "../components/launch/LaunchActionsCard";

import LaunchService from "../services/launchService";
import AssetService from "../services/assetsService";
import HistoryService from "../services/historyService";

function LaunchDetail() {

    const { id } = useParams();

    const [launch, setLaunch] = useState(null);
    const [assets, setAssets] = useState([]);
    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadData();

    }, [id]);

    async function loadData() {

        try {

            setLoading(true);
            setError("");

            const [
                launchData,
                assetsData,
                historyData
            ] = await Promise.all([

                LaunchService.getLaunch(id),
                AssetService.getAssets(id),
                HistoryService.getHistory(id)

            ]);

            setLaunch(launchData);
            setAssets(assetsData.data);
            setHistory(historyData.data);

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ??
                "Unable to load the launch."

            );

        } finally {

            setLoading(false);

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

    if (error) {

        return (

            <Layout>

                <div
                    className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-6
                        text-center
                    "
                >

                    <p className="font-medium text-red-700">

                        {error}

                    </p>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="mx-auto w-full max-w-7xl space-y-8">

                <LaunchHeader launch={launch} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">

                        <LaunchInfoCard launch={launch} />

                        <LaunchAssetsCard
                            assets={assets}
                        />

                    </div>

                    <div className="space-y-6">

                        <LaunchActionsCard

                            launch={launch}

                            onRefresh={loadData}

                        />

                        <LaunchHistoryCard

                            history={history}

                        />

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default LaunchDetail;