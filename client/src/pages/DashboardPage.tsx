import { useEffect, useState } from "react";

import api from "../services/api";

import LeadsTable from "../components/LeadsTable";

import type { Lead } from "../types/lead";

import CreateLeadForm from "../components/CreateLeadForm";

function DashboardPage() {
    const [leads, setLeads] = useState<
        Lead[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [source, setSource] =
        useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const fetchLeads = async () => {
        try {
            setLoading(true);

            const res = await api.get(
                `/leads?page=${page}&search=${search}&status=${status}&source=${source}`
            );

            setLeads(res.data.data);

            setTotalPages(
                res.data.pagination.totalPages
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id: string) => {
        try {
            await api.delete(`/leads/${id}`);
            fetchLeads();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchLeads();
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, status, source, page]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    Smart Leads Dashboard
                </h1>
            </div>

            <CreateLeadForm
                onSuccess={fetchLeads}
            />

            <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Search name or email"
                    className="border p-3 rounded w-64"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    className="border p-3 rounded"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option value="">
                        All Status
                    </option>

                    <option value="New">
                        New
                    </option>

                    <option value="Contacted">
                        Contacted
                    </option>

                    <option value="Qualified">
                        Qualified
                    </option>

                    <option value="Lost">
                        Lost
                    </option>
                </select>

                <select
                    className="border p-3 rounded"
                    value={source}
                    onChange={(e) =>
                        setSource(e.target.value)
                    }
                >
                    <option value="">
                        All Sources
                    </option>

                    <option value="Website">
                        Website
                    </option>

                    <option value="Instagram">
                        Instagram
                    </option>

                    <option value="Referral">
                        Referral
                    </option>
                </select>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <LeadsTable
                    leads={leads}
                    onDelete={deleteLead}
                />
            )}

            <div className="flex gap-3 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="flex items-center">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage(page + 1)
                    }
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;