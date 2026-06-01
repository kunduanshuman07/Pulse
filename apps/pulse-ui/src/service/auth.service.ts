import { api } from "../lib/api";

type SignupPayload = {
    name: string;

    email: string;

    password: string;
};

type LoginPayload = {
    email: string;

    password: string;
};

export const authService = {
    signup: async (
        payload: SignupPayload,
    ) => {
        const response =
            await api.post(
                "/auth/signup",
                payload,
            );

        return response.data;
    },

    login: async (
        payload: LoginPayload,
    ) => {
        const response =
            await api.post(
                "/auth/login",
                payload,
            );

        return response.data;
    },
};