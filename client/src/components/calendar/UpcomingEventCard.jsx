import { useNavigate } from "react-router-dom";

import StatusBadge from "../dashboard/StatusBadge";

import { LAUNCH_STATUS } from "../../constants/launchStatusColors";
import { parseLocalDate } from "../../utils/calendarUtils";

export default function UpcomingEventCard({

    launch

}) {

    const navigate = useNavigate();

    const statusStyle = LAUNCH_STATUS[launch.status];

    function handleClick() {

        navigate(`/dashboard/launches/${launch.id}`);

    }

    return (

        <button

            type="button"

            className="upcoming-card"

            onClick={handleClick}

        >

            <div
                className="status-dot"
                style={{
                    background: statusStyle.color
                }}
            />

            <div className="upcoming-info">

                <strong>

                    {launch.title}

                </strong>

                <span>

                    {parseLocalDate(

                        launch.release_date

                    ).toLocaleDateString(undefined, {

                        month: "short",

                        day: "numeric",

                        year: "numeric"

                    })}

                </span>

            </div>

            <StatusBadge

                status={launch.status}

            />

        </button>

    );

}