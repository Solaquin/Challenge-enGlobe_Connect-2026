import { Link } from "react-router-dom";

function PageHeader() {

    return (

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Launches

                </h1>

                <p className="text-gray-500 mt-1">

                    Manage and monitor all product launches.

                </p>

            </div>

            <Link
                to="/dashboard/launches/new"
                className="
                    bg-violet-600
                    hover:bg-violet-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                "
            >
                + New Launch
            </Link>

        </div>

    );

}

export default PageHeader;