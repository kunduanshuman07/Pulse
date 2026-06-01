function getEnv(
    key: keyof ImportMetaEnv,
    fallback: string,
): string {
    const value = import.meta.env[key];

    return typeof value === "string" &&
        value.length > 0
        ? value
        : fallback;
}

const analyticsBaseUrl = getEnv(
    "VITE_ANALYTICS_BASE_URL",
    "http://127.0.0.1:8000",
);

export const env = {
    apiBaseUrl: getEnv(
        "VITE_API_BASE_URL",
        "http://localhost:3000/v1",
    ),

    analyticsBaseUrl,

    analyticsStreamUrl: `${analyticsBaseUrl}/stream-analysis`,
};
