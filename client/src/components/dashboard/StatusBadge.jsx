function StatusBadge({ status }) {

    const colors = {
        draft: "bg-gray-200 text-gray-700",
        review: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        published: "bg-blue-100 text-blue-700"
    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
        >
            {status.toUpperCase()}
        </span>

    );

}

export default StatusBadge;