import { FiSearch, FiFilter } from "react-icons/fi";
import { MARKETS } from "../../constants/markets";

function FilterBar({

    filters,
    setFilters

}) {

    function handleChange(e) {

        setFilters({

            ...filters,

            [e.target.name]: e.target.value

        });

    }

    return (

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">

            <div className="mb-4 flex items-center gap-2">

                <FiFilter className="text-violet-600" />

                <h2 className="text-sm font-semibold text-gray-700">

                    Filters

                </h2>

            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                {/* Search */}

                <div className="relative">

                    <FiSearch
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input

                        type="text"

                        name="search"

                        placeholder="Search launch..."

                        value={filters.search}

                        onChange={handleChange}

                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            py-2.5
                            pl-10
                            pr-4
                            outline-none
                            transition
                            focus:border-violet-500
                            focus:ring-2
                            focus:ring-violet-100
                        "

                    />

                </div>

                {/* Status */}

                <select

                    name="status"

                    value={filters.status}

                    onChange={handleChange}

                    className="
                        w-full
                        cursor-pointer
                        rounded-xl
                        border
                        border-gray-200
                        px-4
                        py-2.5
                        outline-none
                        transition
                        focus:border-violet-500
                        focus:ring-2
                        focus:ring-violet-100
                    "

                >

                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>

                </select>

                {/* Market */}

                <select

                    name="market"

                    value={filters.market}

                    onChange={handleChange}

                    className="
                        w-full
                        cursor-pointer
                        rounded-xl
                        border
                        border-gray-200
                        px-4
                        py-2.5
                        outline-none
                        transition
                        focus:border-violet-500
                        focus:ring-2
                        focus:ring-violet-100
                    "

                >

                    <option value="">

                        All Markets

                    </option>

                    {

                        MARKETS.map((market) => (

                            <option
                                key={market.value}
                                value={market.value}
                            >

                                {market.label}

                            </option>

                        ))

                    }

                </select>

                {/* Date */}

                <input

                    type="date"

                    name="release_date"

                    value={filters.release_date}

                    onChange={handleChange}

                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        px-4
                        py-2.5
                        outline-none
                        transition
                        focus:border-violet-500
                        focus:ring-2
                        focus:ring-violet-100
                    "

                />

            </div>

        </div>

    );

}

export default FilterBar;