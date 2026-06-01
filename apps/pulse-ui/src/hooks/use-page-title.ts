import { useEffect } from "react";

export const APP_NAME = "Pulse";

export function formatPageTitle(
    pageName?: string,
): string {
    if (!pageName?.trim()) {
        return APP_NAME;
    }

    return `${APP_NAME} - ${pageName.trim()}`;
}

export function usePageTitle(
    pageName?: string,
) {
    useEffect(() => {
        document.title =
            formatPageTitle(pageName);
    }, [pageName]);
}
