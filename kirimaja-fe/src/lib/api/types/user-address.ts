// User Address related types
import type { User } from "./auth";

export interface CreateUserAddressRequest {
	address: string;
	tag: string;
	label: string;
	photo?: string; // binary format in multipart
	latitude?: number;
	longitude?: number;
}

export interface UserAddress {
	id: number;
	address: string;
	tag: string;
	label: string;
	photo?: string | null;
	latitude?: number;
	longitude?: number;
	user_id: number;
	created_at: string;
	updated_at: string;
	user?: User;
}

export interface UserAddressResponse {
	message: string;
	data: UserAddress[];
}

export interface SingleUserAddressResponse {
	message: string;
	data: UserAddress;
}

// Legacy types for backward compatibility
export type UserAddressRequest = CreateUserAddressRequest;

export interface UpdateUserAddressRequest {
	address?: string;
	tag?: string;
	label?: string;
	photo?: File;
	latitude?: number;
	longitude?: number;
}

export interface UserAddressDetailResponse {
	data: UserAddress;
	message: string;
	success: boolean;
}
