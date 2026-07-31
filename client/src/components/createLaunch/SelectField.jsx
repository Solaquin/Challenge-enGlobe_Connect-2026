function SelectField({

    label,

    name,

    value,

    onChange,

    options,

    placeholder = "Select an option",

    error = "",

    required = false,

    disabled = false,

    icon: Icon

}) {

    return (

        <div className="flex flex-col gap-2">

            <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700"
            >

                {label}

                {required && (

                    <span className="ml-1 text-red-500">

                        *

                    </span>

                )}

            </label>

            <div className="relative">

                {Icon && (

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            flex
                            items-center
                            pl-4
                            text-gray-400
                        "
                    >

                        <Icon className="h-5 w-5" />

                    </div>

                )}

                <select

                    id={name}

                    name={name}

                    value={value}

                    onChange={onChange}

                    disabled={disabled}

                    className={`
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        bg-white
                        py-3
                        outline-none
                        transition-all
                        duration-200

                        ${Icon ? "pl-12 pr-10" : "px-4 pr-10"}

                        ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        }

                        ${
                            disabled
                                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                : "cursor-pointer"
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

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        right-0
                        flex
                        items-center
                        pr-4
                        text-gray-400
                    "
                >

                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />

                    </svg>

                </div>

            </div>

            {error && (

                <p className="flex items-center gap-1 text-sm text-red-500">

                    <span>•</span>

                    {error}

                </p>

            )}

        </div>

    );

}

export default SelectField;