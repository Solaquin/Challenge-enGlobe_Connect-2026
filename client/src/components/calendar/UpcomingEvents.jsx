import { useMemo } from "react";
import { FiCalendar } from "react-icons/fi";

import UpcomingEventCard from "./UpcomingEventCard";
import { parseLocalDate } from "../../utils/calendarUtils";

const MAX_UPCOMING_EVENTS = 5;

export default function UpcomingEvents({

    launches

}) {

    const upcoming = useMemo(() => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return launches

            .map((launch) => ({

                ...launch,

                parsedDate: parseLocalDate(

                    launch.release_date

                )

            }))

            .filter(

                (launch) =>

                    launch.parsedDate >= today

            )

            .sort(

                (a, b) =>

                    a.parsedDate - b.parsedDate

            )

            .slice(

                0,

                MAX_UPCOMING_EVENTS

            );

    }, [launches]);

    return (

        <div className="calendar-card">

            <div className="calendar-card-header">

                <div className="calendar-card-title">
                
                    <FiCalendar className="calendar-card-icon" />
                
                    <h3>Upcoming Events</h3>
                
                </div>
                
                <span className="calendar-card-count">
                
                    {upcoming.length}
                
                </span>
                
            </div>

            {

                upcoming.length === 0 ? (

                    <div
                        className="
                            py-8
                            text-center
                            text-sm
                            text-gray-500
                        "
                    >

                        No upcoming launches.

                    </div>

                ) : (

                    upcoming.map((launch) => (

                        <UpcomingEventCard

                            key={launch.id}

                            launch={launch}

                        />

                    ))

                )

            }

        </div>

    );

}