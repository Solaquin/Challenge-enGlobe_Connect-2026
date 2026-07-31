import StatusBadge from "../dashboard/StatusBadge";
import { FiClock, FiUser } from "react-icons/fi";

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });

}

export default function LaunchHistoryCard({ history }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
            "
        >

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-xl font-semibold text-gray-900">

                    Status History

                </h2>

            </div>

            <div className="p-6">

                {history.length === 0 ? (

                    <div
                        className="
                            rounded-xl
                            border
                            border-dashed
                            border-gray-300
                            bg-gray-50
                            py-10
                            text-center
                        "
                    >

                        <p className="text-gray-500">

                            No status changes recorded.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {history.map((entry, index) => (

                            <div
                                key={entry.id}
                                className="relative flex gap-4"
                            >

                                {/* Timeline */}

                                <div className="relative flex flex-col items-center">

                                    <div
                                        className="
                                            h-4
                                            w-4
                                            rounded-full
                                            bg-violet-500
                                            ring-4
                                            ring-violet-100
                                        "
                                    />

                                    {index !== history.length - 1 && (

                                        <div
                                            className="
                                                mt-2
                                                h-full
                                                w-px
                                                bg-gray-200
                                            "
                                        />

                                    )}

                                </div>

                                {/* Content */}

                                <div
                                    className="
                                        flex-1
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                    "
                                >

                                    <StatusBadge
                                        status={entry.new_status}
                                    />

                                    <div className="mt-3 space-y-2 text-sm">

                                        <div className="flex items-center gap-2 text-gray-500">

                                            <FiClock className="text-gray-400" />

                                            <span>

                                                {formatDate(entry.changed_at)}

                                            </span>

                                        </div>

                                        {entry.changed_by && (

                                            <div className="flex items-center gap-2 text-gray-600">

                                                <FiUser className="text-gray-400" />

                                                <span>

                                                    Changed by{" "}

                                                    <strong>

                                                        {entry.changed_by}

                                                    </strong>

                                                </span>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}