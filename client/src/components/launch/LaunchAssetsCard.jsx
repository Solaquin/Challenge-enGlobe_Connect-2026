import AssetItem from "./AssetItem";

export default function LaunchAssetsCard({ assets }) {

    return (

        <div className="bg-white rounded-lg shadow-md">

            <div className="border-b px-6 py-4">

                <h2 className="text-lg font-semibold">

                    Assets

                </h2>

            </div>

            <div className="p-6">

                {assets.length === 0 ? (

                    <p className="text-gray-500">

                        No assets have been uploaded.

                    </p>

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