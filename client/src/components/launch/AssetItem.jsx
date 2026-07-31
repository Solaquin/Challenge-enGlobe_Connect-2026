import {
    FiFile,
    FiImage,
    FiVideo,
    FiFileText,
    FiDownload
} from "react-icons/fi";

function getIcon(type) {

    if (type.startsWith("image/")) {

        return <FiImage size={22} />;

    }

    if (type.startsWith("video/")) {

        return <FiVideo size={22} />;

    }

    if (type === "application/pdf") {

        return <FiFileText size={22} />;

    }

    return <FiFile size={22} />;

}

function formatSize(bytes) {

    if (!bytes) return "-";

    const units = ["B","KB","MB","GB"];

    let i = 0;

    let size = bytes;

    while(size >= 1024 && i < units.length-1){

        size /= 1024;

        i++;

    }

    return `${size.toFixed(1)} ${units[i]}`;

}

export default function AssetItem({ asset }) {

    return (

        <div className="flex items-center justify-between rounded-lg border p-4">

            <div className="flex items-center gap-4">

                <div className="text-gray-600">

                    {getIcon(asset.mime_type)}

                </div>

                <div>

                    <p className="font-medium">

                        {asset.original_name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {formatSize(asset.file_size)}

                    </p>

                </div>

            </div>

            <button
                className="flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50"
            >

                <FiDownload />

                Download

            </button>

        </div>

    );

}