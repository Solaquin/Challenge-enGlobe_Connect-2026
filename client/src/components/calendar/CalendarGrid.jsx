import { useMemo } from "react";

import "./Calendar.css";

import CalendarCell from "./CalendarCell";

import {

    getCalendarDays,
    groupLaunchesByDate

} from "../../utils/calendarUtils";

const WEEK_DAYS = [

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

    const days = useMemo(

        () => getCalendarDays(currentDate),

        [currentDate]

    );

    const launchesByDate = useMemo(

        () => groupLaunchesByDate(launches),

        [launches]

    );

    return (

        <div className="calendar">

            <div className="calendar-header">

                {WEEK_DAYS.map((day) => (

                    <div key={day}>

                        {day}

                    </div>

                ))}

            </div>

            <div className="calendar-grid">

                {days.map((day) => (

                    <CalendarCell

                        key={day.date.toISOString()}

                        date={day.date}

                        day={day.day}

                        currentMonth={day.currentMonth}

                        launches={

                            day.currentMonth

                                ? launchesByDate[day.date.toDateString()] ?? []

                                : []

                        }

                    />

                ))}

            </div>

        </div>

    );

}