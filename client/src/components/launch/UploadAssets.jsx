import { FiUploadCloud } from "react-icons/fi";
import UploadedFileItem from "./UploadedFileItems";

function UploadAssets({ files, setFiles }) {

    function handleFiles(selectedFiles) {

        setFiles(prev => [

            ...prev,

            ...Array.from(selectedFiles)

        ]);

    }

    function handleChange(e) {

        handleFiles(e.target.files);

    }

    return (

        <div className="mt-8">

            <h3 className="font-semibold text-lg mb-4">

                Assets

            </h3>

            <label
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