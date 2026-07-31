import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    FiEdit2,
    FiTrash2,
    FiSend,
    FiCheckCircle,
    FiUploadCloud
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import LaunchService from "../../services/LaunchService";

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

            toast.error(
                error.response?.data?.message ||
                "Failed to update launch."
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function handleDelete() {

        const confirmed = window.confirm(

            "Are you sure you want to delete this launch?"

        );

        if (!confirmed) {

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

            toast.error(
                error.response?.data?.message ||
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

    return (

        <div className="bg-white rounded-lg shadow-md">

            <div className="border-b px-6 py-4">

                <h2 className="text-lg font-semibold">

                    Actions

                </h2>

            </div>

            <div className="p-6 space-y-3">

                {canEdit && (

                    <ActionButton

                        icon={<FiEdit2 />}

                        label="Edit Launch"

                        onClick={handleEdit}

                        disabled={loading}

                    />

                )}

                {canDelete && (

                    <ActionButton

                        icon={<FiTrash2 />}

                        label="Delete Launch"

                        variant="danger"

                        onClick={handleDelete}

                        disabled={loading}

                    />

                )}

                {canSubmit && (

                    <ActionButton

                        icon={<FiSend />}

                        label="Submit for Review"

                        onClick={() =>

                            changeStatus("review")

                        }

                        disabled={loading}

                    />

                )}

                {canApprove && (

                    <ActionButton

                        icon={<FiCheckCircle />}

                        label="Approve Launch"

                        variant="success"

                        onClick={() =>

                            changeStatus("approved")

                        }

                        disabled={loading}

                    />

                )}

                {canPublish && (

                    <ActionButton

                        icon={<FiUploadCloud />}

                        label="Publish Launch"

                        onClick={() =>

                            changeStatus("published")

                        }

                        disabled={loading}

                    />

                )}

                {!canEdit &&
                    !canDelete &&
                    !canSubmit &&
                    !canApprove &&
                    !canPublish && (

                    <p className="text-sm text-gray-500">

                        There are no available actions for this launch.

                    </p>

                )}

            </div>

        </div>

    );

}