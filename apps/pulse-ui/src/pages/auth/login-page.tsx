import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { authService } from "../../service/auth.service";
import { AuthLoader } from "../../components/auth/auth-loader";
import { useAuth } from "../../context/auth-context";
import { usePageTitle } from "../../hooks/use-page-title";

export function LoginPage() {
    usePageTitle("Login");
    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    const handleLogin = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error(
                "Please fill all fields",
            );

            return;
        }

        try {
            setLoading(true);

            setProgress(12);

            const interval =
                setInterval(() => {
                    setProgress(
                        (prev) => {
                            if (
                                prev >= 90
                            ) {
                                clearInterval(
                                    interval,
                                );

                                return 90;
                            }

                            return (
                                prev + 8
                            );
                        },
                    );
                }, 180);

            const response =
                await authService.login(
                    {
                        email,

                        password,
                    },
                );

            setProgress(100);

            login(
                response.data
                    .access_token,

                {
                    email,
                    sub: "temp-user",
                },
            );

            toast.success(
                "Login successful",
            );

            setTimeout(() => {
                navigate("/");
            }, 700);
        } catch (error: any) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Login failed",
            );

            setLoading(false);

            setProgress(0);
        }
    };

    return (
        <>
            <main className="relative flex min-h-screen min-h-[100dvh] flex-col overflow-x-hidden lg:flex-row">
                {/* LEFT */}

                <section className="relative hidden flex-1 flex-col justify-between overflow-hidden p-8 md:p-10 lg:flex lg:p-14">
                    <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[120px]" />

                    <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-[120px]" />

                    {/* LOGO */}

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="glow-primary flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                            <div className="h-3.5 w-3.5 rounded-full bg-cyan-300" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                PULSE
                            </h1>

                            <p className="text-sm text-white/40">
                                Intelligence OS
                            </p>
                        </div>
                    </div>

                    {/* HERO */}

                    <div className="relative z-10 max-w-2xl">
                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="mb-6 text-sm uppercase tracking-[0.35em] text-cyan-300/70"
                        >
                            PRODUCT INTELLIGENCE PLATFORM
                        </motion.p>

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.1,
                            }}
                            className="mb-8 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-7xl"
                        >
                            Predict market success before launch.
                        </motion.h1>

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.2,
                            }}
                            className="max-w-xl text-xl leading-relaxed text-white/55"
                        >
                            AI-powered product
                            intelligence platform
                            for market prediction,
                            audience insights, and
                            strategic analysis.
                        </motion.p>
                    </div>

                    {/* STATS */}

                    <div className="relative z-10 flex items-center gap-12">
                        <div>
                            <p className="mb-2 text-sm text-white/45">
                                AI Accuracy
                            </p>

                            <h3 className="text-4xl font-semibold text-cyan-300">
                                98%
                            </h3>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-white/45">
                                Analyses Generated
                            </p>

                            <h3 className="text-4xl font-semibold">
                                18.4K
                            </h3>
                        </div>
                    </div>
                </section>

                {/* RIGHT */}

                <section className="relative flex w-full flex-1 items-center justify-center border-white/5 bg-white/[0.02] px-4 py-10 backdrop-blur-3xl sm:px-6 sm:py-12 lg:w-[min(620px,45vw)] lg:shrink-0 lg:border-l lg:p-12 xl:p-20">
                    <div className="w-full max-w-md">
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <div className="glow-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                            <div className="h-3 w-3 rounded-full bg-cyan-300" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight">
                                PULSE
                            </h1>

                            <p className="text-xs text-white/40">
                                Intelligence OS
                            </p>
                        </div>
                    </div>

                    <div className="glass-card w-full max-w-md rounded-[28px] p-6 sm:rounded-[36px] sm:p-8 md:p-10">
                        <div className="mb-8 sm:mb-10">
                            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/70 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
                                Welcome Back
                            </p>

                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                Login
                            </h2>
                        </div>

                        <form
                            onSubmit={
                                handleLogin
                            }
                            className="space-y-6"
                        >
                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(
                                        e,
                                    ) =>
                                        setEmail(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="anshuman@example.com"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={
                                        password
                                    }
                                    onChange={(
                                        e,
                                    ) =>
                                        setPassword(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="mt-4 h-14 w-full rounded-2xl bg-cyan-400 text-[15px] font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Access Intelligence
                                Platform
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-white/40">
                                Don’t have an
                                account?{" "}
                                <span
                                    onClick={() =>
                                        navigate(
                                            "/signup",
                                        )
                                    }
                                    className="cursor-pointer text-cyan-300 hover:text-cyan-200"
                                >
                                    Create account
                                </span>
                            </p>
                        </div>
                    </div>
                    </div>
                </section>
            </main>

            {loading && (
                <AuthLoader
                    progress={progress}
                />
            )}
        </>
    );
}