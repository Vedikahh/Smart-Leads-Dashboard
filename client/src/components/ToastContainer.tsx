import Toast from "./Toast";
import { useToast } from "../context/ToastContext";

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() =>
                        removeToast(toast.id)
                    }
                />
            ))}
        </div>
    );
}

export default ToastContainer;
