function StatsCard({

    title,

    titleColor = "text-gray-500", 

    value,

    color = "bg-white",

    subtitle = ""

}) {

    return (

        <div
            className={`
                rounded-xl
                shadow-sm
                p-6
                ${color}
            `}
        >

            <p className={titleColor + " text-sm"}>

                {title}

            </p>

            <h2 className="text-3xl font-bold truncate" title={value}>

                {value}

            </h2>

            <p className="text-sm text-white mt-1">
                {subtitle}
            </p>

        </div>

    );

}

export default StatsCard;