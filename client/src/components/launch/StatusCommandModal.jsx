import { useEffect, useState } from "react";

export default function StatusCommentModal({

    open,

    title,

    description,

    confirmLabel = "Confirm",

    required = false,

    placeholder = "Write your comments...",

    onCancel,

    onConfirm

}) {

    const [comment, setComment] = useState("");

    useEffect(() => {

        if (open) {

            setComment("");

        }

    }, [open]);

    if (!open) {

        return null;

    }

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-sm
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
            >

                <div className="border-b border-gray-200 px-6 py-5">

                    <h2 className="text-xl font-semibold text-gray-900">

                        {title}

                    </h2>

                    <p className="mt-2 text-sm text-gray-500">

                        {description}

                    </p>

                </div>

                <div className="p-6">

                    <label className="mb-2 block text-sm font-medium text-gray-700">

                        Comment

                    </label>

                    <textarea

                        rows={5}

                        value={comment}

                        onChange={(e) =>

                            setComment(e.target.value)

                        }

                        placeholder={placeholder}

                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-violet-500
                            focus:ring-4
                            focus:ring-violet-100
                        "

                    />

                </div>

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-gray-200
                        px-6
                        py-5
                    "
                >

                    <button

                        onClick={onCancel}

                        className="
                            rounded-xl
                            border
                            border-gray-300
                            px-5
                            py-2.5
                            font-medium
                            cursor-pointer
                            hover:bg-gray-50
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={() =>

                            onConfirm(comment)

                        }

                        disabled={required && !comment.trim()}

                        className="
                            rounded-xl
                            bg-violet-600
                            px-5
                            py-2.5
                            font-medium
                            text-white
                            transition
                            cursor-pointer
                            hover:bg-violet-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "

                    >

                        {confirmLabel}

                    </button>

                </div>

            </div>

        </div>

    );

}