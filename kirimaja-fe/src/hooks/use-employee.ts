import type { EmployeeBranchRequest, UpdateEmployeeBranchRequest } from "@/lib/api";
import { employeeService } from "@/lib/api/services/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const employeeKeys = {
    all: ["employees"] as const,
    lists: () => [...employeeKeys.all, "list"] as const,
    list: (filters: string) => [...employeeKeys.lists(), { filters }] as const,
    details: () => [...employeeKeys.all, "detail"] as const,
    detail: (id: number) => [...employeeKeys.details(), id] as const,
};

// Get all employee
export const useEmployees = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: employeeKeys.lists(),
        queryFn: employeeService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: options?.enabled ?? true,
    });
};

// Create employee
export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: EmployeeBranchRequest) => employeeService.createEmployee(data),
        onSuccess: () => {
            toast.success("Karyawan berhasil ditambahkan");
            queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Update employee
export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: UpdateEmployeeBranchRequest }) =>
            employeeService.updateEmployee(id, data),
        onSuccess: (updatedEmployee) => {
            toast.success("Karyawan berhasil diperbarui");
            queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
            queryClient.setQueryData(employeeKeys.detail(updatedEmployee.id), updatedEmployee );
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

// Delete branch
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => employeeService.delete(id),
        onSuccess: (_, deletedId) => {
            toast.success("Karyawan berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
            queryClient.removeQueries({queryKey: employeeKeys.detail(deletedId)});
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });    
}
    