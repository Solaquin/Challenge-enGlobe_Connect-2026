import { FiTrash2, FiFile, FiImage, FiVideo } from "react-icons/fi";

function UploadedFileItem({ file, onRemove }) {

    function getIcon() {

        if (file.type.startsWith("image/")) {

            return <FiImage className="text-violet-600" size={22} />;

        }

        if (file.type.startsWith("video/")) {

            return <FiVideo className="text-violet-600" size={22} />;

        }

        return <FiFile className="text-violet-600" size={22} />;

    }

    return (

        <div className="outline-none flex items-center justify-between border border-violet-500 rounded-xl px-4 py-3">

            <div className="flex items-center gap-4">

                {getIcon()}

                <div>

                    <p className="font-medium">

                        {file.name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {(file.size / 1024).toFixed(1)} KB

                    </p>

                </div>

            </div>

            <button
                type="button"
                onClick={onRemove}
                className="
                    text-red-500
                    hover:bg-red-100
                    rounded-lg
                    p-5
                    transition
                    cursor-pointer
                "
            >

                <FiTrash2 size={18} />

            </button>

        </div>

    );

}

export default UploadedFileItem;