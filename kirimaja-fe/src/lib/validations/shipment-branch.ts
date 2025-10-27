import { z } from "zod";

export const scanShipmentSchema = z.object({
    tracking_number: z.string().min(1, "Nomor tracking harus diisi"),
    type: z.enum(["IN", "OUT"], {
        required_error: "Tipe scan harus dipilih",
    }),
    is_ready_to_pickup: z.boolean().default(false),
});

export type ScanShipmentFormData = z.infer<typeof scanShipmentSchema>;