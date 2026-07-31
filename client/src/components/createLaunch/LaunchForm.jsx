import { useState, useEffect } from "react";

import FormField from "./FormField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import UploadAssets from "./UploadAssets";

import { MARKETS } from "../../constants/markets";

import { FiSave, FiX } from "react-icons/fi";

function LaunchForm({

    initialValues = null,
    initialAssets = [],
    onSubmit,
    submitLabel = "Create Launch",
    onCancel

}) {

    const defaultValues = {

        title: "",
        description: "",
        market: "",
        release_date: "",
        status: "draft"

    };

    const [formData, setFormData] = useState(defaultValues);

    const [existingAssets, setExistingAssets] = useState(initialAssets || []);

    const [files, setFiles] = useState([]);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

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

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

        if (errors[name]) {

            setErrors(prev => ({

                ...prev,

                [name]: ""

            }));

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

    return (

        <form
            onSubmit={handleSubmit}
            className="
                mx-auto
                max-w-4xl
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-8
            "
        >

            {/* Launch Information */}

            <section>

                <h2 className="text-lg font-semibold text-gray-900">

                    Launch Information

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Enter the basic information for this product launch.

                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

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

                <div className="mt-6">

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

                <div className="mt-6">

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

            </section>

            {/* Assets */}

            <section className="mt-10 border-t border-gray-200 pt-10">

                <h2 className="text-lg font-semibold text-gray-900">

                    Assets

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Upload promotional images and supporting documents.

                </p>

                <div className="mt-6">

                    <UploadAssets

                        existingAssets={existingAssets}

                        setAssets={setExistingAssets}

                        files={files}

                        setFiles={setFiles}

                    />

                </div>

            </section>

            {/* Actions */}

            <div className="mt-10 flex justify-end gap-4 border-t border-gray-200 pt-8">

                <button

                    type="button"

                    onClick={onCancel}

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-300
                        px-6
                        py-3
                        font-medium
                        text-gray-700
                        transition-all
                        hover:bg-gray-50
                        hover:border-gray-400
                        cursor-pointer
                    "

                >

                    <FiX />

                    Cancel

                </button>

                <button

                    type="submit"

                    disabled={loading}

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-violet-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition-colors
                        hover:bg-violet-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        cursor-pointer
                    "

                >

                    <FiSave />

                    {loading ? "Saving..." : submitLabel}

                </button>

            </div>

        </form>

    );

}

export default LaunchForm;