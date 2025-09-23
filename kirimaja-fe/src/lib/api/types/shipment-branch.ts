// Shipment Branch Types and Interfaces

export interface ScanShipmentRequest {
	tracking_number: string;
	type: "IN" | "OUT";
	is_ready_to_pickup?: boolean;
}

export interface ShipmentBranchLog {
	id: number;
	tracking_number: string;
	type: "IN" | "OUT";
	branch_id: number;
	user_id: number;
	is_ready_to_pickup: boolean;
	created_at: string;
}

export interface ScanShipmentResponse {
	message: string;
	data: ShipmentBranchLog;
}

export interface ShipmentBranchLogsResponse {
	message: string;
	data: ShipmentBranchLog[];
}
