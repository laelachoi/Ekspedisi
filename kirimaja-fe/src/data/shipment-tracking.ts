import { deliveries } from "./deliveries";
import type { Shipment } from "@/lib/api/types/shipment";
import {
	ShipmentStatus,
	PaymentStatus,
	ShippingType,
} from "@/lib/api/types/shipment";

// Mock data for shipments based on the deliveries data
export const mockShipments: Shipment[] = deliveries.map((delivery, index) => {
	const id = index + 1;

	// Map delivery status to shipment status
	let deliveryStatus: string;
	switch (delivery.status) {
		case "waiting pickup":
			deliveryStatus = ShipmentStatus.WAITING_PICKUP;
			break;
		case "picked up":
			deliveryStatus = ShipmentStatus.PICKED_UP;
			break;
		case "in transit":
			deliveryStatus = ShipmentStatus.IN_TRANSIT;
			break;
		case "delivered":
			deliveryStatus = ShipmentStatus.DELIVERED;
			break;
		case "failed":
			deliveryStatus = "FAILED";
			break;
		default:
			deliveryStatus = ShipmentStatus.WAITING_PICKUP;
	}

	// Generate delivery history
	const shipmentHistory = [];

	// Always add the initial status
	shipmentHistory.push({
		id: id * 100 + 1,
		shipment_id: id,
		user_id: 1,
		branch_id: 1,
		status: ShipmentStatus.READY_TO_PICKUP,
		description: "Paket siap untuk dijemput",
		created_at: new Date(delivery.pickupDate).toISOString(),
		updated_at: new Date(delivery.pickupDate).toISOString(),
	});

	// Add waiting pickup if status is beyond waiting
	if (delivery.status !== "waiting pickup") {
		shipmentHistory.push({
			id: id * 100 + 2,
			shipment_id: id,
			user_id: 1,
			branch_id: 1,
			status: ShipmentStatus.WAITING_PICKUP,
			description: "Kurir sedang dalam perjalanan untuk menjemput paket",
			created_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 30
			).toISOString(), // 30 minutes later
			updated_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 30
			).toISOString(),
		});
	}

	// Add picked up if status is beyond picked up
	if (
		delivery.status !== "waiting pickup" &&
		delivery.status !== "picked up"
	) {
		shipmentHistory.push({
			id: id * 100 + 3,
			shipment_id: id,
			user_id: 1,
			branch_id: 1,
			status: ShipmentStatus.PICKED_UP,
			description: "Paket telah dijemput oleh kurir",
			created_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60
			).toISOString(), // 1 hour later
			updated_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60
			).toISOString(),
		});
	}

	// Add in transit if status is in transit or beyond
	if (delivery.status === "in transit" || delivery.status === "delivered") {
		shipmentHistory.push({
			id: id * 100 + 4,
			shipment_id: id,
			user_id: 1,
			branch_id: 1,
			status: ShipmentStatus.IN_TRANSIT,
			description: "Paket dalam perjalanan menuju tujuan",
			created_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60 * 3
			).toISOString(), // 3 hours later
			updated_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60 * 3
			).toISOString(),
		});
	}

	// Add delivered status if applicable
	if (delivery.status === "delivered") {
		shipmentHistory.push({
			id: id * 100 + 5,
			shipment_id: id,
			user_id: 1,
			branch_id: 1,
			status: ShipmentStatus.DELIVERED,
			description: "Paket telah diterima oleh penerima",
			created_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60 * 24
			).toISOString(), // 24 hours later
			updated_at: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60 * 24
			).toISOString(),
		});
	}

	return {
		id,
		payment_status: PaymentStatus.PAID,
		delivery_status: deliveryStatus,
		tracking_number: delivery.resi,
		qr_code_image: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${delivery.resi}`,
		price: (delivery.weight || 1) * 10000 + 15000, // Base price + weight price
		distance: Math.floor(Math.random() * 20) + 1, // Random distance between 1-20 km
		created_at: new Date(delivery.pickupDate).toISOString(),
		updated_at: new Date(delivery.pickupDate).toISOString(),
		shipment_detail: {
			id: id,
			shipment_id: id,
			user_id: 1, // Mock user ID
			pickup_address_id: 1, // Mock address ID
			weight: delivery.weight || 1,
			delivery_type: delivery.delivery_type || ShippingType.REGULAR,
			destination_address: delivery.destinationAddr,
			destination_latitude: -6.2 + Math.random() * 0.1, // Random coordinates around Jakarta
			destination_longitude: 106.8 + Math.random() * 0.1,
			package_type: delivery.product,
			pickup_proof: null,
			receipt_proof: null,
			recipient_name: "Penerima " + id,
			recipient_phone: "08" + Math.floor(Math.random() * 100000000),
			base_price: 15000,
			weight_price: (delivery.weight || 1) * 10000,
			distance_price: (Math.floor(Math.random() * 20) + 1) * 1000,
			created_at: new Date(delivery.pickupDate).toISOString(),
			updated_at: new Date(delivery.pickupDate).toISOString(),
			user: {
				id: 1,
				name: "Pengirim " + id,
				email: "user" + id + "@example.com",
				phone_number: "08" + Math.floor(Math.random() * 100000000),
			},
			address: {
				id: 1,
				user_id: 1,
				address: delivery.pickupAddr,
				tag: "Rumah",
				label: "Alamat " + id,
				photo: "", // No photo for mock
				latitude: -6.2 + Math.random() * 0.1, // Random coordinates around Jakarta
				longitude: 106.8 + Math.random() * 0.1,
				created_at: new Date(delivery.pickupDate).toISOString(),
				updated_at: new Date(delivery.pickupDate).toISOString(),
				user: {
					id: 1,
					name: "Pengirim " + id,
					email: "user" + id + "@example.com",
					phone_number: "08" + Math.floor(Math.random() * 100000000),
				},
			},
		},
		shipment_history: shipmentHistory,
		payment: {
			id,
			shipment_id: id,
			external_id: "ext-" + delivery.resi,
			invoice_id: "inv-" + delivery.resi,
			payment_method: "bank_transfer",
			status: "PAID",
			invoice_url: "https://example.com/invoice",
			expiry_date: new Date(
				new Date(delivery.pickupDate).getTime() + 1000 * 60 * 60 * 24
			).toISOString(), // 24 hours later
			created_at: new Date(delivery.pickupDate).toISOString(),
			updated_at: new Date(delivery.pickupDate).toISOString(),
		},
	};
});
