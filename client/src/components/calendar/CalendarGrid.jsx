import CalendarCell from "./CalendarCell";
import "./Calendar.css"
import { getCalendarDays, groupLaunchesByDate } from "../../utils/calendarUtils";

const weekDays = [

    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"

];

export default function CalendarGrid({

    currentDate,
    launches

}) {

    const days = getCalendarDays(currentDate);
    const launchesByDate = groupLaunchesByDate(launches);

    return (

        <div className="calendar">

            <div className="calendar-header">

                {weekDays.map(day => (

                    <div key={day}>

                        {day}

                    </div>

                ))}

            </div>

            <div className="calendar-grid">

                {days.map((day, index) => (

                    <CalendarCell

                        key={day.date.toISOString()}
                                    
                        date={day.date}
                                    
                        day={day.day}
                                    
                        currentMonth={day.currentMonth}
                                    
                        launches={
                            day.currentMonth
                                ? launchesByDate[day.date.toDateString()] || []
                                : []
                        }
                    />

                ))}

            </div>

        </div>

    );

}