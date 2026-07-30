import StatusBadge from "./StatusBadge";

function LaunchRow({ launch }) {

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
                    className="
                        bg-violet-600
                        text-white
                        px-6
                        py-2
                        rounded-lg
                        hover:bg-violet-800
                    "
                >

                    View

                </button>

            </td>

        </tr>

    );

}

export default LaunchRow;