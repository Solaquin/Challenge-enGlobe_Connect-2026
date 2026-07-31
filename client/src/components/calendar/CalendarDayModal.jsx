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

    if (!open) return null;

    return (

        <div className="calendar-modal-overlay" onClick={onClose}>

            <div
                className="calendar-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="calendar-modal-header">

                    <h3>

                        {date.toLocaleDateString("en-US", {

                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"

                        })}

                    </h3>

                    <button onClick={onClose}>

                        ✕

                    </button>

                </div>

                <div className="calendar-modal-body">

                    {launches.map(launch => {

                        const statusStyle = LAUNCH_STATUS[launch.status];

                        return(
                        <div

                            key={launch.id}

                            className="calendar-modal-item"

                            onClick={() =>
                                navigate(`/dashboard/launches/${launch.id}`)
                            }

                        >

                            <span

                                className="status-dot"

                                style={{
                                    background: statusStyle.color
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
                                
                                    background: statusStyle.bg,
                                    color: statusStyle.color,
                                    border: `1px solid ${statusStyle.border}`
                                
                                }}
                            
                            >
                            
                                {statusStyle.label}
                            
                            </span>

                        </div>)

                    })}

                </div>

            </div>

        </div>

    );

}