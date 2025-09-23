import { z } from "zod";

// Shipment delivery form schema
export const deliveryFormSchema = z.object({
	pickupLocationId: z.string().min(1, "Pilih lokasi jemput"),
	deliveryLocation: z
		.string()
		.min(10, "Alamat pengiriman minimal 10 karakter"),
	senderName: z.string().min(2, "Nama pengirim minimal 2 karakter"),
	senderPhone: z.string().regex(/^\d{10,15}$/, "Nomor telepon tidak valid"),
	shippingType: z.enum(["REGULAR", "sameday", "nextday", "instant"]),
	receiverName: z.string().min(2, "Nama penerima minimal 2 karakter"),
	receiverPhone: z.string().regex(/^\d{10,15}$/, "Nomor telepon tidak valid"),
	totalWeight: z.number().min(100, "Berat minimal 100 gram"),
	packageType: z.string().min(1, "Pilih jenis paket"),
});

// Shipment scan form schema
export const scanFormSchema = z.object({
	trackingNumber: z
		.string()
		.min(1, "Nomor resi harus diisi")
		.min(10, "Nomor resi minimal 10 karakter"),
	is_ready_to_pickup: z.boolean(),
});

// Type exports
export type DeliveryFormData = z.infer<typeof deliveryFormSchema>;
export type ScanFormData = z.infer<typeof scanFormSchema>;
