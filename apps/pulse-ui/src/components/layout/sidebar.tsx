import { motion } from "framer-motion";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { LogOut, X } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { navigationItems } from "../../lib/navigation";

type SidebarProps = {
    open: boolean;

    onClose: () => void;
};

export function Sidebar({
    open,
    onClose,
}: SidebarProps) {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    const { logout } =
        useAuth();

    const handleLogout = () => {
        logout();

        onClose();

        navigate("/login");
    };

    const handleNavigate = (
        path: string,
    ) => {
        navigate(path);

        onClose();
    };

    return (
        <aside
            className={`glass-card fixed inset-y-0 left-0 z-50 flex h-screen w-[min(320px,88vw)] flex-col justify-between border-r border-white/5 p-5 transition-transform duration-300 ease-out sm:p-7 lg:relative lg:z-auto lg:w-[280px] lg:translate-x-0 xl:w-[320px] ${
                open
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
            }`}
        >
            <div>
                <div className="mb-10 flex items-center justify-between gap-4 lg:mb-14">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="glow-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 sm:h-12 sm:w-12">
                            <div className="h-3 w-3 rounded-full bg-cyan-300 sm:h-3.5 sm:w-3.5" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                PULSE
                            </h1>

                            <p className="mt-0.5 text-xs text-white/40 sm:mt-1 sm:text-sm">
                                Intelligence OS
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:text-white lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="space-y-2 sm:space-y-3">
                    {navigationItems.map(
                        (item) => {
                            const Icon =
                                item.icon;

                            const isActive =
                                location.pathname ===
                                    item.path ||
                                location.pathname.startsWith(
                                    `${item.path}/`,
                                );

                            return (
                                <motion.button
                                    key={
                                        item.label
                                    }
                                    whileHover={{
                                        x: 6,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                    onClick={() =>
                                        handleNavigate(
                                            item.path,
                                        )
                                    }
                                    className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:gap-4 sm:px-5 sm:py-4 ${
                                        isActive
                                            ? "border-cyan-400/20 bg-cyan-400/10 text-white shadow-[0_0_40px_rgba(0,209,255,0.12)]"
                                            : "border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                                    }`}
                                >
                                    <Icon
                                        size={
                                            20
                                        }
                                        className="shrink-0 transition-all duration-300 group-hover:scale-110"
                                    />

                                    <span className="text-sm font-medium sm:text-[15px]">
                                        {
                                            item.label
                                        }
                                    </span>
                                </motion.button>
                            );
                        },
                    )}
                </nav>
            </div>

            <div className="space-y-3 sm:space-y-4">
                <div className="glass-card rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-white/50">
                            AI Agents
                        </p>

                        <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                    </div>

                    <h3 className="mb-4 text-xl font-semibold tracking-tight sm:mb-5 sm:text-2xl">
                        3 Active Analyses
                    </h3>

                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />

                        <p className="text-sm text-emerald-300">
                            Systems operational
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/10 text-sm font-medium text-red-300 transition-all duration-300 hover:border-red-400/20 hover:bg-red-400/15 sm:h-14"
                >
                    <LogOut size={18} />

                    Logout
                </button>
            </div>
        </aside>
    );
}
