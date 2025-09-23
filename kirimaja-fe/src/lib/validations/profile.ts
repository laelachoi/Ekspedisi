import { z } from "zod";

// Validation schema for profile form
export const profileSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must not exceed 100 characters"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	phone_number: z
		.string()
		.min(1, "Phone number is required")
		.min(10, "Phone number must be at least 10 digits")
		.max(15, "Phone number must not exceed 15 digits")
		.regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
	password: z
		.string()
		.optional()
		.refine((val) => !val || val.length >= 8, {
			message: "Password must be at least 8 characters",
		}),
});

// Type inference for form data
export type ProfileFormData = z.infer<typeof profileSchema>;

// Validation schema for update request (includes optional avatar)
export const updateProfileSchema = profileSchema.extend({
	avatar: z.instanceof(File).optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
