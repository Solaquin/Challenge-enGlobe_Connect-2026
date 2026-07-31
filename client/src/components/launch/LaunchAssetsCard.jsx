import { FiFolder } from "react-icons/fi";

import AssetItem from "./AssetItem";

export default function LaunchAssetsCard({ assets }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    px-6
                    py-5
                "
            >

                <h2 className="text-xl font-semibold text-gray-900">

                    Assets

                </h2>

                <span
                    className="
                        rounded-full
                        bg-violet-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-violet-700
                    "
                >

                    {assets.length}

                </span>

            </div>

            <div className="p-6">

                {assets.length === 0 ? (

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-gray-300
                            bg-gray-50
                            py-12
                            text-center
                        "
                    >

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-xl
                                bg-violet-100
                                text-violet-600
                            "
                        >

                            <FiFolder className="text-2xl" />

                        </div>

                        <p className="mt-4 font-medium text-gray-700">

                            No assets uploaded

                        </p>

                        <p className="mt-1 text-sm text-gray-500">

                            This launch doesn't have any associated files yet.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {assets.map(asset => (

                            <AssetItem

                                key={asset.id}

                                asset={asset}

                            />

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}