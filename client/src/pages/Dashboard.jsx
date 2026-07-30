import { useEffect, useState } from "react";
import LaunchService from "../services/launchService";

import Layout from "../components/layout/Layout";
import LaunchTable from "../components/dashboard/LaunchTable";
import PageHeader from "../components/dashboard/PageHeader";
import StatsSection from "../components/dashboard/StatsSection";
import FilterBar from "../components/dashboard/FilterBar";

function Dashboard() {

    const [launches, setLaunches] = useState([]);

    const [filters, setFilters] = useState({

        search: "",

        status: "",

        market: "",

        release_date: ""

    });

    useEffect(() => {

        loadLaunches();

    }, [filters]);

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

            <StatsSection />

            <LaunchTable launches={launches} />

        </Layout>

    );

}

export default Dashboard;