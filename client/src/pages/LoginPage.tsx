import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const res = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="w-full bg-black text-white p-3 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;