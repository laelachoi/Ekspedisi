// Shipment Branch Types and Interfaces

export interface ScanShipmentRequest {
	tracking_number: string;
	type: "IN" | "OUT";
	is_ready_to_pickup?: boolean;
}

export interface ShipmentBranchLog {
	id: number;
	shipment_id: number;
	branch_id: number;
	tracking_number: string;
	type: string; // "IN" | "OUT"
	status: string;
	description: string;
	scanned_by_user_id: number;
	scan_time: string;
	created_at: string;
	updated_at: string;
	shipment: {
		id: number;
		payment_status: string;
		delivery_status: string;
		tracking_number: string;
		qr_code_image: string;
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
		};
	};
	branch: {
		id: number;
		name: string;
		address: string;
		phone_number: string;
		created_at: string;
		updated_at: string;
	};
	scanned_by_user: {
		id: number;
		name: string;
		email: string;
		password: string;
		avatar: string | null;
		phone_number: string;
		role_id: number;
		created_at: string;
		updated_at: string;
	};
}

export interface ScanShipmentResponse {
	message: string;
	data: ShipmentBranchLog;
}

export interface ShipmentBranchLogsResponse {
	message: string;
	data: ShipmentBranchLog[];
}
