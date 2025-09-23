import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";

export const authService = {
    async login(request: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse> (
                "/auth/login",
                request
            );
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    async logout(): Promise<void> {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    },

    async getCurrentUser(): Promise<LoginResponse["user"]> {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("User not authenticated");
        }

        const user = localStorage.getItem("user");
        if (!user) {
            throw new Error("User not found");
        }
        return JSON.parse(user);
    },

    async register(request: RegisterRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                "/auth/register",
                request
            );
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },
};

export const tokenService = {
    getToken(): string | null {
        return localStorage.getItem("access_token");
    },

    setToken(token: string): void {
        localStorage.setItem("access_token", token);
    },

    removeToken(): void {
        localStorage.removeItem("access_token");
    },

    isAuthenticated(): boolean {
        const token = this.getToken();
        return Boolean(token);
    },
};

export const userService = {
    getUser(): LoginResponse["user"] | null {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    setUser(user: LoginResponse["user"]): void {
        localStorage.setItem("user", JSON.stringify(user));
    },

    removeUser(): void {
        localStorage.removeItem("user");
    },
};