import type { Lead } from "../types/lead";

interface Props {
    leads: Lead[];
    onDelete: (id: string) => void;
    onEdit: (lead: Lead) => void;
    currentUserId: string;
    isAdmin: boolean;
}

function LeadsTable({
    leads,
    onDelete,
    onEdit,
    currentUserId,
    isAdmin,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Source
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {leads.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-4 text-center text-gray-500"
                            >
                                No leads found
                            </td>
                        </tr>
                    ) : (
                        leads.map((lead) => (
                            <tr
                                key={lead._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    {lead.name}
                                </td>

                                <td className="p-4">
                                    {lead.email}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${lead.status ===
                                                "New"
                                                ? "bg-blue-100 text-blue-700"
                                                : lead.status ===
                                                    "Contacted"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : lead.status ===
                                                        "Qualified"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {lead.status}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {lead.source}
                                </td>

                                <td className="p-4 flex gap-2">
                                    {(isAdmin || lead.createdBy === currentUserId) ? (
                                        <>
                                            <button
                                                onClick={() => onEdit(lead)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(lead._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-sm text-gray-500">
                                            No actions
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default LeadsTable;