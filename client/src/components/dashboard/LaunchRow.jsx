import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

function LaunchRow({ launch }) {

    const navigate = useNavigate();

    return (

        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">

            <td className="px-6 py-4 font-medium text-gray-900">
                {launch.title}
            </td>

            <td className="px-6 py-4 text-gray-600">
                {launch.market}
            </td>

            <td className="px-6 py-4 text-gray-600">
                {launch.release_date}
            </td>

            <td className="px-6 py-4">
                <StatusBadge status={launch.status}/>
            </td>

            <td className="px-6 py-4 text-right">

                <button
                    onClick={() => navigate(`/dashboard/launches/${launch.id}`)}
                    className="
                        rounded-lg
                        bg-violet-600
                        px-10
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition-colors
                        hover:bg-violet-800
                        cursor-pointer
                    "
                >
                    View
                </button>

            </td>

        </tr>

    );

}

export default LaunchRow;