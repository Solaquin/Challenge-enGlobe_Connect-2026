import StatusBadge from "../dashboard/StatusBadge";

export default function LaunchHeader({ launch }) {

    return (

        <div className="bg-white rounded-lg shadow-md p-6">

            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {launch.title}
                    </h1>

                    {launch.description && (

                        <p className="mt-2 text-gray-600 max-w-3xl">
                            {launch.description}
                        </p>

                    )}

                </div>

                <StatusBadge status={launch.status} />

            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        Market
                    </p>

                    <p className="mt-1 font-semibold">
                        {launch.market}
                    </p>

                </div>

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        Release Date
                    </p>

                    <p className="mt-1 font-semibold">
                        {new Date(launch.release_date).toLocaleDateString()}
                    </p>

                </div>

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        Current Status
                    </p>

                    <p className="mt-1 font-semibold capitalize">
                        {launch.status}
                    </p>

                </div>

            </div>

        </div>

    );

}