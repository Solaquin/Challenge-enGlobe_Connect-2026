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

                <button onClick={onPrevious}>
                    ←
                </button>

                <h2>

                    {currentDate.toLocaleString("en-US", {

                        month: "long",
                        year: "numeric"

                    })}

                </h2>

                <button onClick={onNext}>
                    →
                </button>

            </div>

            <div className="calendar-filters">

                <select
                    value={market}
                    onChange={onMarketChange}
                >

                    <option value="">
                        All Markets
                    </option>

                    {
                    markets.map(market => (

                        <option
                            key={market.value}
                            value={market.value}
                        >

                            {market.label}

                        </option>

                    ))}

                </select>

                <select
                    value={status}
                    onChange={onStatusChange}
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="draft">
                        Draft
                    </option>

                    <option value="review">
                        Review
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="published">
                        Published
                    </option>

                </select>

            </div>

        </div>

    );

}