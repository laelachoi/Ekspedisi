import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { Role, RoleResponse, SingleRoleResponse, UpdateRolePermissionsRequest } from "../types";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";

export const roleService = {
    async getRoles(): Promise<Role[]> {
        try {
            const response = await apiClient.get<RoleResponse> ("/roles");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    async getRoleById(id: number): Promise<Role> {
        try {
            const response = await apiClient.get<SingleRoleResponse> (`/roles/${id}`);
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);      
        }
    },

    async updateRole(id: number, data: UpdateRolePermissionsRequest): Promise<Role> {
        try {
            const response = await apiClient.patch<SingleRoleResponse> (
                `/roles/${id}`, 
                data
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },
};
