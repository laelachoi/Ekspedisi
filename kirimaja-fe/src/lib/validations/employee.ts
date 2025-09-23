import { z } from "zod";

// Base employee schema
export const employeeBaseSchema = z.object({
	name: z
		.string()
		.min(2, "Nama minimal 2 karakter")
		.max(100, "Nama maksimal 100 karakter"),
	email: z.string().email("Email harus valid"),
	phone_number: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
	address: z.string().min(5, "Alamat minimal 5 karakter"),
	type: z.enum(["courier", "admin"], {
		required_error: "Pilih tipe karyawan",
	}),
	branch_id: z.coerce.number().min(1, "Pilih cabang"),
});

// Schema for creating employee (includes password)
export const createEmployeeSchema = employeeBaseSchema.extend({
	password: z.string().min(6, "Password minimal 6 karakter"),
});

// Schema for updating employee (optional fields)
export const updateEmployeeSchema = employeeBaseSchema.extend({
	type: z
		.enum(["courier", "admin"], {
			required_error: "Pilih tipe karyawan",
		})
		.optional(),
	branch_id: z.coerce.number().min(1, "Pilih cabang").optional(),
	password: z
		.string()
		.min(6, "Password minimal 6 karakter")
		.optional()
		.or(z.literal("")),
});

// Type exports
export type EmployeeBaseFormData = z.infer<typeof employeeBaseSchema>;
export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;
