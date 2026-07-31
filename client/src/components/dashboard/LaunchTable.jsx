import LaunchRow from "./LaunchRow";

function LaunchTable({ launches }) {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Recent Launches

                    </h2>

                    <p className="text-sm text-gray-500">

                        Showing {launches.length} launch{launches.length !== 1 ? "es" : ""}

                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="border-b border-gray-200 bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Title

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Market

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Release Date

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Status

                            </th>

                            <th className="w-24 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {launches.length > 0 ? (

                            launches.map((launch) => (

                                <LaunchRow
                                    key={launch.id}
                                    launch={launch}
                                />

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="px-6 py-16 text-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">

                                            📦

                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900">

                                            No launches found

                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">

                                            Try adjusting your filters or create a new launch.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LaunchTable;