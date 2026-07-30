import LaunchRow from "./LaunchRow";

function LaunchTable({ launches }) {

    return (

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm p-4">
            <table className="w-full">

                <thead>

                    <tr className="border-b bg-gray-50">

                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Market</th>
                        <th className="text-left p-4">Release Date</th>
                        <th className="text-left p-4">Status</th>

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