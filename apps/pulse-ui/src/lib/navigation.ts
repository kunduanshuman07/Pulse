import { BarChart3, Layers3 } from "lucide-react";

export const navigationItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: BarChart3,
        protected: true,
    },
    {
        label: "Projects",
        path: "/projects",
        icon: Layers3,
        protected: true,
    },
];