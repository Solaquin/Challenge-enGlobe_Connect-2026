import {
    FiDownload,
    FiFile,
    FiFileText,
    FiImage,
    FiVideo
} from "react-icons/fi";

function getIcon(type = "") {

    if (type.startsWith("image/")) {

        return <FiImage className="text-xl text-violet-600" />;

    }

    if (type.startsWith("video/")) {

        return <FiVideo className="text-xl text-violet-600" />;

    }

    if (type === "application/pdf") {

        return <FiFileText className="text-xl text-violet-600" />;

    }

    return <FiFile className="text-xl text-violet-600" />;

}

function formatSize(bytes) {

    if (!bytes) return "-";

    const units = ["B", "KB", "MB", "GB"];

    let size = bytes;
    let unit = 0;

    while (size >= 1024 && unit < units.length - 1) {

        size /= 1024;
        unit++;

    }

    return `${size.toFixed(1)} ${units[unit]}`;

}

export default function AssetItem({ asset }) {

    console.log(asset);

    function handleDownload() {

        window.open(asset.file_url, "_blank");
    }

    return (

        <div
            className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                transition-all
                duration-200
                hover:border-violet-300
                hover:shadow-sm
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-100
                    "
                >

                    {getIcon(asset.mime_type)}

                </div>

                <div>

                    <p
                        className="max-w-xs truncate font-medium text-gray-900"
                        title={asset.original_name}
                    >

                        {asset.original_name}

                    </p>

                    <p className="mt-1 text-sm text-gray-500">

                        {formatSize(asset.file_size)}

                    </p>

                </div>

            </div>

            <button

                type="button"
                disabled
                title="Download will be available soon."
                className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-gray-400
                    cursor-not-allowed
                "

            >

                <FiDownload />

                Download

            </button>

        </div>

    );

}