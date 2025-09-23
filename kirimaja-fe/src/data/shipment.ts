import type { Shipment } from "@/lib/api/types/shipment";
import { PaymentStatus, ShipmentStatus } from "@/lib/api/types/shipment";

export const mockShipments: Shipment[] = [
	{
		id: 1,
		payment_status: PaymentStatus.PAID,
		delivery_status: ShipmentStatus.DELIVERED,
		tracking_number: "KA240601001",
		qr_code_image: "/images/qr/qr-001.png",
		price: 25000,
		distance: 5.2,
		created_at: "2024-06-01T08:30:00Z",
		updated_at: "2024-06-01T14:30:00Z",
		shipment_detail: {
			id: 1,
			shipment_id: 1,
			user_id: 1,
			pickup_address_id: 1,
			weight: 2.5,
			delivery_type: "REGULAR",
			destination_address: "Jl. Sudirman No. 25, Jakarta Pusat",
			destination_latitude: -6.2088,
			destination_longitude: 106.8456,
			package_type: "Dokumen",
			pickup_proof: "/images/proof/pickup-001.jpg",
			receipt_proof: "/images/proof/receipt-001.jpg",
			recipient_name: "Ahmad Rizki",
			recipient_phone: "081234567890",
			base_price: 15000,
			weight_price: 5000,
			distance_price: 5000,
			created_at: "2024-06-01T08:30:00Z",
			updated_at: "2024-06-01T14:30:00Z",
			user: {
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				phone_number: "081234567890",
			},
			address: {
				id: 1,
				user_id: 1,
				address:
					"Jl. Pahlawan No. 10, RT 002/RW 003, Kelurahan Kebayoran Baru, Jakarta Selatan",
				tag: "Rumah berwarna putih dengan pagar hitam, dekat warung sate",
				label: "Rumah",
				photo: "/images/addresses/home-1.jpg",
				latitude: -6.225014,
				longitude: 106.801529,
				created_at: "2024-05-15T08:30:00Z",
				updated_at: "2024-05-15T08:30:00Z",
			},
		},
		pickup_address: {
			id: 1,
			user_id: 1,
			address:
				"Jl. Pahlawan No. 10, RT 002/RW 003, Kelurahan Kebayoran Baru, Jakarta Selatan",
			tag: "Rumah berwarna putih dengan pagar hitam, dekat warung sate",
			label: "Rumah",
			photo: "/images/addresses/home-1.jpg",
			latitude: -6.225014,
			longitude: 106.801529,
			created_at: "2024-05-15T08:30:00Z",
			updated_at: "2024-05-15T08:30:00Z",
		},
		user: {
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			phone_number: "081234567890",
		},
		payment: {
			id: 1,
			shipment_id: 1,
			external_id: "EXT001",
			invoice_id: "INV001",
			payment_method: "DANA",
			status: "PAID",
			invoice_url: "https://checkout.xendit.co/web/659bc",
			expiry_date: "2024-06-01T23:59:59Z",
			created_at: "2024-06-01T08:30:00Z",
			updated_at: "2024-06-01T09:00:00Z",
		},
	},
	{
		id: 2,
		payment_status: PaymentStatus.PAID,
		delivery_status: ShipmentStatus.IN_TRANSIT,
		tracking_number: "KA240602002",
		qr_code_image: "/images/qr/qr-002.png",
		price: 45000,
		distance: 12.8,
		created_at: "2024-06-02T10:15:00Z",
		updated_at: "2024-06-02T15:20:00Z",
		shipment_detail: {
			id: 2,
			shipment_id: 2,
			user_id: 2,
			pickup_address_id: 2,
			weight: 5.0,
			delivery_type: "SAMEDAY",
			destination_address: "Jl. Gatot Subroto No. 100, Jakarta Selatan",
			destination_latitude: -6.2297,
			destination_longitude: 106.8261,
			package_type: "Elektronik",
			pickup_proof: "/images/proof/pickup-002.jpg",
			receipt_proof: null,
			recipient_name: "Siti Nurhaliza",
			recipient_phone: "081987654321",
			base_price: 20000,
			weight_price: 15000,
			distance_price: 10000,
			created_at: "2024-06-02T10:15:00Z",
			updated_at: "2024-06-02T15:20:00Z",
			user: {
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				phone_number: "081987654321",
			},
			address: {
				id: 2,
				user_id: 2,
				address:
					"Jl. Merdeka No. 45, RT 001/RW 002, Menteng, Jakarta Pusat",
				tag: "Gedung tinggi warna cream, lobby di lantai dasar",
				label: "Kantor",
				photo: "/images/addresses/office-1.jpg",
				latitude: -6.1944,
				longitude: 106.8229,
				created_at: "2024-05-16T09:00:00Z",
				updated_at: "2024-05-16T09:00:00Z",
			},
		},
		pickup_address: {
			id: 2,
			user_id: 2,
			address:
				"Jl. Merdeka No. 45, RT 001/RW 002, Menteng, Jakarta Pusat",
			tag: "Gedung tinggi warna cream, lobby di lantai dasar",
			label: "Kantor",
			photo: "/images/addresses/office-1.jpg",
			latitude: -6.1944,
			longitude: 106.8229,
			created_at: "2024-05-16T09:00:00Z",
			updated_at: "2024-05-16T09:00:00Z",
		},
		user: {
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			phone_number: "081987654321",
		},
		payment: {
			id: 2,
			shipment_id: 2,
			external_id: "EXT002",
			invoice_id: "INV002",
			payment_method: "OVO",
			status: "PAID",
			invoice_url: "https://checkout.xendit.co/web/659bd",
			expiry_date: "2024-06-02T23:59:59Z",
			created_at: "2024-06-02T10:15:00Z",
			updated_at: "2024-06-02T10:45:00Z",
		},
	},
	{
		id: 3,
		payment_status: PaymentStatus.PENDING,
		delivery_status: ShipmentStatus.WAITING_PICKUP,
		tracking_number: "KA240603003",
		qr_code_image: "/images/qr/qr-003.png",
		price: 35000,
		distance: 8.5,
		created_at: "2024-06-03T14:20:00Z",
		updated_at: "2024-06-03T14:20:00Z",
		shipment_detail: {
			id: 3,
			shipment_id: 3,
			user_id: 1,
			pickup_address_id: 3,
			weight: 3.2,
			delivery_type: "NEXTDAY",
			destination_address: "Jl. Kuningan Raya No. 52, Jakarta Selatan",
			destination_latitude: -6.2383,
			destination_longitude: 106.8317,
			package_type: "Makanan",
			pickup_proof: null,
			receipt_proof: null,
			recipient_name: "Budi Santoso",
			recipient_phone: "081567890123",
			base_price: 18000,
			weight_price: 8000,
			distance_price: 9000,
			created_at: "2024-06-03T14:20:00Z",
			updated_at: "2024-06-03T14:20:00Z",
			user: {
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				phone_number: "081234567890",
			},
			address: {
				id: 3,
				user_id: 1,
				address:
					"Jl. Kemang Raya No. 88, RT 005/RW 001, Kemang, Jakarta Selatan",
				tag: "Cafe dengan papan nama hijau, sebelah toko bunga",
				label: "Cafe",
				photo: "/images/addresses/cafe-1.jpg",
				latitude: -6.2615,
				longitude: 106.8149,
				created_at: "2024-05-17T11:30:00Z",
				updated_at: "2024-05-17T11:30:00Z",
			},
		},
		pickup_address: {
			id: 3,
			user_id: 1,
			address:
				"Jl. Kemang Raya No. 88, RT 005/RW 001, Kemang, Jakarta Selatan",
			tag: "Cafe dengan papan nama hijau, sebelah toko bunga",
			label: "Cafe",
			photo: "/images/addresses/cafe-1.jpg",
			latitude: -6.2615,
			longitude: 106.8149,
			created_at: "2024-05-17T11:30:00Z",
			updated_at: "2024-05-17T11:30:00Z",
		},
		user: {
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			phone_number: "081234567890",
		},
		payment: {
			id: 3,
			shipment_id: 3,
			external_id: "EXT003",
			invoice_id: "INV003",
			payment_method: null,
			status: "PENDING",
			invoice_url: "https://checkout.xendit.co/web/659be",
			expiry_date: "2024-06-03T23:59:59Z",
			created_at: "2024-06-03T14:20:00Z",
			updated_at: "2024-06-03T14:20:00Z",
		},
	},
	{
		id: 4,
		payment_status: PaymentStatus.PAID,
		delivery_status: ShipmentStatus.PICKED_UP,
		tracking_number: "KA240604004",
		qr_code_image: "/images/qr/qr-004.png",
		price: 55000,
		distance: 15.3,
		created_at: "2024-06-04T09:45:00Z",
		updated_at: "2024-06-04T11:30:00Z",
		shipment_detail: {
			id: 4,
			shipment_id: 4,
			user_id: 3,
			pickup_address_id: 4,
			weight: 7.8,
			delivery_type: "REGULAR",
			destination_address: "Jl. Thamrin No. 1, Jakarta Pusat",
			destination_latitude: -6.1944,
			destination_longitude: 106.8229,
			package_type: "Pakaian",
			pickup_proof: "/images/proof/pickup-004.jpg",
			receipt_proof: null,
			recipient_name: "Maya Sari",
			recipient_phone: "081345678901",
			base_price: 25000,
			weight_price: 20000,
			distance_price: 10000,
			created_at: "2024-06-04T09:45:00Z",
			updated_at: "2024-06-04T11:30:00Z",
			user: {
				id: 3,
				name: "Michael Johnson",
				email: "michael@example.com",
				phone_number: "081345678901",
			},
			address: {
				id: 4,
				user_id: 3,
				address:
					"Jl. Senopati No. 12, RT 003/RW 004, Kebayoran Baru, Jakarta Selatan",
				tag: "Ruko 2 lantai warna biru, ada spanduk promo",
				label: "Toko",
				photo: "/images/addresses/shop-1.jpg",
				latitude: -6.2355,
				longitude: 106.8071,
				created_at: "2024-05-18T13:15:00Z",
				updated_at: "2024-05-18T13:15:00Z",
			},
		},
		pickup_address: {
			id: 4,
			user_id: 3,
			address:
				"Jl. Senopati No. 12, RT 003/RW 004, Kebayoran Baru, Jakarta Selatan",
			tag: "Ruko 2 lantai warna biru, ada spanduk promo",
			label: "Toko",
			photo: "/images/addresses/shop-1.jpg",
			latitude: -6.2355,
			longitude: 106.8071,
			created_at: "2024-05-18T13:15:00Z",
			updated_at: "2024-05-18T13:15:00Z",
		},
		user: {
			id: 3,
			name: "Michael Johnson",
			email: "michael@example.com",
			phone_number: "081345678901",
		},
		payment: {
			id: 4,
			shipment_id: 4,
			external_id: "EXT004",
			invoice_id: "INV004",
			payment_method: "GOPAY",
			status: "PAID",
			invoice_url: "https://checkout.xendit.co/web/659bf",
			expiry_date: "2024-06-04T23:59:59Z",
			created_at: "2024-06-04T09:45:00Z",
			updated_at: "2024-06-04T10:15:00Z",
		},
	},
	{
		id: 5,
		payment_status: PaymentStatus.FAILED,
		delivery_status: null,
		tracking_number: "KA240605005",
		qr_code_image: "/images/qr/qr-005.png",
		price: 28000,
		distance: 6.7,
		created_at: "2024-06-05T16:00:00Z",
		updated_at: "2024-06-05T16:30:00Z",
		shipment_detail: {
			id: 5,
			shipment_id: 5,
			user_id: 2,
			pickup_address_id: 5,
			weight: 2.1,
			delivery_type: "INSTANT",
			destination_address: "Jl. Ampera Raya No. 33, Jakarta Selatan",
			destination_latitude: -6.2648,
			destination_longitude: 106.789,
			package_type: "Dokumen",
			pickup_proof: null,
			receipt_proof: null,
			recipient_name: "Andi Wijaya",
			recipient_phone: "081765432109",
			base_price: 16000,
			weight_price: 4000,
			distance_price: 8000,
			created_at: "2024-06-05T16:00:00Z",
			updated_at: "2024-06-05T16:30:00Z",
			user: {
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				phone_number: "081987654321",
			},
			address: {
				id: 5,
				user_id: 2,
				address:
					"Jl. Fatmawati No. 77, RT 007/RW 002, Cilandak, Jakarta Selatan",
				tag: "Rumah kontrakan 2 lantai, cat hijau muda",
				label: "Kontrakan",
				photo: "/images/addresses/rental-1.jpg",
				latitude: -6.2897,
				longitude: 106.7918,
				created_at: "2024-05-19T15:45:00Z",
				updated_at: "2024-05-19T15:45:00Z",
			},
		},
		pickup_address: {
			id: 5,
			user_id: 2,
			address:
				"Jl. Fatmawati No. 77, RT 007/RW 002, Cilandak, Jakarta Selatan",
			tag: "Rumah kontrakan 2 lantai, cat hijau muda",
			label: "Kontrakan",
			photo: "/images/addresses/rental-1.jpg",
			latitude: -6.2897,
			longitude: 106.7918,
			created_at: "2024-05-19T15:45:00Z",
			updated_at: "2024-05-19T15:45:00Z",
		},
		user: {
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			phone_number: "081987654321",
		},
		payment: {
			id: 5,
			shipment_id: 5,
			external_id: "EXT005",
			invoice_id: "INV005",
			payment_method: "BANK_TRANSFER",
			status: "FAILED",
			invoice_url: "https://checkout.xendit.co/web/659bg",
			expiry_date: "2024-06-05T23:59:59Z",
			created_at: "2024-06-05T16:00:00Z",
			updated_at: "2024-06-05T16:30:00Z",
		},
	},
];

// Mock service functions
export const mockShipmentService = {
	getAll: async (): Promise<Shipment[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return mockShipments;
	},

	getById: async (id: number): Promise<Shipment | null> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));
		return mockShipments.find((shipment) => shipment.id === id) || null;
	},

	getByTrackingNumber: async (
		trackingNumber: string
	): Promise<Shipment | null> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));
		return (
			mockShipments.find(
				(shipment) => shipment.tracking_number === trackingNumber
			) || null
		);
	},

	search: async (query: string): Promise<Shipment[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 400));

		const lowerQuery = query.toLowerCase();
		return mockShipments.filter(
			(shipment) =>
				shipment.tracking_number?.toLowerCase().includes(lowerQuery) ||
				shipment.shipment_detail.package_type
					.toLowerCase()
					.includes(lowerQuery) ||
				shipment.pickup_address?.address
					.toLowerCase()
					.includes(lowerQuery) ||
				shipment.shipment_detail.destination_address
					.toLowerCase()
					.includes(lowerQuery) ||
				shipment.shipment_detail.recipient_name
					.toLowerCase()
					.includes(lowerQuery)
		);
	},
};
