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

        <div className="mt-8">

            <h3 className="font-semibold text-lg mb-4">

                Assets

            </h3>

            <label
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    border-2
                    border-dashed
                    border-gray-300
                    rounded-xl
                    h-56
                    cursor-pointer
                    hover:border-violet-500
                    transition
                "
            >

                <FiUploadCloud
                    size={42}
                    className="text-violet-500"
                />

                <p className="mt-4 font-medium">

                    Click to upload

                </p>

                <p className="text-sm text-gray-500">

                    or drag and drop

                </p>

                <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleChange}
                />

            </label>

            {
                existingAssets.length > 0 && (
                
                    <div className="mt-6">
    
                        <h4 className="font-medium mb-3">
                
                            Existing Assets
                
                        </h4>
                
                        <div className="space-y-3">
                
                            {
                                existingAssets.map(asset => (
                                
                                    <AssetItem

                                        key={asset.id}

                                        asset={asset}

                                        onDelete={handleDeleteAsset}

                                    />
                                ))
                            }

                        </div>
                        
                    </div>

                )
            }

            {
                fileErrors.length > 0 && (
                
                    <div className="mt-4 space-y-2">
                    
                        {
                        
                            fileErrors.map((error, index) => (
                            
                                <div
                                    key={index}
                                    className="rounded-lg bg-red-50 border border-red-200 px-4 py-2"
                                >
                                
                                    <span className="font-medium text-red-700">
                            
                                        {error.file}
                            
                                    </span>
                            
                                    <span className="text-red-600">
                            
                                        {" - "}
                                        {error.message}
                            
                                    </span>
                            
                                </div>

                            ))
                        
                        }

                    </div>

                )
            }

            {
                            
                files.length > 0 && (
                
                <div className="mt-6 space-y-3">
                
                    {
                    
                    files.map((file,index)=>(
                    
                        <UploadedFileItem

                            key={index}

                            file={file}

                            onRemove={() =>
                                setFiles(files.filter((_, i) => i !== index))
                            }
                        
                        />

                    ))
                
                    }

                </div>

                )
            }

        </div>

    );

}

export default UploadAssets;