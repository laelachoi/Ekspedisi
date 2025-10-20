import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import type { CreateUserAddressRequest, SingleUserAddressResponse, UpdateUserAddressRequest, UserAddress, UserAddressResponse } from "../types/user-address";

export const userAddressService = {
    // Get all user addresses
    async getAll(): Promise<UserAddress[]> {
        try {
            const response = await apiClient.get<UserAddressResponse> ("/user-addresses");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Get user address by ID
    async getById(id: number): Promise<UserAddress | null> {
        try {
            const response = await apiClient.get<SingleUserAddressResponse> (`/user-addresses/${id}`);
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Create new user address
    async create(data: CreateUserAddressRequest): Promise<UserAddress> {
        try {
            const formData = new FormData();
            formData.append("address", data.address);
            formData.append("tag", data.tag);
            formData.append("label", data.label);

            if (data.photo) {
                formData.append("photo", data.photo);
            }

            if (data.latitude !== undefined) {
                formData.append("latitude", data.latitude.toString());
            }

            if (data.longitude !== undefined) {
                formData.append("longitude", data.longitude.toString());
            }

            const response = await apiClient.post<SingleUserAddressResponse> (
                "/user-addresses",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Update user address
    async update(id: number, data: UpdateUserAddressRequest): Promise<UserAddress> {
        try {
            const formData = new FormData();

            if (data.address) {
                formData.append("address", data.address);
            }

            if (data.tag) {
                formData.append("tag", data.tag);
            }

            if (data.label) {
                formData.append("label", data.label);
            }

            if (data.photo) {
                formData.append("photo", data.photo);
            }

            if (data.latitude !== undefined) {
                formData.append("latitude", data.latitude.toString());
            }

            if (data.longitude !== undefined) {
                formData.append("longitude", data.longitude.toString());
            }

            const response = await apiClient.patch<SingleUserAddressResponse> (
                `/user-addresses/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Delete user address
    async delete(id: number): Promise<Boolean> {
        try {
            await apiClient.delete(`/user-addresses/${id}`);
            return true;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);            
        }
    }
};