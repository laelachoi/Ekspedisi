import { shipmentHistoryData } from "@/data/shipment-history";
import { type Shipment } from "@/lib/api/types/shipment";

/**
 * Get history data from dummy data
 * @returns Array of shipment history
 */
export const getHistoryData = (): Shipment[] => {
	return shipmentHistoryData;
};

/**
 * Get history detail by ID from dummy data
 * @param id Shipment ID
 * @returns Shipment detail or null if not found
 */
export const getHistoryById = (id: number): Shipment | null => {
	const shipment = shipmentHistoryData.find((item) => item.id === id);
	return shipment || null;
};
