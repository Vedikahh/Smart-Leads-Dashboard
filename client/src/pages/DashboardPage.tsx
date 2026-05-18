import { useEffect, useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import LeadsTable from "../components/LeadsTable";
import EditLeadForm from "../components/EditLeadForm";
import ExportButton from "../components/ExportButton";

import type { Lead } from "../types/lead";

import CreateLeadForm from "../components/CreateLeadForm";

function DashboardPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [leads, setLeads] = useState<Lead[]>([]);

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

    const [editingLead, setEditingLead] =
        useState<Lead | null>(null);

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
            showToast("Failed to load leads", "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id: string) => {
        try {
            await api.delete(`/leads/${id}`);
            showToast("Lead deleted successfully!", "success");
            fetchLeads();
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to delete lead";
            showToast(message, "error");
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchLeads();
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, status, source, page]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="space-y-6">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                                Dashboard
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                                Leads Overview
                            </h1>
                            {user && (
                                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                    Welcome back, <span className="font-semibold text-slate-900">{user.name}</span>. Manage leads, filter opportunities, and export your current list.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <ExportButton
                                search={search}
                                status={status}
                                source={source}
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Current leads</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{leads.length}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Page</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{page} / {totalPages}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Role</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{user?.role ?? "Guest"}</p>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Filter leads</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Narrow down your lead list using search, status, and source filters.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                className="border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Lost">Lost</option>
                            </select>

                            <select
                                className="border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <option value="">All Source</option>
                                <option value="Website">Website</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Referral">Referral</option>
                            </select>
                        </div>

                        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
                                    <p className="mt-2 text-sm text-slate-600">Use the filters and export button to refine your current lead view.</p>
                                </div>
                                <ExportButton
                                    search={search}
                                    status={status}
                                    source={source}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
                                Loading leads, please wait...
                            </div>
                        ) : leads.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                                <p className="text-lg font-semibold text-slate-900">No leads match your filters</p>
                                <p className="mt-2 text-sm text-slate-600">Try changing the search, status, or source filters, or create a new lead.</p>
                            </div>
                        ) : (
                            <LeadsTable
                                leads={leads}
                                onDelete={deleteLead}
                                onEdit={setEditingLead}
                                currentUserId={user?._id ?? ""}
                                isAdmin={user?.role === "admin"}
                            />
                        )}

                        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                Next
                            </button>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Create a new lead</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Add a fresh lead directly from the dashboard and keep your pipeline moving.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <CreateLeadForm onSuccess={fetchLeads} />
                        </div>
                    </section>
                </div>
            </div>

            {editingLead && (
                <EditLeadForm
                    lead={editingLead}
                    onSuccess={() => {
                        setEditingLead(null);
                        fetchLeads();
                    }}
                    onCancel={() => setEditingLead(null)}
                />
            )}
        </div>
    );
}

export default DashboardPage;