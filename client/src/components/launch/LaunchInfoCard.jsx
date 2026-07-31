import InfoField from "./InfoField";

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(undefined, {

        year: "numeric",
        month: "long",
        day: "numeric"

    });

}

export default function LaunchInfoCard({ launch }) {

    return (

        <div className="bg-white rounded-lg shadow-md">

            <div className="border-b px-6 py-4">

                <h2 className="text-lg font-semibold">

                    Launch Information

                </h2>

            </div>

            <div className="p-6 space-y-8">

                <div>

                    <h3 className="text-sm font-medium text-gray-500 mb-2">

                        Description

                    </h3>

                    <p className="text-gray-700 whitespace-pre-wrap">

                        {launch.description || "No description provided."}

                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

            </div>

        </div>

    );

}