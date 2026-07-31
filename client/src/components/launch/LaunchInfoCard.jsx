import InfoField from "./InfoField";

import { parseLocalDate } from "../../utils/calendarUtils";

function formatDate(date) {

    if (!date) return "-";

    // Fecha simple: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {

        return parseLocalDate(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    }

    // Fecha con hora (ISO o timestamp SQL)
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}

export default function LaunchInfoCard({ launch }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
            "
        >

            <div className="border-b border-gray-200 px-8 py-5">

                <h2 className="text-xl font-semibold text-gray-900">

                    Launch Information

                </h2>

            </div>

            <div className="space-y-8 p-8">

                <section>

                    <h3 className="mb-3 text-sm font-medium text-gray-500">

                        Description

                    </h3>

                    <div
                        className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            p-5
                        "
                    >

                        <p className="whitespace-pre-wrap leading-7 text-gray-700">

                            {launch.description?.trim()
                                ? launch.description
                                : "No description provided."}

                        </p>

                    </div>

                </section>

                <section>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <InfoField
                            label="Market"
                            value={launch.market}
                        />

                        <InfoField
                            label="Release Date"
                            value={formatDate(launch.release_date)}
                        />

                        <InfoField
                            label="Created At"
                            value={formatDate(launch.created_at)}
                        />

                        <InfoField
                            label="Updated At"
                            value={formatDate(launch.updated_at)}
                        />

                    </div>

                </section>

            </div>

        </div>

    );

}