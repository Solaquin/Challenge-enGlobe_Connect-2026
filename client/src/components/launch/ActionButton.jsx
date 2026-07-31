export default function ActionButton({

    icon,
    label,
    onClick,
    variant = "primary",
    disabled = false

}) {

    const variants = {

        primary: `
            border
            border-violet-200
            bg-violet-50
            text-violet-700
            hover:bg-violet-200
            hover:border-violet-400
            cursor-pointer
        `,

        success: `
            border
            border-green-200
            bg-green-50
            text-green-700
            hover:bg-green-200
            hover:border-green-400
            cursor-pointer
        `,

        danger: `
            border
            border-red-200
            bg-red-50
            text-red-700
            hover:bg-red-200
            hover:border-red-400
            cursor-pointer
        `

    };

    return (

        <button

            type="button"

            onClick={onClick}

            disabled={disabled}

            className={`
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-3
                font-medium
                transition-all
                duration-200

                ${variants[variant]}

                disabled:cursor-not-allowed
                disabled:opacity-50
            `}

        >

            <span className="text-lg">

                {icon}

            </span>

            <span>

                {label}

            </span>

        </button>

    );

}