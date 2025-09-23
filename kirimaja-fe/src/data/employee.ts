import type { User } from "@/lib/api/types/auth";
import type { Branch } from "@/lib/api/types/branch";

export interface EmployeeItem {
	id: number;
	user_id: number;
	branch_id: number;
	type: "courier" | "admin";
	created_at: string;
	updated_at: string;
	user: User;
	branch: Branch;
}

export const employees: EmployeeItem[] = [
	{
		id: 1,
		user_id: 101,
		type: "courier",
		branch_id: 1,
		created_at: "2024-06-01T09:00:00Z",
		updated_at: "2024-06-01T09:00:00Z",
		user: {
			id: 101,
			name: "Ahmad Rizky",
			email: "ahmad.rizky@kirimaja.com",
			phone_number: "081234567890",
			avatar: null,
			created_at: "2024-05-01T08:00:00Z",
			updated_at: "2024-05-01T08:00:00Z",
		},
		branch: {
			id: 1,
			name: "Cabang Jakarta",
			address: "Jl. Sudirman No. 1, Jakarta",
			phone_number: "081234567890",
			created_at: "2024-06-01T09:00:00Z",
			updated_at: "2024-06-01T09:00:00Z",
		},
	},
	{
		id: 2,
		user_id: 102,
		type: "admin",
		branch_id: 2,
		created_at: "2024-06-02T10:00:00Z",
		updated_at: "2024-06-02T10:00:00Z",
		user: {
			id: 102,
			name: "Siti Nurhaliza",
			email: "siti.nurhaliza@kirimaja.com",
			phone_number: "081298765432",
			avatar: null,
			created_at: "2024-05-02T08:00:00Z",
			updated_at: "2024-05-02T08:00:00Z",
		},
		branch: {
			id: 2,
			name: "Cabang Bandung",
			address: "Jl. Asia Afrika No. 2, Bandung",
			phone_number: "081298765432",
			created_at: "2024-06-02T10:00:00Z",
			updated_at: "2024-06-02T10:00:00Z",
		},
	},
	{
		id: 3,
		user_id: 103,
		type: "courier",
		branch_id: 3,
		created_at: "2024-06-03T11:00:00Z",
		updated_at: "2024-06-03T11:00:00Z",
		user: {
			id: 103,
			name: "Budi Santoso",
			email: "budi.santoso@kirimaja.com",
			phone_number: "081212345678",
			avatar: null,
			created_at: "2024-05-03T08:00:00Z",
			updated_at: "2024-05-03T08:00:00Z",
		},
		branch: {
			id: 3,
			name: "Cabang Surabaya",
			address: "Jl. Basuki Rahmat No. 3, Surabaya",
			phone_number: "081212345678",
			created_at: "2024-06-03T11:00:00Z",
			updated_at: "2024-06-03T11:00:00Z",
		},
	},
	{
		id: 4,
		user_id: 104,
		type: "courier",
		branch_id: 1,
		created_at: "2024-06-04T12:00:00Z",
		updated_at: "2024-06-04T12:00:00Z",
		user: {
			id: 104,
			name: "Maya Putri",
			email: "maya.putri@kirimaja.com",
			phone_number: "081223344556",
			avatar: null,
			created_at: "2024-05-04T08:00:00Z",
			updated_at: "2024-05-04T08:00:00Z",
		},
		branch: {
			id: 1,
			name: "Cabang Jakarta",
			address: "Jl. Sudirman No. 1, Jakarta",
			phone_number: "081234567890",
			created_at: "2024-06-01T09:00:00Z",
			updated_at: "2024-06-01T09:00:00Z",
		},
	},
	{
		id: 5,
		user_id: 105,
		type: "admin",
		branch_id: 3,
		created_at: "2024-06-05T13:00:00Z",
		updated_at: "2024-06-05T13:00:00Z",
		user: {
			id: 105,
			name: "Danu Wijaya",
			email: "danu.wijaya@kirimaja.com",
			phone_number: "081298765123",
			avatar: null,
			created_at: "2024-05-05T08:00:00Z",
			updated_at: "2024-05-05T08:00:00Z",
		},
		branch: {
			id: 3,
			name: "Cabang Surabaya",
			address: "Jl. Basuki Rahmat No. 3, Surabaya",
			phone_number: "081212345678",
			created_at: "2024-06-03T11:00:00Z",
			updated_at: "2024-06-03T11:00:00Z",
		},
	},
];

export const mockEmployeeService = {
	getAll: async (): Promise<EmployeeItem[]> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return employees;
	},

	getById: async (id: number): Promise<EmployeeItem | null> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return employees.find((employee) => employee.id === id) || null;
	},

	getByBranchId: async (branchId: number): Promise<EmployeeItem[]> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return employees.filter((employee) => employee.branch_id === branchId);
	},

	create: async (
		data: Omit<
			EmployeeItem,
			"id" | "created_at" | "updated_at" | "user" | "branch"
		>
	): Promise<EmployeeItem> => {
		await new Promise((resolve) => setTimeout(resolve, 600));

		// In real implementation, this would create user and fetch branch data
		const newEmployee: EmployeeItem = {
			id: Math.max(...employees.map((e) => e.id)) + 1,
			...data,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user: {
				id: data.user_id,
				name: "New User",
				email: `user${data.user_id}@kirimaja.com`,
				phone_number: "081234567890",
				avatar: null,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			branch: {
				id: data.branch_id,
				name: "Branch Name",
				address: "Branch Address",
				phone_number: "081234567890",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		};

		employees.push(newEmployee);
		return newEmployee;
	},

	update: async (
		id: number,
		data: Partial<
			Omit<
				EmployeeItem,
				"id" | "created_at" | "updated_at" | "user" | "branch"
			>
		>
	): Promise<EmployeeItem | null> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const index = employees.findIndex((employee) => employee.id === id);
		if (index === -1) return null;

		employees[index] = {
			...employees[index],
			...data,
			updated_at: new Date().toISOString(),
		};
		return employees[index];
	},

	delete: async (id: number): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		const index = employees.findIndex((employee) => employee.id === id);
		if (index === -1) return false;

		employees.splice(index, 1);
		return true;
	},
};
