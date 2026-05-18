import { useEffect } from "react";

interface Props {
    message: string;
    type: "success" | "error" | "info";
    onClose: () => void;
    duration?: number;
}

function Toast({
    message,
    type,
    onClose,
    duration = 3000,
}: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    }[type];

    return (
        <div
            className={`${bgColor} text-white px-4 py-3 rounded shadow-lg animate-pulse fixed bottom-4 right-4 max-w-sm z-50`}
        >
            {message}
        </div>
    );
}

export default Toast;
