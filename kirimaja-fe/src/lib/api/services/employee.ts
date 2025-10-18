import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import type { EmployeeBranch, EmployeeBranchRequest, EmployeeBranchResponse, SingleEmployeeBranchResponse, UpdateEmployeeBranchRequest } from "../types/employee";

export const employeeService = {
    // Get all employee branch
    async getAll(): Promise<EmployeeBranch[]> {
        try {
            const response = await apiClient.get<EmployeeBranchResponse> ("/employee-branches");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Create employee with full data
    async createEmployee(data: EmployeeBranchRequest): Promise<EmployeeBranch> {
        try {
            const response = await apiClient.post<SingleEmployeeBranchResponse> (
                "/employee-branches", 
                data
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Update employee
    async updateEmployee(id: number, data: UpdateEmployeeBranchRequest): Promise<EmployeeBranch> {
       try {
            const response = await apiClient.patch<SingleEmployeeBranchResponse> (
                `/employee-branches/${id}`, 
                data
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Delete employee
    async delete(id: number): Promise<void> {
        try {
            await apiClient.delete(`/employee-branches/${id}`);
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);            
        }
    }
};