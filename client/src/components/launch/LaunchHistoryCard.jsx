import StatusBadge from "../dashboard/StatusBadge";

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });

}

export default function LaunchHistoryCard({ history }) {

    return (

        <div className="bg-white rounded-lg shadow-md">

            <div className="border-b px-6 py-4">

                <h2 className="text-lg font-semibold">

                    Status History

                </h2>

            </div>

            <div className="p-6">

                {history.length === 0 ? (

                    <p className="text-gray-500">

                        No status changes recorded.

                    </p>

                ) : (

                    <div className="space-y-6">

                        {history.map((entry, index) => (

                            <div
                                key={entry.id}
                                className="relative pl-8"
                            >

                                {index !== history.length - 1 && (

                                    <div
                                        className="absolute left-[9px] top-6 w-px h-full bg-gray-300"
                                    />

                                )}

                                <div
                                    className="absolute left-0 top-1 h-5 w-5 rounded-full bg-violet-500"
                                />

                                <div className="space-y-2">

                                    <StatusBadge
                                        status={entry.new_status}
                                    />

                                    <p className="text-sm text-gray-500">

                                        {formatDate(entry.changed_at)}

                                    </p>

                                    {entry.changed_by && (

                                        <p className="text-sm text-gray-600">

                                            by <span className="font-medium">

                                                {entry.changed_by}

                                            </span>

                                        </p>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}