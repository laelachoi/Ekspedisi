import type { UpdateRolePermissionsRequest } from "@/lib/api";
import { roleService } from "@/lib/api/services/role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: roleService.getRoles,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useRole = (id: number) => {
    return useQuery({
        queryKey: ["roles", id],
        queryFn: () => roleService.getRoleById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: UpdateRolePermissionsRequest }) =>
            roleService.updateRole(id, data),
        onSuccess: (updatedRole) => {
            // update the spesific role in cache
            queryClient.setQueryData(["roles", updatedRole.id], updatedRole);

            // invalidate and refetch roles list
            queryClient.invalidateQueries({ queryKey: ["roles"] });

            toast.success("Role berhasil diperbarui!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Gagal memperbarui role");
        },
    });
}
    