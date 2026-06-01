import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context";
import { AppRouter } from "./app/router/app-router";

ReactDOM.createRoot(
  document.getElementById(
    "root",
  )!,
).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />

      <Toaster
        position="top-right"
        richColors
        theme="dark"
      />
    </AuthProvider>
  </React.StrictMode>,
);