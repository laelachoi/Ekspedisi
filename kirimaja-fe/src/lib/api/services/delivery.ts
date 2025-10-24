import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import type { Shipment, ShipmentDetailResponse, ShipmentResponse } from "../types";

export const deliveryService = {
    // Get all shipments for courier
    async getCourierShipments(): Promise<Shipment[]> {
        try {
            const response = await apiClient.get<ShipmentResponse> (
                "/shipments/courier/list"
            );
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Pick shipment 
    async pickShipment(trackingNumber: string): Promise<Shipment> {
        try {
            const response = await apiClient.get<ShipmentDetailResponse> (
                `/shipments/courier/pick/${trackingNumber}`
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Pickup shipment with photo
    async pickupShipment(
        trackingNumber: string, 
        photo: File
    ): Promise<Shipment> {
        try {
            const formData = new FormData();
            formData.append("photo", photo);

            const response = await apiClient.post<ShipmentDetailResponse> (
                `/shipments/courier/pickup/${trackingNumber}`, 
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

    // Deliver shipment to branch
    async deliverToBranch(trackingNumber: string): Promise<Shipment> {
        try {
            const response = await apiClient.get<ShipmentDetailResponse> (
                `/shipments/courier/deliver-to-branch/${trackingNumber}`
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Pick shipment from branch
    async pickFromBranch(trackingNumber: string): Promise<Shipment> {
        try {
            const response = await apiClient.get<ShipmentDetailResponse> (
                `/shipments/courier/pick-from-branch/${trackingNumber}`
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Pickup shipment from branch
    async pickupFromBranch(trackingNumber: string): Promise<Shipment> {
        try {
            const response = await apiClient.get<ShipmentDetailResponse> (
                `/shipments/courier/pickup-from-branch/${trackingNumber}`
            );
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Deliver shipment to customer
    async deliverToCustomer(
        trackingNumber: string, 
        photo: File
    ): Promise<Shipment> {
        try {
            const formData = new FormData();
            formData.append("photo", photo);

            const response = await apiClient.post<ShipmentDetailResponse> (
                `/shipments/courier/deliver-to-customer/${trackingNumber}`, 
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