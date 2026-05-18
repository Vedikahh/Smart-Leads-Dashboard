import { useState } from "react";
import { useToast } from "../context/ToastContext";
import api from "../services/api";
import type { Lead } from "../types/lead";

interface Props {
    lead: Lead;
    onSuccess: () => void;
    onCancel: () => void;
}

function EditLeadForm({
    lead,
    onSuccess,
    onCancel,
}: Props) {
    const { showToast } = useToast();
    const [name, setName] = useState(lead.name);
    const [email, setEmail] = useState(lead.email);
    const [status, setStatus] = useState(lead.status);
    const [source, setSource] = useState(lead.source);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/leads/${lead._id}`, {
                name,
                email,
                status,
                source,
            });

            showToast("Lead updated successfully!", "success");
            onSuccess();
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update lead";
            showToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Edit Lead
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as Lead["status"])
                            }
                        >
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Qualified</option>
                            <option>Lost</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                            Source
                        </label>
                        <select
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={source}
                            onChange={(e) =>
                                setSource(e.target.value as Lead["source"])
                            }
                        >
                            <option>Website</option>
                            <option>Instagram</option>
                            <option>Referral</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditLeadForm;