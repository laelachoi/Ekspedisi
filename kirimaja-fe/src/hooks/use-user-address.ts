import type { CreateUserAddressRequest, UpdateUserAddressRequest } from "@/lib/api";
import { userAddressService } from "@/lib/api/services/user-address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const userAddressKeys = {
    all: ["user-addresses"] as const,
    lists: () => [...userAddressKeys.all, "list"] as const,
    list: (filters: string) => [...userAddressKeys.lists(), { filters }] as const,
    details: () => [...userAddressKeys.all, "detail"] as const,
    detail: (id: number) => [...userAddressKeys.details(), id] as const,
};

// Get all user addresses
export const useUserAddresses = () => {
    return useQuery({
        queryKey: userAddressKeys.lists(),
        queryFn: userAddressService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get user address by ID
export const useUserAddress = (id: number) => {
    return useQuery({
        queryKey: userAddressKeys.detail(id),
        queryFn: () => userAddressService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create user address
export const useCreateUserAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserAddressRequest) => userAddressService.create(data),
        onSuccess: (createdAddress) => {
            toast.success("Alamat berhasil ditambahkan");
            queryClient.invalidateQueries({ 
                queryKey: userAddressKeys.lists(),
            });
            // Optionally, set the new address in cache
            if (createdAddress && createdAddress.id) {
                queryClient.setQueryData(
                    userAddressKeys.detail(createdAddress.id), 
                    createdAddress
                );
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Update user address
export const useUpdateUserAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: UpdateUserAddressRequest }) =>
            userAddressService.update(id, data),
        onSuccess: (updatedAddress, variables) => {
            toast.success("Alamat berhasil diperbarui");
            queryClient.invalidateQueries({ 
                queryKey: userAddressKeys.lists(),
            });
            // Use the ID from variables instead of updatedAddress to avoid undefined error
            if (updatedAddress && updatedAddress.id) {
                queryClient.setQueryData(
                    userAddressKeys.detail(updatedAddress.id),
                    updatedAddress
                );
            } else {
                // Fallback: invalidate the specific query
                queryClient.invalidateQueries({
                    queryKey: userAddressKeys.detail(variables.id),
                });
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Delete user address
export const useDeleteUserAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => userAddressService.delete(id),
        onSuccess: (_, deletedId) => {
            toast.success("Alamat berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: userAddressKeys.lists() });
            queryClient.removeQueries({queryKey: userAddressKeys.detail(deletedId)});
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });    
}
    