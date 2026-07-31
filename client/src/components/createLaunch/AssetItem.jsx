import { FiFile, FiTrash2 } from "react-icons/fi";

function AssetItem({ asset, onDelete }) {

    const fileSize =
        asset.file_size >= 1024 * 1024
            ? `${(asset.file_size / (1024 * 1024)).toFixed(2)} MB`
            : `${(asset.file_size / 1024).toFixed(1)} KB`;

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
                        text-violet-600
                    "
                >

                    <FiFile className="text-xl" />

                </div>

                <div>

                    <p
                        className="max-w-xs truncate font-medium text-gray-900"
                        title={asset.original_name}
                    >

                        {asset.original_name}

                    </p>

                    <p className="mt-1 text-sm text-gray-500">

                        {fileSize}

                    </p>

                </div>

            </div>

            <button

                type="button"

                onClick={() => onDelete(asset.id)}

                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-400
                    transition-all
                    duration-200
                    hover:bg-red-50
                    hover:text-red-600
                    cursor-pointer
                "

                title="Delete asset"

            >

                <FiTrash2 className="text-lg" />

            </button>

        </div>

    );

}

export default AssetItem;