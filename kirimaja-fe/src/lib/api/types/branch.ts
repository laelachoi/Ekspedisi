// Branch related types

export interface CreateBranchRequest {
	name: string;
	address: string;
	phone_number: string;
}

export interface Branch {
	id: number;
	name: string;
	address: string;
	phone_number: string;
	created_at: string;
	updated_at: string;
}

export interface BranchResponse {
	message: string;
	data: Branch[];
}

export interface SingleBranchResponse {
	message: string;
	data: Branch;
}

// Legacy types for backward compatibility
export type BranchRequest = CreateBranchRequest;
