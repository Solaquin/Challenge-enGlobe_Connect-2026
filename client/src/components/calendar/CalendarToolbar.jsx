import {
    FiChevronLeft,
    FiChevronRight,
    FiFilter
} from "react-icons/fi";

import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

import "./Calendar.css";

export default function CalendarToolbar({

    currentDate,
    onPrevious,
    onNext,

    market,
    status,

    onMarketChange,
    onStatusChange,

    markets = []

}) {

    return (

        <div className="calendar-toolbar">

            <div className="calendar-navigation">

                <button

                    type="button"

                    onClick={onPrevious}

                    aria-label="Previous month"

                >

                    <FiChevronLeft />

                </button>

                <h2>

                    {currentDate.toLocaleString("en-US", {

                        month: "long",
                        year: "numeric"

                    })}

                </h2>

                <button

                    type="button"

                    onClick={onNext}

                    aria-label="Next month"

                >

                    <FiChevronRight />

                </button>

            </div>

            <div className="calendar-filters">

                <div className="calendar-filter-group">

                    <FiFilter className="calendar-filter-icon" />

                    <select

                        value={market}

                        onChange={onMarketChange}

                    >

                        <option value="">

                            All Markets

                        </option>

                        {markets.map((market) => (

                            <option

                                key={market.value}

                                value={market.value}

                            >

                                {market.label}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="calendar-filter-group">

                    <FiFilter className="calendar-filter-icon" />

                    <select

                        value={status}

                        onChange={onStatusChange}

                    >

                        <option value="">

                            All Status

                        </option>

                        {Object.entries(LAUNCH_STATUS).map(

                            ([value, config]) => (

                                <option

                                    key={value}

                                    value={value}

                                >

                                    {config.label}

                                </option>

                            )

                        )}

                    </select>

                </div>

            </div>

        </div>

    );

}