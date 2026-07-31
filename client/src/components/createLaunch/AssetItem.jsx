
import { FiTrash2, FiFile } from "react-icons/fi";

function AssetItem({ asset, onDelete }) {

    return (

        <div className="outline-none flex items-center justify-between border border-green-500 rounded-xl p-4 bg-green-100">

            <div className="flex items-center gap-3">

                <FiFile className="text-green-600" />

                <div>

                    <p className="font-medium">

                        {asset.original_name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {(asset.file_size / 1024).toFixed(1)} KB

                    </p>

                </div>

            </div>

            <button

                onClick={() => {onDelete(asset.id);}}

                className="
                    text-red-500
                    hover:bg-red-100
                    rounded-lg
                    p-5
                    transition
                    cursor-pointer
                "

            >

                <FiTrash2 />

            </button>

        </div>

    );

}

export default AssetItem;