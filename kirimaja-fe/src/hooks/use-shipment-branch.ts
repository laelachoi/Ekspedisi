import type { ScanShipmentRequest } from "@/lib/api";
import { shipmentBranchService } from "@/lib/api/services/shipment-branch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const shipmentBranchKeys = {
    all: ["shipment-branch"] as const,
    lists: () => [...shipmentBranchKeys.all, "list"] as const,
    list: (filters: string) => [...shipmentBranchKeys.lists(), { filters }] as const,
    details: () => [...shipmentBranchKeys.all, "detail"] as const,
    detail: (id: number) => [...shipmentBranchKeys.details(), id] as const,
};

// Get all shipment branch logs
export const useShipmentBranchLogs = () => {
    return useQuery({
        queryKey: shipmentBranchKeys.lists(),
        queryFn: shipmentBranchService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Scan package
export const useScanShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ScanShipmentRequest) =>
            shipmentBranchService.scan(data),
        onSuccess: () => {
            toast.success("Paket berhasil di-scan");
            queryClient.invalidateQueries({
                queryKey: shipmentBranchKeys.lists(),
            });
        },
    });
};

    