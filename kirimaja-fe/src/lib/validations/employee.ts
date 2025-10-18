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
	type: z.enum(["courier", "admin"], {
		required_error: "Pilih tipe karyawan",
	}),
	branch_id: z.coerce.number().min(1, "Pilih cabang"),
});

// Validation schema for creating employee
export const createEmployeeSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	name: z
		.string()
		.min(2, "Name must be at least 2 character")
		.max(100, "Name must be less than 100 character"),
	phone_number: z
		.string()
		.min(10, "Phone number must be at least 10 character")
		.max(15, "Phone number must be less than 15 character"),
	type: z.enum(['courier', "admin"], {
		required_error: "Employee type is required",
		invalid_type_error: "Employee type must be courier or admin",
	}),
	role_id: z.coerce.number().min(1, "Role is required"),
	branch_id: z.coerce.number().min(1, "Branch is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 character")
		.max(50, "Password must be less than 50 character"),		
})

// Validation schema for updating employee
export const updateEmployeeSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.optional(),
	name: z
		.string()
		.min(2, "Name must be at least 2 character")
		.max(100, "Name must be less than 100 character")
		.optional(),
	phone_number: z
		.string()
		.min(10, "Phone number must be at least 10 character")
		.max(15, "Phone number must be less than 15 character")
		.optional(),
	type: z
		.enum(['courier', "admin"], {
			invalid_type_error: "Employee type must be courier or admin",
		})
		.optional(),
	role_id: z.coerce.number().min(1, "Role is required").optional(),
	branch_id: z.coerce.number().min(1, "Branch is required").optional(),
	password: z
		.string()
		.min(8, "Password must be at least 8 character")
		.max(50, "Password must be less than 50 character")
		.optional()
		.or(z.literal("")), 
});

// Validation schema for employee branch assigment
export const createEmployeeBranchSchema = z.object({
	user_id: z.number().min(1, "User is required"),
	branch_id: z.number().min(1, "Branch is required"),
});

// Type exports
export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;
export type CreateEmployeeBranchFormData = z.infer<typeof createEmployeeBranchSchema>;
