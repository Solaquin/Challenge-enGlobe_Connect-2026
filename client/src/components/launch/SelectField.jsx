function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
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

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`
                    rounded-lg
                    border
                    px-4
                    py-3
                    bg-white
                    outline-none
                    transition

                    ${
                        error
                            ? "border-red-500"
                            : "border-gray-300 focus:border-violet-500"
                    }
                `}
            >

                <option value="">
                    {placeholder}
                </option>

                {options.map(option => (

                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>

                ))}

            </select>

            {error && (

                <span className="text-red-500 text-sm">

                    {error}

                </span>

            )}

        </div>

    );

}

export default SelectField;