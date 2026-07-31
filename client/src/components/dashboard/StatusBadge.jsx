function StatusBadge({ status }) {

    const variants = {

        draft: {
            label: "Draft",
            className: "bg-gray-100 text-gray-700"
        },

        review: {
            label: "In Review",
            className: "bg-yellow-100 text-yellow-700"
        },

        approved: {
            label: "Approved",
            className: "bg-green-100 text-green-700"
        },

        published: {
            label: "Published",
            className: "bg-blue-100 text-blue-700"
        }

    };

    const current = variants[status] ?? {
        label: status,
        className: "bg-gray-100 text-gray-700"
    };

    return (

        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${current.className}`}
        >
            {current.label}
        </span>

    );

}

export default StatusBadge;