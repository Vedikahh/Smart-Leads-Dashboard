import { useToast } from "../context/ToastContext";
import api from "../services/api";

interface Props {
    search?: string;
    status?: string;
    source?: string;
}

function ExportButton({
    search = "",
    status = "",
    source = "",
}: Props) {
    const { showToast } = useToast();

    const handleExport = async () => {
        try {
            const response = await api.get(
                `/leads/export/csv?search=${search}&status=${status}&source=${source}`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `leads-${new Date().toISOString().split("T")[0]}.csv`
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            showToast("Leads exported successfully!", "success");
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to export leads";
            showToast(message, "error");
        }
    };

    return (
        <button
            type="button"
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Export CSV
        </button>
    );
}

export default ExportButton;
