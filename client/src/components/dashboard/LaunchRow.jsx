import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

function LaunchRow({ launch }) {

    const navigate = useNavigate();

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-4 font-medium">
                {launch.title}
            </td>

            <td className="p-4">
                {launch.market}
            </td>

            <td className="p-4">
                {launch.release_date}
            </td>

            <td className="p-4">
                <StatusBadge status={launch.status} />
            </td>

            <td className="p-4">

                <button
                    onClick={() => navigate(`/dashboard/launches/${launch.id}`)}
                    className="
                        bg-violet-600
                        text-white
                        px-6
                        py-2
                        rounded-lg
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