import { useEffect, useState } from "react";
import LaunchService from "../services/launchService";
import DashboardService from "../services/dashboardService";

import Layout from "../components/layout/Layout";
import LaunchTable from "../components/dashboard/LaunchTable";
import PageHeader from "../components/dashboard/PageHeader";
import StatsSection from "../components/dashboard/StatsSection";
import FilterBar from "../components/dashboard/FilterBar";

function Dashboard() {

    const [launches, setLaunches] = useState([]);

    const [stats, setStats] = useState(null);

    const [filters, setFilters] = useState({

        search: "",

        status: "",

        market: "",

        release_date: ""

    });

    useEffect(() => {

        loadLaunches();
        loadStats();

    }, [filters]);

    async function loadStats() {

        try {
            const response = await DashboardService.getStats();
            console.log("Dashboard stats:", response.data);
            setStats(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function loadLaunches() {

        try {

            const data = await LaunchService.getLaunches(filters);

            setLaunches(data.data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <Layout>

            <PageHeader />

            <FilterBar filters={filters} setFilters={setFilters} />

            <StatsSection stats={stats} />

            <LaunchTable launches={launches} />

        </Layout>

    );

}

export default Dashboard;