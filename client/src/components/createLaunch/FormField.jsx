function FormField({

    label,

    name,

    type = "text",

    value,

    onChange,

    placeholder = "",

    error = "",

    required = false,

    disabled = false,

    autoComplete = "off",

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

                <input

                    id={name}

                    name={name}

                    type={type}

                    value={value}

                    onChange={onChange}

                    placeholder={placeholder}

                    disabled={disabled}

                    autoComplete={autoComplete}

                    className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        py-3
                        outline-none
                        transition-all
                        duration-200

                        ${Icon ? "pl-12 pr-4" : "px-4"}

                        ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        }

                        ${
                            disabled
                                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                : ""
                        }
                    `}

                />

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

export default FormField;