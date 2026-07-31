import { FiCalendar, FiFileText, FiGlobe } from "react-icons/fi";

import { parseLocalDate } from "../../utils/calendarUtils";

export default function LaunchInfoCard({ launch }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-8
            "
        >

            <h2 className="mb-6 text-xl font-semibold text-gray-900">

                Launch Information

            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-4
                    "
                >

                    <div className="flex items-center gap-2 text-gray-500">

                        <FiGlobe />

                        <span className="text-sm font-medium">

                            Market

                        </span>

                    </div>

                    <p className="mt-2 font-semibold text-gray-900">

                        {launch.market}

                    </p>

                </div>

                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-4
                    "
                >

                    <div className="flex items-center gap-2 text-gray-500">

                        <FiCalendar />

                        <span className="text-sm font-medium">

                            Release Date

                        </span>

                    </div>

                    <p className="mt-2 font-semibold text-gray-900">

                        {parseLocalDate(
                            launch.release_date
                        ).toLocaleDateString()}

                    </p>

                </div>

                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-5
                        md:col-span-2
                    "
                >

                    <div className="flex items-center gap-2 text-gray-500">

                        <FiFileText />

                        <span className="text-sm font-medium">

                            Description

                        </span>

                    </div>

                    <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-700">

                        {launch.description?.trim()
                            ? launch.description
                            : "No description provided."}

                    </p>

                </div>

            </div>

        </div>

    );

}