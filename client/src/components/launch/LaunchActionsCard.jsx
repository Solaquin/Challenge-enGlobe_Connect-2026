import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    FiEdit2,
    FiTrash2,
    FiSend,
    FiCheckCircle,
    FiUploadCloud,
    FiInfo
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import LaunchService from "../../services/launchService";

import ActionButton from "./ActionButton";

export default function LaunchActionsCard({

    launch,
    onRefresh

}) {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const isCreator = user.role === "creator";
    const isApprover = user.role === "approver";

    const canEdit =
        isCreator &&
        launch.status === "draft";

    const canDelete = canEdit;

    const canSubmit = canEdit;

    const canApprove =
        isApprover &&
        launch.status === "review";

    const canPublish =
        isApprover &&
        launch.status === "approved";

    async function changeStatus(status) {

        try {

            setLoading(true);

            await LaunchService.changeStatus(
                launch.id,
                status
            );

            toast.success("Launch updated successfully.");

            onRefresh();

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ??
                "Failed to update launch."
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function handleDelete() {

        if (
            !window.confirm(
                "Are you sure you want to delete this launch?"
            )
        ) {
            return;
        }

        try {

            setLoading(true);

            await LaunchService.deleteLaunch(
                launch.id
            );

            toast.success(
                "Launch deleted successfully."
            );

            navigate("/dashboard/launches");

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ??
                "Failed to delete launch."
            );

        }
        finally {

            setLoading(false);

        }

    }

    function handleEdit() {

        navigate(
            `/dashboard/launches/${launch.id}/edit`
        );

    }

    const actions = [

        canEdit && {
            label: "Edit Launch",
            icon: <FiEdit2 />,
            onClick: handleEdit
        },

        canDelete && {
            label: "Delete Launch",
            icon: <FiTrash2 />,
            variant: "danger",
            onClick: handleDelete
        },

        canSubmit && {
            label: "Submit for Review",
            icon: <FiSend />,
            onClick: () => changeStatus("review")
        },

        canApprove && {
            label: "Approve Launch",
            icon: <FiCheckCircle />,
            variant: "success",
            onClick: () => changeStatus("approved")
        },

        canPublish && {
            label: "Publish Launch",
            icon: <FiUploadCloud />,
            onClick: () => changeStatus("published")
        }

    ].filter(Boolean);

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
            "
        >

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-xl font-semibold text-gray-900">

                    Actions

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Available actions based on your role and the current launch status.

                </p>

            </div>

            <div className="space-y-3 p-6">

                {loading && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-violet-200
                            bg-violet-50
                            px-4
                            py-3
                            text-sm
                            text-violet-700
                        "
                    >

                        Processing request...

                    </div>

                )}

                {actions.length > 0 ? (

                    actions.map(action => (

                        <ActionButton

                            key={action.label}

                            icon={action.icon}

                            label={action.label}

                            variant={action.variant}

                            onClick={action.onClick}

                            disabled={loading}

                        />

                    ))

                ) : (

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            rounded-xl
                            border
                            border-dashed
                            border-gray-300
                            bg-gray-50
                            px-6
                            py-10
                            text-center
                        "
                    >

                        <FiInfo className="text-3xl text-gray-400" />

                        <p className="mt-4 font-medium text-gray-700">

                            No actions available

                        </p>

                        <p className="mt-1 text-sm text-gray-500">

                            There are currently no actions you can perform on this launch.

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}