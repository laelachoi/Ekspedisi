import { useAuth } from "./use-auth"

export const usePermission = () => {
    const { user } = useAuth();

    const hasPermission = (permissionKey: string): boolean => {
        if (!user || !user.role) {
            return false;
        }

        return (
            user.role.permissions?.some(
                (permission) => permission.key === permissionKey
            ) || false
        );
    };

    const hasAnyPermission = (permissionKeys: string[]): boolean => {
        return permissionKeys.some((key) => hasPermission(key));
    };

    const hasAllPermissions = (permissionKeys: string[]): boolean => {
        return permissionKeys.every((key) => hasPermission(key));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    };
};