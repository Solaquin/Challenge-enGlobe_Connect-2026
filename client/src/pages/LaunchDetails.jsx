import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LaunchService from "../services/launchService";
import AssetService from "../services/assetsService";
import HistoryService from "../services/historyService";

import LaunchHeader from "../components/launch/LaunchHeader";
import LaunchInfoCard from "../components/launch/LaunchInfoCard";
import LaunchAssetsCard from "../components/launch/LaunchAssetsCard";
import LaunchHistoryCard from "../components/launch/LaunchHistoryCard";
import LaunchActionsCard from "../components/launch/LaunchActionsCard";
import Layout from "../components/layout/Layout";

export default function LaunchDetail() {

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
        
            console.log(historyData.data);
            setLaunch(launchData);
            setAssets(assetsData.data);
            setHistory(historyData.data);

        }
        catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load launch."
            );

        }
        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <div className="flex justify-center py-16">

                Loading...

            </div>
        );

    }

    if (error) {

        return (
            <div className="text-red-600">

                {error}

            </div>
        );

    }

    return (

        <Layout>
            <div className="space-y-6">

                <LaunchHeader launch={launch} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">

                        <LaunchInfoCard launch={launch} />

                        <LaunchAssetsCard assets={assets}/>

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