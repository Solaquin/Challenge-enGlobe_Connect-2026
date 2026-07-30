function TextAreaField({

    label,

    name,

    value,

    onChange,

    placeholder,

    rows = 5,

    error

}) {

    return (

        <div className="flex flex-col gap-2">

            <label
                htmlFor={name}
                className="text-sm font-medium"
            >
                {label}
            </label>

            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    border
                    rounded-lg
                    px-4
                    py-3
                    resize-none
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

export default TextAreaField;