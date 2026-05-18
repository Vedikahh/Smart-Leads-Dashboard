import { useState } from "react";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

interface Props {
    onSuccess: () => void;
}

function CreateLeadForm({
    onSuccess,
}: Props) {
    const { showToast } = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");
    const [source, setSource] = useState("Website");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/leads", {
                name,
                email,
                status,
                source,
            });

            setName("");
            setEmail("");
            showToast("Lead created successfully!", "success");
            onSuccess();
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to create lead";
            showToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
            <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                required
            />

            <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                required
            />

            <select
                className="border p-3 rounded"
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >
                <option>New</option>

                <option>Contacted</option>

                <option>Qualified</option>

                <option>Lost</option>
            </select>

            <select
                className="border p-3 rounded"
                value={source}
                onChange={(e) =>
                    setSource(e.target.value)
                }
            >
                <option>Website</option>

                <option>Instagram</option>

                <option>Referral</option>
            </select>

            <button
                disabled={loading}
                className="bg-black text-white p-3 rounded md:col-span-4 disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Lead"}
            </button>
        </form>
    );
}

export default CreateLeadForm;