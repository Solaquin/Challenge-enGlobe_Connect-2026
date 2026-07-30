function StatsCard({

    title,

    titleColor = "text-gray-500", 

    value,

    color = "bg-white"

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

            <h2 className="text-4xl font-bold mt-2">

                {value}

            </h2>

        </div>

    );

}

export default StatsCard;