import type { ContentLanguage } from "../../types/language";
import { CONTENT_LANGUAGES } from "../../types/language";

type ContentLanguageSelectorProps = {
    value: ContentLanguage;

    onChange: (
        language: ContentLanguage,
    ) => void;

    compact?: boolean;
};

export function ContentLanguageSelector({
    value,
    onChange,
    compact = false,
}: ContentLanguageSelectorProps) {
    return (
        <div
            className={
                compact
                    ? "space-y-2"
                    : "space-y-3"
            }
        >
            <p className="text-sm text-white/50">
                Content language
            </p>

            <div className="flex flex-wrap gap-2">
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
                                onClick={() =>
                                    onChange(
                                        language.value,
                                    )
                                }
                                className={`rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                                }`}
                            >
                                {
                                    language.nativeLabel
                                }
                                {!compact && (
                                    <span className="ml-2 text-white/40">
                                        (
                                        {
                                            language.label
                                        }
                                        )
                                    </span>
                                )}
                            </button>
                        );
                    },
                )}
            </div>

            {value === "hi" && (
                <p className="text-xs leading-relaxed text-white/40">
                    You can write project details in Hindi
                    (हिंदी). Analysis results will be generated
                    and translated in Hindi.
                </p>
            )}
        </div>
    );
}
