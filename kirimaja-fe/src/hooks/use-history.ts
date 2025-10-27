import { historyService } from "@/lib/api/services/history";
import { useQuery } from "@tanstack/react-query";

// Query keys
export const historyKeys = {
    all: ["history"] as const,
    lists: () => [...historyKeys.all, "list"] as const,
    list: (filters: string) => [...historyKeys.lists(), { filters }] as const,
    details: () => [...historyKeys.all, "detail"] as const,
    detail: (id: number) => [...historyKeys.details(), id] as const,
};

// Get all history
export const useHistory = () => {
    return useQuery({
        queryKey: historyKeys.lists(),
        queryFn: historyService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get history detail by ID (using history API)
export const useHistoryById = (id: number) => {
    return useQuery({
        queryKey: historyKeys.detail(id),
        queryFn: () => historyService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

    