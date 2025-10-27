import { handleAxiosError } from "@/lib/utils/error-handler";
import { apiClient } from "../axios";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import type { Shipment } from "../types/shipment";
import type { HistoryResponse, SingleHistoryResponse } from "../types/history";

export const historyService = {
    // Get all history
    async getAll(): Promise<Shipment[]> {
        try {
            const response = await apiClient.get<HistoryResponse> ("/history");
                return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },

    // Get history by ID
    async getById(id: number): Promise<Shipment | null> {
        try {
            const response = await apiClient.get<SingleHistoryResponse> (`/history/${id}`);
            return response.data.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error as AxiosErrorType);
            throw new Error(errorMessage);
        }
    },
};