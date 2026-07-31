import {
    FiFile,
    FiImage,
    FiTrash2,
    FiVideo
} from "react-icons/fi";

function UploadedFileItem({ file, onRemove }) {

    function getIcon() {

        if (file.type.startsWith("image/")) {

            return <FiImage className="text-xl text-violet-600" />;

        }

        if (file.type.startsWith("video/")) {

            return <FiVideo className="text-xl text-violet-600" />;

        }

        return <FiFile className="text-xl text-violet-600" />;

    }

    const fileSize =
        file.size >= 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`;

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

                    {getIcon()}

                </div>

                <div>

                    <p
                        className="max-w-xs truncate font-medium text-gray-900"
                        title={file.name}
                    >

                        {file.name}

                    </p>

                    <p className="mt-1 text-sm text-gray-500">

                        {fileSize}

                    </p>

                </div>

            </div>

            <button

                type="button"

                onClick={onRemove}

                title="Remove file"

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

            >

                <FiTrash2 className="text-lg" />

            </button>

        </div>

    );

}

export default UploadedFileItem;