import { z } from "zod";

// Branch schema
export const branchSchema = z.object({
	name: z
		.string()
		.min(1, "Nama cabang harus diisi")
		.max(100, "Nama cabang maksimal 100 karakter"),
	address: z
		.string()
		.min(1, "Alamat harus diisi")
		.min(10, "Alamat minimal 10 karakter"),
	phone_number: z
		.string()
		.min(1, "Nomor telepon harus diisi")
		.regex(
			/^(\+62|62|0)8[1-9][0-9]{6,9}$/,
			"Format nomor telepon tidak valid (contoh: 08123456789)"
		),
});

// Type exports
export type BranchFormData = z.infer<typeof branchSchema>;
