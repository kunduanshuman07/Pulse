import { useState } from "react";

import { Sidebar } from "./sidebar";

import { Topbar } from "./topbar";

export function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />
            )}

            <Sidebar
                open={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Topbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
