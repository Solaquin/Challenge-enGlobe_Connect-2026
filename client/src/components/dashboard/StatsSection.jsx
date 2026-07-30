import StatsCard from "./StatsCard";

function StatsSection() {

    return (

        <div className="grid grid-cols-4 gap-5 mb-8">

            <StatsCard
                title="Active"
                value="12"
            />

            <StatsCard
                title="Approved"
                value="45"
            />

            <StatsCard
                title="Pending"
                value="8"
            />

            <StatsCard
                title="Next Launch"
                value="Galaxy X"
                color="bg-violet-600 text-white"
                titleColor="text-white"
            />

        </div>

    );

}

export default StatsSection;