import type { UpdateProfileWithAvatarRequest } from "@/lib/api/types/profile";
import { profileService } from "@/lib/api/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const profileKeys = {
    all: ["profile"] as const,
    details: () => [...profileKeys.all, "detail"] as const,
    detail: () => [...profileKeys.details()] as const,
};

// Get current user profile
export const useProfile = () => {
    return useQuery({
        queryKey: profileKeys.detail(),
        queryFn: profileService.getProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Update profile with avatar
export const useUpdateProfileWithAvatar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ( data: UpdateProfileWithAvatarRequest) => 
            profileService.updateProfileWithAvatar(data),
        onSuccess: (updatedProfile) => {
            toast.success("Profile berhasil diperbarui");
            queryClient.setQueryData(profileKeys.detail(), updatedProfile);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

    