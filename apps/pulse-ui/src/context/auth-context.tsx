import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type User = {
    email: string;
    sub: string;
};

type AuthContextType = {
    token: string | null;
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (
        token: string,
        user: User,
    ) => void;
    logout: () => void;
};

const AuthContext =
    createContext<AuthContextType | null>(
        null,
    );

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] =
        useState<string | null>(null);

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const storedToken =
            localStorage.getItem(
                "pulse-token",
            );

        const storedUser =
            localStorage.getItem(
                "pulse-user",
            );

        if (
            storedToken &&
            storedUser &&
            storedUser !== "undefined"
        ) {
            try {
                setToken(storedToken);

                setUser(
                    JSON.parse(storedUser),
                );
            } catch (error) {
                localStorage.removeItem(
                    "pulse-token",
                );

                localStorage.removeItem(
                    "pulse-user",
                );
            }
        }

        setLoading(false);
    }, []);

    const login = (
        token: string,
        user: User,
    ) => {
        localStorage.setItem(
            "pulse-token",
            token,
        );

        localStorage.setItem(
            "pulse-user",
            JSON.stringify(user),
        );

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem(
            "pulse-token",
        );

        localStorage.removeItem(
            "pulse-user",
        );

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider",
        );
    }

    return context;
}