import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import "../components/calendar/Calendar.css";

import { MARKETS } from "../constants/markets";

import Layout from "../components/layout/Layout";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import UpcomingEvents from "../components/calendar/UpcomingEvents";
import CalendarSummary from "../components/calendar/CalendarSummary";

import LaunchService from "../services/launchService";

import { parseLocalDate } from "../utils/calendarUtils";

export default function CalendarPage() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const [launches, setLaunches] = useState([]);

    const [market, setMarket] = useState("");

    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadLaunches();

    }, [currentDate, market, status]);

    async function loadLaunches() {

        try {

            setLoading(true);

            const month = currentDate.getMonth() + 1;

            const year = currentDate.getFullYear();

            const response = await LaunchService.getLaunches({

                month,
                year,
                market,
                status

            });

            setLaunches(response.data);

        }
        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to load launches."

            );

        }
        finally {

            setLoading(false);

        }

    }

    function changeMonth(offset) {

        setCurrentDate(

            new Date(

                currentDate.getFullYear(),

                currentDate.getMonth() + offset,

                1

            )

        );

    }

    const monthLaunches = useMemo(() => {

        return launches.filter((launch) => {

            const releaseDate = parseLocalDate(
                launch.release_date
            );

            return (

                releaseDate.getMonth() === currentDate.getMonth() &&
                releaseDate.getFullYear() === currentDate.getFullYear()

            );

        });

    }, [launches, currentDate]);

    return (

        <Layout>

            <div className="calendar-page">

                <main className="calendar-main">

                    <CalendarToolbar

                        currentDate={currentDate}

                        onPrevious={() => changeMonth(-1)}

                        onNext={() => changeMonth(1)}

                        market={market}

                        status={status}

                        onMarketChange={(e) =>

                            setMarket(e.target.value)

                        }

                        onStatusChange={(e) =>

                            setStatus(e.target.value)

                        }

                        markets={MARKETS}

                    />

                    {loading ? (

                        <div
                            className="
                                flex
                                h-[600px]
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                text-gray-500
                            "
                        >

                            Loading calendar...

                        </div>

                    ) : (

                        <CalendarGrid

                            currentDate={currentDate}

                            launches={monthLaunches}

                        />

                    )}

                </main>

                <aside className="calendar-sidebar">

                    <UpcomingEvents

                        launches={monthLaunches}

                    />

                    <CalendarSummary

                        launches={monthLaunches}

                    />

                </aside>

            </div>

        </Layout>

    );

}