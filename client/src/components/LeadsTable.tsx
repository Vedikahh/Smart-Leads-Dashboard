import type { Lead } from "../types/lead";

interface Props {
    leads: Lead[];
    onDelete: (id: string) => void;
}

function LeadsTable({ leads, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
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
                    {leads.map((lead) => (
                        <tr
                            key={lead._id}
                            className="border-t"
                        >
                            <td className="p-4">
                                {lead.name}
                            </td>

                            <td className="p-4">
                                {lead.email}
                            </td>

                            <td className="p-4">
                                {lead.status}
                            </td>

                            <td className="p-4">
                                {lead.source}
                            </td>

                            <td className="p-4">
                                <button
                                    onClick={() =>
                                        onDelete(lead._id)
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeadsTable;