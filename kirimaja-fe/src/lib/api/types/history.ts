import type { Shipment } from "./shipment";

export interface HistoryResponse {
    message: string;
    data: Shipment[];
}

export interface SingleHistoryResponse {
    message: string;
    data: Shipment;
}