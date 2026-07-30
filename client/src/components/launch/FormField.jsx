function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error
}) {

    return (

        <div className="flex flex-col gap-2">

            <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    rounded-lg
                    border
                    px-4
                    py-3
                    outline-none
                    transition

                    ${
                        error
                            ? "border-red-500"
                            : "border-gray-300 focus:border-violet-500"
                    }
                `}
            />

            {error && (

                <span className="text-red-500 text-sm">

                    {error}

                </span>

            )}

        </div>

    );

}

export default FormField;