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

                </div>

                <StatusBadge status={launch.status} />

            </div>

        </div>

    );

}