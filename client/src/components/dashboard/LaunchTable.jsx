import LaunchRow from "./LaunchRow";

function LaunchTable({ launches }) {

    return (

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                            Title
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                            Market
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                            Release Date
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                            Status
                        </th>

                        <th className="w-24"></th>

                    </tr>

                </thead>

                <tbody>

                    {launches.map((launch) => (
                    
                        <LaunchRow
                            key={launch.id}
                            launch={launch}
                        />
                    
                    ))}

                </tbody>
                
            </table>
        </div>

    );

}

export default LaunchTable;