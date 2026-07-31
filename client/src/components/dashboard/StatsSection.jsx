import {
    FiActivity,
    FiCheckCircle,
    FiClock
} from "react-icons/fi";

import { FaRocket } from "react-icons/fa";

import { parseLocalDate } from "../../utils/calendarUtils";

import StatsCard from "./StatsCard";

function StatsSection({ stats }) {

    const nextLaunchDate = stats?.nextLaunch?.release_date
    ? parseLocalDate(stats.nextLaunch.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    : "";

    const cards = [

        {
            title: "Active",
            value: stats?.active ?? 0,
            subtitle: "Active Launches",
            icon: FiActivity,
            accent: "text-blue-600",
            iconBg: "bg-blue-100"
        },

        {
            title: "Approved",
            value: stats?.approved ?? 0,
            subtitle: "Ready to Publish",
            icon: FiCheckCircle,
            accent: "text-green-600",
            iconBg: "bg-green-100"
        },

        {
            title: "Pending",
            value: stats?.pending ?? 0,
            subtitle: "Waiting Review",
            icon: FiClock,
            accent: "text-amber-600",
            iconBg: "bg-amber-100"
        },

        {
            title: "Next Launch",
            value: stats?.nextLaunch?.title ?? "No Launch Scheduled",
            subtitle: nextLaunchDate,
            icon: FaRocket,
            accent: "text-violet-600",
            iconBg: "bg-violet-100",
            featured: true
        }

    ];

    return (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">

            {cards.map(card => (

                <StatsCard
                    key={card.title}
                    {...card}
                />

            ))}

        </div>

    );

}

export default StatsSection;