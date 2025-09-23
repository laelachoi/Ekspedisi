// Global API types and interfaces

export interface ApiError {
	message: string;
	statusCode?: number;
}

export interface ApiResponse<T> {
	message: string;
	data: T;
}

export interface PaginatedResponse<T> {
	message: string;
	data: T[];
	meta: {
		current_page: number;
		per_page: number;
		total: number;
		total_pages: number;
	};
}

// Re-export all types
export * from "./auth";
export * from "./branch";
export * from "./user-address";
export * from "./profile";
export * from "./employee";
export * from "./role";
export * from "./shipment-branch";
export * from "./webhooks";

// Re-export shipment types (excluding conflicting User type)
export type {
	ShipmentStatus,
	PaymentStatus,
	ShippingType,
	Shipment,
	CreateShipmentRequest,
	UpdateShipmentRequest,
	ShipmentResponse,
	ShipmentDetailResponse,
	PayShipmentRequest,
	PayShipmentResponse,
} from "./shipment";
