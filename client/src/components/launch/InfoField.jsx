export default function InfoField({

    label,
    value

}) {

    return (

        <div
            className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
            "
        >

            <p
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                "
            >

                {label}

            </p>

            <p
                className="
                    mt-2
                    text-sm
                    font-semibold
                    text-gray-900
                    break-words
                "
            >

                {value || "-"}

            </p>

        </div>

    );

}