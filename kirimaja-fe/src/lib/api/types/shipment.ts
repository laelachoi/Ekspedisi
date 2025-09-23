// Shipment Types and Interfaces

export const ShipmentStatus = {
	READY_TO_PICKUP: "READY_TO_PICKUP",
	WAITING_PICKUP: "WAITING_PICKUP",
	PICKED_UP: "PICKED_UP",
	IN_TRANSIT: "IN_TRANSIT",
	ARRIVED_AT_BRANCH: "ARRIVED_AT_BRANCH",
	AT_BRANCH: "AT_BRANCH",
	DEPARTED_FROM_BRANCH: "DEPARTED_FROM_BRANCH",
	DELIVERED: "DELIVERED",
	COMPLETED: "COMPLETED",
	ON_THE_WAY: "ON_THE_WAY",
	ON_THE_WAY_TO_ADDRESS: "ON_THE_WAY_TO_ADDRESS",
	READY_TO_DELIVER: "READY_TO_DELIVER",
	READY_TO_PICKUP_AT_BRANCH: "READY_TO_PICKUP_AT_BRANCH",
} as const;

export const PaymentStatus = {
	PENDING: "PENDING",
	PAID: "PAID",
	FAILED: "FAILED",
} as const;

export const ShippingType = {
	REGULAR: "REGULAR",
	SAMEDAY: "SAMEDAY",
	NEXTDAY: "NEXTDAY",
	INSTANT: "INSTANT",
} as const;

export type ShipmentStatusType =
	(typeof ShipmentStatus)[keyof typeof ShipmentStatus];
export type PaymentStatusType =
	(typeof PaymentStatus)[keyof typeof PaymentStatus];
export type ShippingType = (typeof ShippingType)[keyof typeof ShippingType];

interface User {
	id: number;
	name: string;
	email: string;
	phone_number?: string;
}

interface UserAddress {
	id: number;
	user_id: number;
	address: string;
	tag: string;
	label: string;
	photo: string;
	latitude: number;
	longitude: number;
	created_at: string;
	updated_at: string;
	user?: User;
}

export interface Shipment {
	id: number;
	payment_status: PaymentStatusType;
	delivery_status: string | null;
	tracking_number: string | null;
	qr_code_image: string | null;
	price: number;
	distance: number;
	created_at: string;
	updated_at: string;
	shipment_detail: {
		id: number;
		shipment_id: number;
		user_id: number;
		pickup_address_id: number;
		weight: number;
		delivery_type: string;
		destination_address: string;
		destination_latitude: number;
		destination_longitude: number;
		package_type: string;
		pickup_proof: string | null;
		receipt_proof: string | null;
		recipient_name: string;
		recipient_phone: string;
		base_price: number;
		weight_price: number;
		distance_price: number;
		created_at: string;
		updated_at: string;
		user: User;
		address: UserAddress;
	};
	shipment_history?: {
		id: number;
		shipment_id: number;
		user_id: number | null;
		branch_id: number | null;
		status: string;
		description: string;
		created_at: string;
		updated_at: string;
	}[];
	payment?: {
		id: number;
		shipment_id: number;
		external_id: string;
		invoice_id: string;
		payment_method: string | null;
		status: string;
		invoice_url: string;
		expiry_date: string;
		created_at: string;
		updated_at: string;
	};
	pickup_address?: UserAddress;
	user?: User;
}

export interface CreateShipmentRequest {
	pickup_address_id: number;
	destination_address: string;
	recipient_name: string;
	recipient_phone: string;
	package_type: string;
	weight: number;
	delivery_type: string;
	destination_latitude?: number;
	destination_longitude?: number;
}

export interface UpdateShipmentRequest {
	pickup_address_id?: number;
	delivery_address?: string;
	sender_name?: string;
	sender_phone?: string;
	receiver_name?: string;
	receiver_phone?: string;
	package_type?: string;
	total_weight?: number;
	shipping_type?: ShippingType;
	shipment_status?: ShipmentStatusType;
	payment_status?: PaymentStatusType;
}

export interface ShipmentResponse {
	data: Shipment[];
	message: string;
	success: boolean;
}

export interface ShipmentDetailResponse {
	data: Shipment;
	message: string;
	success: boolean;
}

export interface PayShipmentRequest {
	payment_method?: string;
}

export interface PayShipmentResponse {
	data: {
		shipment: Shipment;
		invoice_url: string;
	};
	message: string;
	success: boolean;
}
