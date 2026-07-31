import { useState, useEffect } from "react";
import "../components/calendar/Calendar.css"
import { MARKETS } from "../constants/markets";

import CalendarGrid from "../components/calendar/CalendarGrid";
import Layout from "../components/layout/Layout";
import LaunchService from "../services/launchService";

import CalendarToolbar from "../components/calendar/CalendarToolbar";
import UpcomingEvents from "../components/calendar/UpcomingEvents";
import CalendarSummary from "../components/calendar/CalendarSummary";

export default function CalendarPage() {

    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [launches, setLaunches] = useState([]);

    const [market, setMarket] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {

        async function loadLaunches() {

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

        loadLaunches();

    }, [currentDate, market, status]);

    const monthLaunches = launches.filter((launch) => {

        const releaseDate = new Date(launch.release_date);

        return (

            releaseDate.getMonth() === currentDate.getMonth() &&
            releaseDate.getFullYear() === currentDate.getFullYear()

        );

    });

    return (

        <Layout>

            <div className="calendar-page">

                <main className="calendar-main">

                    <CalendarToolbar

                        currentDate={currentDate}

                        onPrevious={() =>
                            setCurrentDate(
                            
                                new Date(
                                
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() - 1,
                                    1
                                
                                )
                            
                            )
                        }
                    
                        onNext={() =>
                            setCurrentDate(
                            
                                new Date(
                                
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() + 1,
                                    1
                                
                                )
                            
                            )
                        }
                    
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

                    <CalendarGrid
                        currentDate={currentDate}
                        launches={monthLaunches}
                    />

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