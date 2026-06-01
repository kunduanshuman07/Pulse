export type ContentLanguage = "en" | "hi";

export const CONTENT_LANGUAGES: {
    value: ContentLanguage;
    label: string;
    nativeLabel: string;
}[] = [
    {
        value: "en",
        label: "English",
        nativeLabel: "English",
    },
    {
        value: "hi",
        label: "Hindi",
        nativeLabel: "हिंदी",
    },
];

export function isContentLanguage(
    value: string,
): value is ContentLanguage {
    return value === "en" || value === "hi";
}
