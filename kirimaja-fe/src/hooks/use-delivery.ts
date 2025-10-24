import { deliveryService } from "@/lib/api/services/delivery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys
export const deliveryKeys = {
    all: ["delivery"] as const,
    lists: () => [...deliveryKeys.all, "list"] as const,
    details: () => [...deliveryKeys.all, "detail"] as const,
    detail: (id: number) => [...deliveryKeys.details(), id] as const,
};

// Get all courier shipments
export const useCourierShipments = () => {
    return useQuery({
        queryKey: deliveryKeys.lists(),
        queryFn: deliveryService.getCourierShipments,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Pick shipment 
export const usePickShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (trackingNumber: string) => 
            deliveryService.pickShipment(trackingNumber),
        onSuccess: () => {
            toast.success("Pengiriman berhasil diambil");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

// Pickup shipment with photo
export const usePickupShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ 
            trackingNumber, 
            photo, 
        }: { 
            trackingNumber: string; 
            photo: File; 
        }) => deliveryService.pickupShipment(trackingNumber, photo),
        onSuccess: () => {
            toast.success("Pengiriman berhasil diambil dengan bukti foto");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

// Deliver shipment to branch
export const useDeliverToBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (trackingNumber: string) => 
            deliveryService.deliverToBranch(trackingNumber),
        onSuccess: () => {
            toast.success("Pengiriman berhasil dikirim ke cabang");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

// Pick shipment from branch
export const usePickFromBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (trackingNumber: string) => 
            deliveryService.pickFromBranch(trackingNumber),
        onSuccess: () => {
            toast.success("Pengiriman berhasil diambil dari cabang");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

// Pickup shipment from branch
export const usePickupFromBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (trackingNumber: string) => 
            deliveryService.pickupFromBranch(trackingNumber),
        onSuccess: () => {
            toast.success("Pengiriman berhasil diambil dari cabang");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};

// Deliver shipment to customer
export const useDeliverToCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ 
            trackingNumber, 
            photo,
        }: { 
            trackingNumber: string; 
            photo: File; 
        }) => deliveryService.deliverToCustomer(trackingNumber, photo),
        onSuccess: () => {
            toast.success("Pengiriman berhasil diserahkan ke pelanggan");
            queryClient.invalidateQueries({ queryKey: deliveryKeys.lists() });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};
