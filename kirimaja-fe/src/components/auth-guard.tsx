import { useAuth } from "@/hooks/use-auth";
import { usePermission } from "@/hooks/use-permission";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    permission?: string;
    permissions?: string[];
    redirectTo?: string;
}

export const AuthGuard = ({ 
    children, 
    requireAuth = true,
    permission,
    permissions,
    redirectTo = "/dashboard", 
}: AuthGuardProps) => {
    const { isAuthenticated, isLoadingUser } = useAuth();
    const { hasPermission, hasAnyPermission } = usePermission();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoadingUser) {
            if (requireAuth && !isAuthenticated) {
                navigate("/auth/login");
            } else if (!requireAuth && isAuthenticated) {
                navigate("/dashboard");
            } else if (isAuthenticated && (permission || permissions)) {
                let hasAccess = false;
                if (permission) {
                    hasAccess = hasPermission(permission);
                } else if (permissions) {
                    hasAccess = hasAnyPermission(permissions);
                }

                if (!hasAccess) {
                    navigate(redirectTo);
                }
            }
        }
    }, [
        isAuthenticated, 
        isLoadingUser, 
        requireAuth, 
        navigate, 
        permission, 
        permissions, 
        hasPermission, 
        hasAnyPermission, 
        redirectTo
    ]);

    if (requireAuth && !isAuthenticated) {
        return null;
    }

    if (!requireAuth && isAuthenticated) {
        return null;
    }

    if (isAuthenticated && (permission || permissions)) {
        let hasAccess = false;

        if (permission) {
            hasAccess = hasPermission(permission);
        } else if (permissions) {
            hasAccess = hasAnyPermission(permissions);
        }

        if (!hasAccess) {
            return null;
        }
    }

    return <>{children}</>;
}