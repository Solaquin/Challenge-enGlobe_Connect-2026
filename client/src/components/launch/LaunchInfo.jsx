export default function LaunchInfo({ launch }) {

    return (

        <div className="bg-white rounded-lg shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">
                Launch Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <p className="text-sm text-gray-500">
                        Market
                    </p>

                    <p className="font-medium">
                        {launch.market}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Release Date
                    </p>

                    <p className="font-medium">
                        {new Date(launch.release_date).toLocaleDateString()}
                    </p>
                </div>

                <div className="md:col-span-2">

                    <p className="text-sm text-gray-500">
                        Description
                    </p>

                    <p className="mt-1 whitespace-pre-wrap">
                        {launch.description || "No description provided."}
                    </p>

                </div>

            </div>

        </div>

    );

}