function PageHeader() {

    return (

        <div className="mb-6">

            <span
                className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-violet-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-violet-700
                "
            >
                Product Management
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">

                Launches

            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">

                Manage and monitor all product launches from a single place.

            </p>

        </div>

    );

}

export default PageHeader;