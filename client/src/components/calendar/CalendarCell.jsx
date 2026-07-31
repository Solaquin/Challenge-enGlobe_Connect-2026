import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarDayModal from "./CalendarDayModal";

import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

import "./Calendar.css";

const MAX_VISIBLE_EVENTS = 2;

export default function CalendarCell({

    date,
    day,
    currentMonth,
    launches

}) {

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const isToday = useMemo(() => {

        return date.toDateString() === new Date().toDateString();

    }, [date]);

    const visibleLaunches = launches.slice(

        0,

        MAX_VISIBLE_EVENTS

    );

    const hiddenCount = Math.max(

        launches.length - MAX_VISIBLE_EVENTS,

        0

    );

    function handleLaunchClick(id) {

        navigate(`/dashboard/launches/${id}`);

    }

    return (

        <div
            className={`
                calendar-cell
                ${!currentMonth ? "outside" : ""}
            `}
        >

            <div
                className={`
                    calendar-day
                    ${isToday ? "today" : ""}
                `}
            >

                {day}

            </div>

            <div className="calendar-events">

                {visibleLaunches.map((launch) => {

                    const statusStyle =
                        LAUNCH_STATUS[launch.status];

                    return (

                        <button

                            key={launch.id}

                            type="button"

                            className="calendar-event"

                            style={{

                                background: statusStyle.bg,

                                color: statusStyle.color,

                                border: `1px solid ${statusStyle.border}`

                            }}

                            onClick={() =>

                                handleLaunchClick(

                                    launch.id

                                )

                            }

                            title={`${launch.title} (${statusStyle.label})`}

                        >

                            <div className="calendar-event-dot" />

                            <span className="truncate">

                                {launch.title}

                            </span>

                        </button>

                    );

                })}

                {hiddenCount > 0 && (

                    <button

                        type="button"

                        className="calendar-more"

                        onClick={() =>

                            setOpenModal(true)

                        }

                    >

                        +{hiddenCount} more

                    </button>

                )}

            </div>

            <CalendarDayModal

                open={openModal}

                date={date}

                launches={launches}

                onClose={() =>

                    setOpenModal(false)

                }

            />

        </div>

    );

}