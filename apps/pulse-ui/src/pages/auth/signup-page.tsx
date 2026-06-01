import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/auth-context";
import { authService } from "../../service/auth.service";
import { AuthLoader } from "../../components/auth/auth-loader";
import { usePageTitle } from "../../hooks/use-page-title";

export function SignupPage() {
    usePageTitle("Sign Up");
    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    const passwordChecks = {
        minLength:
            password.length >= 8,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /[0-9]/.test(password),

        special:
            /[^A-Za-z0-9]/.test(
                password,
            ),
    };

    const isPasswordValid =
        Object.values(
            passwordChecks,
        ).every(Boolean);

    const handleSignup = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();

        if (
            !name ||
            !email ||
            !password
        ) {
            toast.error(
                "Please fill all fields",
            );

            return;
        }

        if (!isPasswordValid) {
            toast.error(
                "Password does not meet security requirements",
            );

            return;
        }

        try {
            setLoading(true);

            setProgress(10);

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
                                prev + 7
                            );
                        },
                    );
                }, 160);

            await authService.signup(
                {
                    name,

                    email,

                    password,
                },
            );

            setProgress(100);

            const loginResponse =
                await authService.login(
                    {
                        email,

                        password,
                    },
                );

            login(
                loginResponse.data
                    .access_token,

                {
                    email,
                    sub: "temp-user",
                },
            );

            toast.success(
                "Account created successfully",
            );

            setTimeout(() => {
                navigate("/");
            }, 700);
        } catch (error: any) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Signup failed",
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
                            BUILD THE FUTURE
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
                            Launch intelligent products with confidence.
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
                            Create your AI-powered
                            workspace to analyze
                            markets, audiences,
                            trends, and growth
                            opportunities.
                        </motion.p>
                    </div>

                    {/* STATS */}

                    <div className="relative z-10 flex items-center gap-12">
                        <div>
                            <p className="mb-2 text-sm text-white/45">
                                Startups Analyzed
                            </p>

                            <h3 className="text-4xl font-semibold text-cyan-300">
                                12K+
                            </h3>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-white/45">
                                Launch Accuracy
                            </p>

                            <h3 className="text-4xl font-semibold">
                                98%
                            </h3>
                        </div>
                    </div>
                </section>

                {/* RIGHT */}

                <section className="relative flex w-full flex-1 items-center justify-center border-white/5 bg-white/[0.02] px-4 py-10 backdrop-blur-3xl sm:px-6 sm:py-12 lg:w-[min(650px,45vw)] lg:shrink-0 lg:border-l lg:px-12 xl:px-20">
                    <div className="w-full max-w-lg">
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

                    <div className="glass-card w-full max-w-lg rounded-[28px] p-6 sm:rounded-[36px] sm:p-8 md:p-10">
                        <div className="mb-8 sm:mb-10">
                            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/70 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
                                Get Started
                            </p>

                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                Create Account
                            </h2>
                        </div>

                        <form
                            onSubmit={
                                handleSignup
                            }
                            className="space-y-5"
                        >
                            {/* NAME */}

                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(
                                        e,
                                    ) =>
                                        setName(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="Anshuman Kundu"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            {/* EMAIL */}

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

                            {/* PASSWORD */}

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

                                {/* RULES */}

                                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {[
                                        {
                                            label:
                                                "8+ Characters",
                                            valid:
                                                passwordChecks.minLength,
                                        },
                                        {
                                            label:
                                                "Uppercase",
                                            valid:
                                                passwordChecks.uppercase,
                                        },
                                        {
                                            label:
                                                "Lowercase",
                                            valid:
                                                passwordChecks.lowercase,
                                        },
                                        {
                                            label:
                                                "Number",
                                            valid:
                                                passwordChecks.number,
                                        },
                                        {
                                            label:
                                                "Special Character",
                                            valid:
                                                passwordChecks.special,
                                        },
                                    ].map(
                                        (
                                            rule,
                                        ) => (
                                            <div
                                                key={
                                                    rule.label
                                                }
                                                className={`rounded-xl border px-3 py-2 text-xs transition-all duration-300 ${rule.valid
                                                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                                    : "border-white/5 bg-white/[0.03] text-white/35"
                                                    }`}
                                            >
                                                {
                                                    rule.label
                                                }
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="mt-4 h-14 w-full rounded-2xl bg-cyan-400 text-[15px] font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Create Intelligence
                                Workspace
                            </button>
                        </form>

                        {/* FOOTER */}

                        <div className="mt-8 text-center">
                            <p className="text-sm text-white/40">
                                Already have an
                                account?{" "}
                                <span
                                    onClick={() =>
                                        navigate(
                                            "/login",
                                        )
                                    }
                                    className="cursor-pointer text-cyan-300 hover:text-cyan-200"
                                >
                                    Login
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
                    text="Creating Workspace"
                />
            )}
        </>
    );
}