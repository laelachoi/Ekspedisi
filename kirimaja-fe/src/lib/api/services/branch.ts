import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { Branch, BranchResponse, CreateBranchRequest, SingleBranchResponse } from "../types/branch";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";

export const branchService = {
    // Get all branches
    async getAll(): Promise<Branch[]> {
        try {
            const response = await apiClient.get<BranchResponse> ("/branches");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Get branch by ID
    async getById(id: number): Promise<Branch | null> {
        try {
            const response = await apiClient.get<SingleBranchResponse> (`/branches/${id}`);
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Create new branch
    async create(data: CreateBranchRequest): Promise<Branch> {
        try {
            const response = await apiClient.post<SingleBranchResponse> (
                "/branches", 
                data
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Update branch
    async update(id: number, data: Partial<CreateBranchRequest>): Promise<Branch> {
       try {
            const response = await apiClient.patch<SingleBranchResponse> (
                `/branches/${id}`, 
                data
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Delete branch
    async delete(id: number): Promise<Boolean> {
        try {
            await apiClient.delete(`/branches/${id}`);
            return true;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);            
        }
    }
};