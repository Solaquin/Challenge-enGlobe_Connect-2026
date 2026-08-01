function StatsCard({

    title,

    value,

    subtitle = "",

    icon: Icon,

    accent = "text-violet-600",

    iconBg = "bg-violet-100",

    featured = false

}) {

    return (

        <div
            className={`
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-lg
                ${featured ? "ring-2 ring-violet-100" : ""}
            `}
        >

            <div className="flex items-start justify-between">

                <div className="flex-1 min-w-0">

                    <p className="text-sm font-medium text-gray-500">

                        {title}

                    </p>

                    <h2
                        className="mt-2 text-3xl font-bold text-gray-900 truncate"
                        title={value}
                    >

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-2 text-sm text-gray-500">

                            {subtitle}

                        </p>

                    )}

                </div>

                {Icon && (

                    <div
                        className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            ${iconBg}
                        `}
                    >

                        <Icon
                            className={`text-xl ${accent}`}
                        />

                    </div>

                )}

            </div>

        </div>

    );

}

export default StatsCard;