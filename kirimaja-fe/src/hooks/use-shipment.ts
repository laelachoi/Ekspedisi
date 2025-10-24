import type { CreateShipmentRequest } from "@/lib/api";
import { shipmentService } from "@/lib/api/services/shipment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const shipmentKeys = {
    all: ["shipments"] as const,
    lists: () => [...shipmentKeys.all, "list"] as const,
    list: (filters: string) => [...shipmentKeys.lists(), { filters }] as const,
    details: () => [...shipmentKeys.all, "detail"] as const,
    detail: (id: number) => [...shipmentKeys.details(), id] as const,
};

// Get all shipments
export const useShipments = () => {
    return useQuery({
        queryKey: shipmentKeys.lists(),
        queryFn: shipmentService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get shipment by ID
export const useShipment = (id: number) => {
    return useQuery({
        queryKey: shipmentKeys.detail(id),
        queryFn: () => shipmentService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create shipment
export const useCreateShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateShipmentRequest) => shipmentService.create(data),
        onSuccess: () => {
            toast.success("Pengiriman berhasil dibuat");
            queryClient.invalidateQueries({ queryKey: shipmentKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

    