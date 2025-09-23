import { z } from "zod";

// Login schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .min(8, "Password minimal 8 karakter"),
});

// Register schema
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Nama minimal 2 karakter")
        .max(100, "Nama maksimal 100 karakter"),
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    phone_number: z
        .string()
        .min(10, "Nomor telepon minimal 10 digit")
        .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .min(8, "Password minimal 8 karakter"),
});


// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
