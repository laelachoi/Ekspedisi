import type { UpdateProfileWithAvatarRequest } from "@/lib/api/types/profile";
import { profileService } from "@/lib/api/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userService } from "@/lib/api/services/auth";
import { useEffect } from "react";

// Query keys
export const profileKeys = {
    all: ["profile"] as const,
    details: () => [...profileKeys.all, "detail"] as const,
    detail: () => [...profileKeys.details()] as const,
};

// Get current user profile
export const useProfile = () => {
    const existingUser = userService.getUser();

    const query = useQuery({
        queryKey: profileKeys.detail(),
        queryFn: profileService.getProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
        initialData: existingUser, 
    });

    useEffect(() => {
        if (query.data) {
        const existingUser = userService.getUser();
        const mergedUser = { ...existingUser, ...query.data };
        userService.setUser(mergedUser);
        }
    }, [query.data]);

    return query;
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
            
            // Gabungkan dengan user lama agar role tidak hilang
            const existingUser = userService.getUser();
            const mergedUser = {
                ...existingUser,
                ...updatedProfile,
            };
            
            // Simpan kembali ke localStorage
            userService.setUser(mergedUser);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

    