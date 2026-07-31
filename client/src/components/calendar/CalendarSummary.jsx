import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

export default function CalendarSummary({ launches }) {

    const counts = {

        draft: launches.filter(l => l.status === "draft").length,
        review: launches.filter(l => l.status === "review").length,
        approved: launches.filter(l => l.status === "approved").length,
        published: launches.filter(l => l.status === "published").length

    };

    const items = [

        {
            label: "Total",
            value: launches.length,
            color: "#A855F7"
        },

        ...Object.entries(counts).map(([status, value]) => ({
            label: LAUNCH_STATUS[status].label,
            value,
            color: LAUNCH_STATUS[status].color
        }))

    ];

    return (

        <div className="calendar-card">

            <h3 class="font-bold">Monthly Summary</h3>

            <div className="summary-list">

                {items.map(item => (

                    <div
                        key={item.label}
                        className="summary-item"
                    >

                        <div className="summary-left">

                            <span
                                className="summary-dot"
                                style={{
                                    background: item.color
                                }}
                            />

                            <span>{item.label}</span>

                        </div>

                        <strong
                            style={{
                                color: item.color
                            }}
                        >
                            {item.value}
                        </strong>

                    </div>

                ))}

            </div>

        </div>

    );

}