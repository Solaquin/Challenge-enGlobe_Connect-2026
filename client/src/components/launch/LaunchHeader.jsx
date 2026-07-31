import {
    FiCalendar,
    FiGlobe,
    FiTag
} from "react-icons/fi";

import StatusBadge from "../dashboard/StatusBadge";
import { parseLocalDate } from "../../utils/calendarUtils";

export default function LaunchHeader({ launch }) {

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

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        {launch.title}

                    </h1>

                    {launch.description && (

                        <p className="mt-3 max-w-3xl leading-7 text-gray-600">

                            {launch.description}

                        </p>

                    )}

                </div>

                <StatusBadge status={launch.status} />

            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

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
                        p-4
                    "
                >

                    <div className="flex items-center gap-2 text-gray-500">

                        <FiTag />

                        <span className="text-sm font-medium">

                            Current Status

                        </span>

                    </div>

                    <div className="mt-2">

                        <StatusBadge status={launch.status} />

                    </div>

                </div>

            </div>

        </div>

    );

}