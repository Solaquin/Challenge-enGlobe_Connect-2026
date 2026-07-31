import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormField from "./FormField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import UploadAssets from "./UploadAssets";
import { MARKETS } from "../../constants/markets";



function LaunchForm({

    initialValues = null,
    initialAssets = [],
    onSubmit,
    submitLabel = "Create Launch",
    onCancel

}) {

    const navigate = useNavigate();

    const defaultValues = {

        title: "",
        description: "",
        market: "",
        release_date: "",
        status: "draft"

    };

    const [formData, setFormData] = useState(defaultValues);

    useEffect(() => {

        if (initialValues) {

            setFormData({

                ...defaultValues,

                ...initialValues,

                release_date: initialValues.release_date
                    ? initialValues.release_date.split("T")[0]
                    : ""

            });

        }

    }, [initialValues]);

    const [existingAssets, setExistingAssets] = useState([]);

    useEffect(() => {

        setExistingAssets(initialAssets);

    }, [initialAssets]);

    const [files, setFiles] = useState([]);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            await onSubmit({

                formData,
                files

            });

        }
        finally {

            setLoading(false);

        }

    }

    function validate() {

        const newErrors = {};

        if (!formData.title.trim()) {

            newErrors.title = "Campaign name is required.";

        }

        if (!formData.release_date) {

            newErrors.release_date = "Launch date is required.";

        }

        if (!formData.market) {

            newErrors.market = "Please select a target market.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }

    return (

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8 px-5 bg-white rounded-2xl shadow p-8">

            <div className="grid grid-cols-2 gap-6">

                <FormField

                    label="Campaign Name"

                    name="title"

                    value={formData.title}

                    onChange={handleChange}

                    placeholder="e.g. Summer Collection"

                    error={errors.title}

                />

                <FormField

                    type="date"

                    label="Target Launch Date"

                    name="release_date"

                    value={formData.release_date}

                    onChange={handleChange}

                    error={errors.release_date}

                />
            </div>

            <div className="mt-5">
                <SelectField
                    label="Target Market"
                    name="market"
                    value={formData.market}
                    onChange={handleChange}
                    options={MARKETS}
                    placeholder="Select a market"
                    error={errors.market}
                />
            </div>

            <div className="mt-5">
                <TextAreaField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product launch..."
                    rows={5}
                    error={errors.description}
                />
            </div>
            <div className="mt-8">
                <UploadAssets
                    existingAssets={existingAssets}

                    setAssets={setExistingAssets}

                    files={files}

                    setFiles={setFiles}

                />

            </div>

            <div className="flex justify-end gap-4 mt-10">

                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        px-6
                        py-3
                        rounded-xl
                        border
                        hover:bg-gray-100
                        outline-none
                        cursor-pointer
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        px-6
                        py-3
                        rounded-xl
                        bg-violet-600
                        text-white
                        hover:bg-violet-800
                        disabled:opacity-50
                        cursor-pointer
                    "
                >
                
                    {
                        loading ? "Saving..." : submitLabel
                    }

                </button>
                
            </div>
                
        </form>

    );

}

export default LaunchForm;