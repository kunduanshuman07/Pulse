import {
    ChevronRight,
    ArrowLeft,
    Menu,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

type TopbarProps = {
    onMenuClick: () => void;
};

export function Topbar({
    onMenuClick,
}: TopbarProps) {
    const location =
        useLocation();

    const navigate =
        useNavigate();

    const segments =
        location.pathname
            .split("/")
            .filter(Boolean);

    return (
        <header className="glass-card sticky top-0 z-30 flex min-h-[72px] shrink-0 items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:min-h-[80px] sm:px-6 sm:py-4 lg:min-h-[90px] lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:gap-6">
                <button
                    type="button"
                    aria-label="Open navigation menu"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white lg:hidden"
                >
                    <Menu size={18} />
                </button>

                <button
                    type="button"
                    aria-label="Go back"
                    onClick={() =>
                        navigate(-1)
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white sm:h-11 sm:w-11"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="hidden min-w-0 items-center gap-1 overflow-hidden sm:flex sm:gap-2">
                    <span className="shrink-0 text-sm text-white/35">
                        Pulse
                    </span>

                    {segments.map(
                        (
                            segment,
                            index,
                        ) => (
                            <div
                                key={`${segment}-${index}`}
                                className="flex min-w-0 items-center gap-1 sm:gap-2"
                            >
                                <ChevronRight
                                    size={
                                        16
                                    }
                                    className="shrink-0 text-white/20"
                                />

                                <span
                                    className={`truncate text-sm capitalize ${index ===
                                            segments.length -
                                            1
                                            ? "text-white"
                                            : "text-white/45"
                                        }`}
                                >
                                    {segment.replace(
                                        "-",
                                        " ",
                                    )}
                                </span>
                            </div>
                        ),
                    )}
                </div>

                {segments.length > 0 && (
                    <span className="truncate text-sm capitalize text-white sm:hidden">
                        {segments[
                            segments.length -
                                1
                        ].replace("-", " ")}
                    </span>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <div className="glass-card rounded-xl px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
                    <p className="text-xs text-white/45 sm:text-sm">
                        <span className="hidden min-[400px]:inline">
                            Intelligence{" "}
                        </span>
                        Score
                    </p>

                    <h3 className="text-base font-semibold text-cyan-300 sm:text-lg">
                        94%
                    </h3>
                </div>
            </div>
        </header>
    );
}
