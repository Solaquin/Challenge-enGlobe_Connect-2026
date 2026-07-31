import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

function StatusBadge({ status }) {

    const current = LAUNCH_STATUS[status] ?? {

        label: status,

        badgeClass: "bg-gray-100 text-gray-700"

    };

    return (

        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${current.badgeClass}`}
        >
            {current.label}
        </span>

    );

}

export default StatusBadge;