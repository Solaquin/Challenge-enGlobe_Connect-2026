import { FiArrowRight, FiCalendar, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import { parseLocalDate } from "../../utils/calendarUtils";

function LaunchRow({ launch }) {

    const navigate = useNavigate();

    const formattedDate = parseLocalDate(
        launch.release_date
    ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (

        <tr
            className="
                transition-colors
                duration-200
                hover:bg-gray-50
            "
        >

            <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-100
                            text-violet-600
                        "
                    >

                        <FiPackage />

                    </div>

                    <div>

                        <p className="font-semibold text-gray-900">

                            {launch.title}

                        </p>

                        <p className="text-xs text-gray-500">

                            #{launch.id}

                        </p>

                    </div>

                </div>

            </td>

            <td className="px-6 py-4">

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-gray-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-gray-700
                    "
                >

                    {launch.market}

                </span>

            </td>

            <td className="px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600">

                    <FiCalendar className="text-gray-400" />

                    <span>{formattedDate}</span>

                </div>

            </td>

            <td className="px-6 py-4">

                <StatusBadge status={launch.status} />

            </td>

            <td className="px-6 py-4 text-right">

                <button
                    onClick={() =>
                        navigate(`/dashboard/launches/${launch.id}`)
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-violet-200
                        bg-violet-50
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-violet-700
                        transition-all
                        duration-200
                        hover:bg-violet-600
                        hover:text-white
                        hover:border-violet-600
                        cursor-pointer
                    "
                >

                    View

                    <FiArrowRight />

                </button>

            </td>

        </tr>

    );

}

export default LaunchRow;