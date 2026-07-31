import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./Calendar.css";

import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

export default function CalendarDayModal({

    open,
    date,
    launches,
    onClose

}) {

    const navigate = useNavigate();

    if (!open) {

        return null;

    }

    function handleLaunchClick(id) {

        navigate(`/dashboard/launches/${id}`);

        onClose();

    }

    return (

        <div

            className="calendar-modal-overlay"

            onClick={onClose}

        >

            <div

                className="calendar-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="calendar-modal-header">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">

                            {date.toLocaleDateString("en-US", {

                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric"

                            })}

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            {launches.length} launch{launches.length !== 1 ? "es" : ""}

                        </p>

                    </div>

                    <button

                        type="button"

                        onClick={onClose}

                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            text-gray-500
                            transition-all
                            duration-200
                            hover:bg-gray-50
                            hover:text-gray-700
                        "

                        aria-label="Close"

                    >

                        <FiX />

                    </button>

                </div>

                <div className="calendar-modal-body">

                    {launches.length === 0 ? (

                        <div
                            className="
                                py-10
                                text-center
                                text-gray-500
                            "
                        >

                            No launches scheduled.

                        </div>

                    ) : (

                        launches.map((launch) => {

                            const statusStyle =

                                LAUNCH_STATUS[launch.status];

                            return (

                                <button

                                    key={launch.id}

                                    type="button"

                                    className="calendar-modal-item"

                                    onClick={() =>

                                        handleLaunchClick(

                                            launch.id

                                        )

                                    }

                                >

                                    <span

                                        className="status-dot"

                                        style={{

                                            background:

                                                statusStyle.color

                                        }}

                                    />

                                    <div className="calendar-modal-info">

                                        <strong>

                                            {launch.title}

                                        </strong>

                                        <span>

                                            {launch.market}

                                        </span>

                                    </div>

                                    <span

                                        className="upcoming-status"

                                        style={{

                                            background:

                                                statusStyle.bg,

                                            color:

                                                statusStyle.color,

                                            border:

                                                `1px solid ${statusStyle.border}`

                                        }}

                                    >

                                        {statusStyle.label}

                                    </span>

                                </button>

                            );

                        })

                    )}

                </div>

            </div>

        </div>

    );

}