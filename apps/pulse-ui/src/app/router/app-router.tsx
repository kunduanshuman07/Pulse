import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { ProtectedRoute } from "../guards/protected-route";
import { PublicRoute } from "../guards/public-route";
import { LoginPage } from "../../pages/auth/login-page";
import { SignupPage } from "../../pages/auth/signup-page";
import { AppShell } from "../../components/layout/app-shell";
import { ProjectsPage } from "../../pages/projects/projects-page";
import { ProjectOverviewPage } from "../../pages/projects/projects-overview-page";
import { DashboardPage } from "../../pages/dashboard-page";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PROTECTED */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AppShell>
                                <DashboardPage />
                            </AppShell>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <AppShell>
                                <ProjectsPage />
                            </AppShell>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:id"
                    element={
                        <ProtectedRoute>
                            <AppShell>
                                <ProjectOverviewPage />
                            </AppShell>
                        </ProtectedRoute>

                    }
                />

                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <SignupPage />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter >
    );
}