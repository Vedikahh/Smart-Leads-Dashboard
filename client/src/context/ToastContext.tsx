import {
    createContext,
    useContext,
    useState,
} from "react";

interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastContextType {
    toasts: ToastMessage[];
    showToast: (
        message: string,
        type: "success" | "error" | "info"
    ) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<
    ToastContextType | undefined
>(undefined);

export function ToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = useState<
        ToastMessage[]
    >([]);

    const showToast = (
        message: string,
        type: "success" | "error" | "info"
    ) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [
            ...prev,
            { id, message, type },
        ]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) =>
            prev.filter((toast) => toast.id !== id)
        );
    };

    return (
        <ToastContext.Provider
            value={{ toasts, showToast, removeToast }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error(
            "useToast must be used within ToastProvider"
        );
    }
    return context;
}
