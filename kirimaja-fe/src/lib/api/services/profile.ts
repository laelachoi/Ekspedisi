import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import type { ProfileResponse, UpdateProfileWithAvatarRequest } from "../types/profile";
import type { User } from "../types";


export const profileService = {
    // Get current user profile
    async getProfile(): Promise<User> {
        try {
            const response = await apiClient.get<ProfileResponse> ("/profile");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Update profile with avatar and password (multipart from data)
    async updateProfileWithAvatar(data: UpdateProfileWithAvatarRequest & { password?: string}): Promise<User> {
       try {
            const formData = new FormData();

            if (data.name) formData.append("name", data.name);
            if (data.phone_number) formData.append("phone_number", data.phone_number);
            if (data.avatar) formData.append("avatar", data.avatar);
            if (data.password) formData.append("password", data.password);
        
            const response = await apiClient.patch<ProfileResponse> (
                "/profile",
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
};