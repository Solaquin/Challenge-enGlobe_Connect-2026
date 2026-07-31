import { FiUploadCloud } from "react-icons/fi";
import UploadedFileItem from "./UploadedFileItems";
import AssetItem from "./AssetItem";
import { useState } from "react";

import AssetService from "../../services/assetsService";

import toast from "react-hot-toast";

const MAX_SIZE = 20 * 1024 * 1024;

const ALLOWED_TYPES = [

    "image/png",

    "image/jpeg",

    "image/webp",

    "video/mp4",

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];


function UploadAssets({ existingAssets = [], setAssets, files, setFiles }) {

    const [fileErrors, setFileErrors] = useState([]);
    

    function handleFiles(selectedFiles) {

    const validFiles = [];
    const errors = [];

    Array.from(selectedFiles).forEach(file => {

        if (file.size > MAX_SIZE) {
            errors.push({
                file: file.name,
                message: "Exceeds the maximum size of 20MB."
            });
            return;
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            errors.push({
                file: file.name,
                message: "Is not an allowed file type."
            });
            return;
        }

        validFiles.push(file);

    });

    const mergedFiles = [...files];

    validFiles.forEach(file => {

        const alreadyExists = existingAssets.some(asset =>
            asset.original_name === file.name &&
            asset.file_size === file.size
        );
    
        if (alreadyExists) {
        
            errors.push({
            
                file: file.name,
                message: "This asset already exists."
            
            });
        
            return;
        
        }
    
        const exists = mergedFiles.some(existingFile =>
            existingFile.name === file.name &&
            existingFile.size === file.size
        );
    
        if (exists) {
        
            errors.push({
            
                file: file.name,
                message: "File already added."
            
            });
        
        } else {
        
            mergedFiles.push(file);
        
        }
    
    });

    setFiles(mergedFiles);
    setFileErrors(errors);

}

    function handleDrop(e) {

        e.preventDefault();

        handleFiles(e.dataTransfer.files);

    }

    function handleChange(e) {

        handleFiles(e.target.files);

    }

    async function handleDeleteAsset(assetId) {


        console.log("Deleting asset:", assetId);
        if (!window.confirm("Delete this asset?")) {

            return;
        }

        try {

            await AssetService.deleteAsset(assetId);

            setAssets(prev =>
                prev.filter(asset => asset.id !== assetId)
            );

            toast.success("Asset deleted.");

        }
        catch(error) {
            console.error(error);

        }

    }

    return (

    <div className="space-y-8">

        {/* Upload Zone */}

        <label
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-gray-300
                bg-gray-50
                px-8
                py-12
                text-center
                transition-all
                duration-200
                cursor-pointer
                hover:border-violet-500
                hover:bg-violet-50
            "
        >

            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-violet-100
                    text-violet-600
                "
            >

                <FiUploadCloud className="text-3xl" />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">

                Upload Assets

            </h3>

            <p className="mt-2 text-sm text-gray-500">

                Drag & drop files here or click to browse.

            </p>

            <p className="mt-4 text-xs text-gray-400">

                PNG • JPG • WEBP • MP4 • PDF • DOC • DOCX

            </p>

            <p className="mt-1 text-xs text-gray-400">

                Maximum file size: 20 MB

            </p>

            <input
                type="file"
                multiple
                hidden
                onChange={handleChange}
            />

        </label>

        {/* Existing Assets */}

        {existingAssets.length > 0 && (

            <section>

                <div className="mb-4 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-gray-900">

                        Existing Assets

                    </h3>

                    <span
                        className="
                            rounded-full
                            bg-gray-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-gray-600
                        "
                    >

                        {existingAssets.length}

                    </span>

                </div>

                <div className="space-y-3">

                    {existingAssets.map(asset => (

                        <AssetItem
                            key={asset.id}
                            asset={asset}
                            onDelete={handleDeleteAsset}
                        />

                    ))}

                </div>

            </section>

        )}

        {/* Validation Errors */}

        {fileErrors.length > 0 && (

            <section className="space-y-2">

                {fileErrors.map((error, index) => (

                    <div
                        key={index}
                        className="
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                        "
                    >

                        <p className="text-sm">

                            <span className="font-semibold text-red-700">

                                {error.file}

                            </span>

                            <span className="text-red-600">

                                {" — "}
                                {error.message}

                            </span>

                        </p>

                    </div>

                ))}

            </section>

        )}

        {/* Pending Uploads */}

        {files.length > 0 && (

            <section>

                <div className="mb-4 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-gray-900">

                        Files to Upload

                    </h3>

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

                        {files.length}

                    </span>

                </div>

                <div className="space-y-3">

                    {files.map((file, index) => (

                        <UploadedFileItem

                            key={index}

                            file={file}

                            onRemove={() =>
                                setFiles(files.filter((_, i) => i !== index))
                            }

                        />

                    ))}

                </div>

            </section>

        )}

    </div>

);

}

export default UploadAssets;