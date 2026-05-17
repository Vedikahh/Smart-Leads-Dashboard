import { useState } from "react";
import api from "../services/api";

interface Props {
    onSuccess: () => void;
}

function CreateLeadForm({
    onSuccess,
}: Props) {
    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [status, setStatus] =
        useState("New");

    const [source, setSource] =
        useState("Website");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            await api.post("/leads", {
                name,
                email,
                status,
                source,
            });

            setName("");
            setEmail("");

            onSuccess();
        } catch (error) {
            console.log(error);
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
            />

            <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
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
                className="bg-black text-white p-3 rounded md:col-span-4"
            >
                Create Lead
            </button>
        </form>
    );
}

export default CreateLeadForm;