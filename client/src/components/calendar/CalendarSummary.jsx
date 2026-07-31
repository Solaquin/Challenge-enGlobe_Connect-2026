import { useMemo } from "react";
import { FiPieChart } from "react-icons/fi";

import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

export default function CalendarSummary({ launches }) {

    const items = useMemo(() => {

        const counts = launches.reduce((acc, launch) => {

            acc[launch.status] = (acc[launch.status] ?? 0) + 1;

            return acc;

        }, {});

        return [

            {
                label: "Total",
                value: launches.length,
                color: "#8B5CF6"
            },

            ...Object.entries(LAUNCH_STATUS).map(([status, config]) => ({

                label: config.label,

                value: counts[status] ?? 0,

                color: config.color

            }))

        ];

    }, [launches]);

    return (

        <div className="calendar-card">

            <div className="calendar-card-header">

                <div className="calendar-card-title">

                    <FiPieChart className="calendar-card-icon" />

                    <h3>Monthly Summary</h3>

                </div>

                <span className="calendar-card-count">

                    {launches.length}

                </span>

            </div>

            <div className="summary-list">

                {items.map((item) => {

                    const percentage =

                        launches.length === 0

                            ? 0

                            : Math.round(

                                  (item.value / launches.length) * 100

                              );

                    return (

                        <div

                            key={item.label}

                            className="
                                summary-item
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                px-4
                                py-3
                            "

                        >

                            <div className="summary-left">

                                <span

                                    className="summary-dot"

                                    style={{

                                        background: item.color

                                    }}

                                />

                                <div>

                                    <p className="font-medium text-gray-800">

                                        {item.label}

                                    </p>

                                    {item.label !== "Total" && (

                                        <p className="text-xs text-gray-500">

                                            {percentage}%

                                        </p>

                                    )}

                                </div>

                            </div>

                            <strong

                                style={{

                                    color: item.color

                                }}

                                className="text-xl"

                            >

                                {item.value}

                            </strong>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}