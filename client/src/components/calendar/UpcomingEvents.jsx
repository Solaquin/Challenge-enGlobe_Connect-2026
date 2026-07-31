import UpcomingEventCard from "./UpcomingEventCard";
import { parseLocalDate } from "../../utils/calendarUtils";

export default function UpcomingEvents({

    launches

}) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = launches
        .filter(launch => parseLocalDate(launch.release_date) >= today)
        .sort(
            (a, b) =>
                parseLocalDate(a.release_date) -
                parseLocalDate(b.release_date)
        )
        .slice(0, 5);

    return (

        <div className="calendar-card">

            <h3 class= "font-bold">

                Upcoming Events

            </h3>

            {

                upcoming.length === 0

                    ? (

                        <p>No upcoming launches.</p>

                    )

                    : (

                        upcoming.map(launch => (

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