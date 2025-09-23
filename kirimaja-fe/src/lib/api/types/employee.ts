// Employee related types

export interface Employee {
	id: number;
	user_id: number;
	branch_id: number;
	created_at: string;
	updated_at: string;
}

export interface EmployeeBranch {
	id: number;
	user_id: number;
	branch_id: number;
	created_at: string;
	updated_at: string;
}

export interface CreateEmployeeBranchRequest {
	user_id: number;
	branch_id: number;
}

export interface EmployeeBranchResponse {
	message: string;
	data: EmployeeBranch[];
}

export interface SingleEmployeeBranchResponse {
	message: string;
	data: EmployeeBranch;
}

export interface EmployeeBranchRequest {
	email: string;
	name: string;
	address: string;
	phone_number: string;
	type: "courier" | "admin";
	role_id: number;
	branch_id: number;
	password: string;
}

export interface UpdateEmployeeBranchRequest {
	email?: string;
	name?: string;
	address?: string;
	phone_number?: string;
	type?: "courier" | "admin";
	role_id?: number;
	branch_id?: number;
	password?: string;
}
