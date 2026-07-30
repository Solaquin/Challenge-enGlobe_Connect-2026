import StatsCard from "./StatsCard";

function StatsSection({stats}) {

    return (

        <div className="grid grid-cols-4 gap-5 mb-8">

            <StatsCard
                title="Active"
                value={stats?.active ?? 0}
            />

            <StatsCard
                title="Approved"
                value={stats?.approved ?? 0}
            />

            <StatsCard
                title="Pending"
                value={stats?.pending ?? 0}
            />

            <StatsCard
                title="Next Launch"
                value={stats?.nextLaunch?.title ?? "Galaxy X"}
                subtitle={stats?.nextLaunch?.release_date}
                color="bg-violet-600 text-white"
                titleColor="text-white"
            />

        </div>

    );

}

export default StatsSection;