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

        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

            <div className="grid grid-cols-4 gap-4">

                <input
                    type="text"
                    name="search"
                    placeholder="Search launch..."
                    value={filters.search}
                    onChange={handleChange}
                    className="border-1 border-gray-300 rounded-lg px-4 py-2"
                />

                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="border-1 border-gray-300 rounded-lg px-4 py-2"
                >

                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>

                </select>

                <input
                    type="text"
                    name="market"
                    placeholder="Market"
                    value={filters.market}
                    onChange={handleChange}
                    className="border-1 border-gray-300 rounded-lg px-4 py-2"
                />

                <input
                    type="date"
                    name="release_date"
                    value={filters.release_date}
                    onChange={handleChange}
                    className="border-1 border-gray-300 rounded-lg px-4 py-2"
                />

            </div>

        </div>

    );

}

export default FilterBar;