import { useNavigate } from "react-router-dom";
import { LAUNCH_STATUS } from "../../constants/launchStatusColors";
import { parseLocalDate } from "../../utils/calendarUtils";

export default function UpcomingEventCard({

    launch

}) {

    const navigate = useNavigate();

    const statusStyle = LAUNCH_STATUS[launch.status];

    return (

        <div

            className="upcoming-card"

            onClick={() =>
                navigate(`/dashboard/launches/${launch.id}`)
            }

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

                    {

                        parseLocalDate(launch.release_date).toLocaleDateString()
                        

                    }

                </span>

            </div>

            <span
                className="upcoming-status"
                style={{
                    background: statusStyle.bg,
                    color: statusStyle.color,
                    border: `1px solid ${statusStyle.border}`
                }}
            >

                {statusStyle.label}

            </span>

        </div>

    );

}