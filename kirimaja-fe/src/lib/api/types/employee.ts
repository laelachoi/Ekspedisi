// Employee related types

import type { User } from "./auth";
import type { Branch } from "./branch";

export const UserRole = {
	SUPER_ADMIN: 1,
	CUSTOMER: 2,
	COURIER: 3,
	ADMIN_BRANCH: 4,
} as const;

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
	user: User;
	branch: Branch;
	type: "courier" | "admin";
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
	phone_number: string;
	type: "courier" | "admin";
	role_id: number;
	branch_id: number;
	password: string;
}

export interface UpdateEmployeeBranchRequest {
	email?: string;
	name?: string;
	phone_number?: string;
	type?: "courier" | "admin";
	role_id?: number;
	branch_id?: number;
	password?: string;
}
