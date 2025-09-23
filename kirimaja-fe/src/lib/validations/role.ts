import { z } from "zod";

// Role update schema
export const updateRoleSchema = z.object({
	permission_ids: z.array(z.number()).min(1, "Pilih minimal 1 permission"),
});

// Type exports
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
