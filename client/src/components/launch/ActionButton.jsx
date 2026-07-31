export default function ActionButton({

    icon,
    label,
    onClick,
    variant = "primary",
    disabled = false

}) {

    const variants = {

        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white"

    };

    return (

        <button

            onClick={onClick}

            disabled={disabled}

            className={`
                w-full
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                px-4
                py-2.5
                font-medium
                transition-colors

                ${variants[variant]}

                disabled:opacity-50
                disabled:cursor-not-allowed
            `}

        >

            {icon}

            <span>

                {label}

            </span>

        </button>

    );

}