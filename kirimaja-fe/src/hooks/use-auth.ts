import type { LoginRequest, RegisterRequest } from "@/lib/api";
import { authService, tokenService, userService } from "@/lib/api/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: ["auth", "user"],
        queryFn: authService.getCurrentUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            if (!data?.access_token || !data?.user) {
                toast.error("Response tidak valid dari server");
                return;
            }

            tokenService.setToken(data.access_token);
            userService.setUser(data.user);

            queryClient.setQueryData(["auth", "user"], data.user);

            toast.success("Login berhasil!");
            
            navigate("/dashboard");
        },
        onError: (error: Error) => {
            const errorMessage =
                error.message || "Login gagal. Silahkan coba lagi.";
            toast.error(errorMessage);

            tokenService.removeToken();
            userService.removeUser();
            queryClient.setQueryData(["auth", "user"], null);
        },
    });
    
    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            await authService.logout();
            tokenService.removeToken();
            userService.removeUser();
            queryClient.clear();
            return true;
        },
        onSuccess: () => {
            toast.success("Logout berhasil!");

            navigate("/auth/login");
        },
        onError: () => {
            toast.error("Logout gagal. Silahkan coba lagi.");
        },
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            if (!data?.access_token || !data?.user) {
                toast.error("Response tidak valid dari server");
                return;
            }

            tokenService.setToken(data.access_token);
            userService.setUser(data.user);

            queryClient.setQueryData(["auth", "user"], data.user);

            toast.success("Registrasi berhasil!, Selamat datang!");
            
            navigate("/dashboard");
        },
        onError: (error: Error) => {
            const errorMessage =
                error.message || "Registrasi gagal. Silahkan coba lagi.";
            toast.error(errorMessage);
        },
    });

    const login = (credentials: LoginRequest) => {
        loginMutation.mutate(credentials);
    };

    const logout = () => {
        logoutMutation.mutate();
    };

    const register = (credentials: RegisterRequest) => {
        registerMutation.mutate(credentials);
    };

    const isAuthenticated = !!user && !!tokenService.getToken();

    return {
        user,
        isLoadingUser,
        isAuthenticated,
        login,
        logout,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        isRegistering: registerMutation.isPending,
        register,
    }
}