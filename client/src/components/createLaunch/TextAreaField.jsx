function TextAreaField({

    label,

    name,

    value,

    onChange,

    placeholder = "",

    rows = 5,

    error = "",

    required = false,

    disabled = false,

    maxLength

}) {

    return (

        <div className="flex flex-col gap-2">

            <div className="flex items-center justify-between">

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

                {maxLength && (

                    <span className="text-xs text-gray-400">

                        {value.length}/{maxLength}

                    </span>

                )}

            </div>

            <textarea

                id={name}

                name={name}

                rows={rows}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                disabled={disabled}

                maxLength={maxLength}

                className={`
                    w-full
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-3
                    resize-none
                    outline-none
                    transition-all
                    duration-200

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

            {error && (

                <p className="flex items-center gap-1 text-sm text-red-500">

                    <span>•</span>

                    {error}

                </p>

            )}

        </div>

    );

}

export default TextAreaField;