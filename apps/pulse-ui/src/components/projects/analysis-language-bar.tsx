import { Languages } from "lucide-react";

import type { ContentLanguage } from "../../types/language";
import { CONTENT_LANGUAGES } from "../../types/language";

type AnalysisLanguageBarProps = {
    value: ContentLanguage;

    onChange: (
        language: ContentLanguage,
    ) => void;

    translating?: boolean;
};

export function AnalysisLanguageBar({
    value,
    onChange,
    translating = false,
}: AnalysisLanguageBarProps) {
    return (
        <div className="glass-card flex flex-col gap-4 rounded-[24px] p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-[28px] sm:p-5">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                    <Languages
                        className="text-cyan-300"
                        size={20}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-white">
                        Analysis language
                    </p>

                    <p className="text-xs text-white/45">
                        View intelligence in English or Hindi
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {CONTENT_LANGUAGES.map(
                    (language) => {
                        const isActive =
                            value ===
                            language.value;

                        return (
                            <button
                                key={
                                    language.value
                                }
                                type="button"
                                disabled={
                                    translating
                                }
                                onClick={() =>
                                    onChange(
                                        language.value,
                                    )
                                }
                                className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                                    isActive
                                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                                }`}
                            >
                                {
                                    language.nativeLabel
                                }
                            </button>
                        );
                    },
                )}

                {translating && (
                    <span className="text-xs text-cyan-300/80">
                        Translating…
                    </span>
                )}
            </div>
        </div>
    );
}
