import type { Branch } from "@/lib/api/types/branch";

export const branches: Branch[] = [
	{
		id: 1,
		name: "Cabang Jakarta",
		address: "Jl. Sudirman No. 1, Jakarta",
		phone_number: "081234567890",
		created_at: "2024-06-01T09:00:00Z",
		updated_at: "2024-06-01T09:00:00Z",
	},
	{
		id: 2,
		name: "Cabang Bandung",
		address: "Jl. Asia Afrika No. 2, Bandung",
		phone_number: "081298765432",
		created_at: "2024-06-02T10:00:00Z",
		updated_at: "2024-06-02T10:00:00Z",
	},
	{
		id: 3,
		name: "Cabang Surabaya",
		address: "Jl. Basuki Rahmat No. 3, Surabaya",
		phone_number: "081212345678",
		created_at: "2024-06-03T11:00:00Z",
		updated_at: "2024-06-03T11:00:00Z",
	},
	{
		id: 4,
		name: "Cabang Medan",
		address: "Jl. Gatot Subroto No. 4, Medan",
		phone_number: "081223344556",
		created_at: "2024-06-04T12:00:00Z",
		updated_at: "2024-06-04T12:00:00Z",
	},
];

// Legacy export for backward compatibility
export type BranchItem = Branch;

export const mockBranchService = {
	getAll: async (): Promise<Branch[]> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return branches;
	},

	getById: async (id: number): Promise<Branch | null> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return branches.find((branch) => branch.id === id) || null;
	},

	create: async (
		data: Omit<Branch, "id" | "created_at" | "updated_at">
	): Promise<Branch> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const newBranch: Branch = {
			id: Math.max(...branches.map((b) => b.id)) + 1,
			...data,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		branches.push(newBranch);
		return newBranch;
	},

	update: async (
		id: number,
		data: Partial<Omit<Branch, "id" | "created_at" | "updated_at">>
	): Promise<Branch | null> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const index = branches.findIndex((branch) => branch.id === id);
		if (index === -1) return null;

		branches[index] = {
			...branches[index],
			...data,
			updated_at: new Date().toISOString(),
		};
		return branches[index];
	},

	delete: async (id: number): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		const index = branches.findIndex((branch) => branch.id === id);
		if (index === -1) return false;

		branches.splice(index, 1);
		return true;
	},
};
