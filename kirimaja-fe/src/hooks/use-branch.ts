import type { CreateBranchRequest } from "@/lib/api";
import { branchService } from "@/lib/api/services/branch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const branchKeys = {
    all: ["branches"] as const,
    lists: () => [...branchKeys.all, "list"] as const,
    list: (filters: string) => [...branchKeys.lists(), { filters }] as const,
    details: () => [...branchKeys.all, "detail"] as const,
    detail: (id: number) => [...branchKeys.details(), id] as const,
};

// Get all branches
export const useBranches = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: branchKeys.lists(),
        queryFn: branchService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: options?.enabled ?? true,
    });
};

// Get branch by ID
export const useBranche = (id: number) => {
    return useQuery({
        queryKey: branchKeys.detail(id),
        queryFn: () => branchService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create branch
export const useCreateBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBranchRequest) => branchService.create(data),
        onSuccess: () => {
            toast.success("Cabang berhasil ditambahkan");
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Update branch
export const useUpdateBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<CreateBranchRequest> }) =>
            branchService.update(id, data),
        onSuccess: (updatedBranch) => {
            toast.success("Cabang berhasil diperbarui");
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            queryClient.setQueryData(branchKeys.detail(updatedBranch.id), updatedBranch );
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Delete branch
export const useDeleteBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => branchService.delete(id),
        onSuccess: (_, deletedId) => {
            toast.success("Cabang berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            queryClient.removeQueries({queryKey: branchKeys.detail(deletedId)});
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });    
}
    