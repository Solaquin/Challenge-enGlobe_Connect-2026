import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CalendarDayModal from "./CalendarDayModal";
import { LAUNCH_STATUS } from "../../constants/launchStatusColors";
import "./Calendar.css";

export default function CalendarCell({

    date,
    day,
    currentMonth,
    launches

}) {

    const navigate = useNavigate();

    const today = new Date();

    const [openModal, setOpenModal] = useState(false);


    const isToday =
        date.toDateString() === today.toDateString();

    const MAX_VISIBLE_EVENTS = 2;

    const visibleLaunches = launches.slice(0, MAX_VISIBLE_EVENTS);
    const hiddenCount = launches.length - MAX_VISIBLE_EVENTS;

    return (

        <div
            className={`calendar-cell ${!currentMonth ? "outside" : ""}`}
        >

            <div
                className={`calendar-day ${
                    isToday ? "today" : ""
                }`}
            >
            
                {day}
            
            </div>

            <div className="calendar-events">

                {visibleLaunches.map(launch => {

                    const statusStyle = LAUNCH_STATUS[launch.status];
                    
                    return (<div

                        key={launch.id}

                        className="calendar-event"

                        style={{

                            background: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`

                        }}

                        onClick={() =>
                            navigate(`/dashboard/launches/${launch.id}`)}
                    >
                        

                        <div className="calendar-event-dot" />

                            <span>
                                {launch.title}
                            </span>

                    </div>);

                })}

                {hiddenCount > 0 && (

                    <button
                        className="calendar-more"
                        onClick={() => setOpenModal(true)}
                    >
                    
                        +{hiddenCount} more
                    
                    </button>

                )}

            </div>

            <CalendarDayModal

                open={openModal}

                date={date}

                launches={launches}

                onClose={() => setOpenModal(false)}

            />

        </div>
        

    );

}