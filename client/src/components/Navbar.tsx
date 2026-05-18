import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    const activeClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-slate-900 font-semibold border-b-2 border-slate-900"
            : "text-slate-600 hover:text-slate-900";

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to={user ? "/dashboard" : "/login"}
                        className="text-lg font-bold text-slate-900"
                    >
                        Smart Leads
                    </Link>

                    <div className="flex items-center gap-3">
                        <nav className="flex flex-wrap items-center gap-2">
                            {!user ? (
                                <>
                                    <NavLink to="/login" className={activeClass}>
                                        Login
                                    </NavLink>
                                    <NavLink to="/register" className={activeClass}>
                                        Register
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/dashboard" className={activeClass}>
                                        Dashboard
                                    </NavLink>
                                </>
                            )}
                        </nav>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-600">
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
