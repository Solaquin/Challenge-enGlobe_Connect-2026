import { LAUNCH_STATUS } from "../../constants/launchStatusColors";

function StatusBadge({ status }) {

    const current = LAUNCH_STATUS[status] ?? {

        label: status,
        bg: "#F3F4F6",
        color: "#374151",
        border: "#E5E7EB"

    };

    const Icon = current.icon;

    return (

        <span
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-5    
                py-2
                text-xs
                font-semibold
                transition-colors
            "
            style={{

                backgroundColor: current.bg,
                color: current.color,
                borderColor: current.border

            }}
        >

            {Icon && (

                <Icon
                    className="h-3.5 w-3.5 flex-shrink-0"
                />

            )}

            <span>{current.label}</span>

        </span>

    );

}

export default StatusBadge;