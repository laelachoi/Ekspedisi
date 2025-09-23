// Authentication related types
import type { Permission } from "./role";

export interface User {
	id: number;
	name: string;
	email: string;
	phone_number: string;
	avatar?: string | null;
	created_at: string;
	updated_at: string;
}

// Legacy types for backward compatibility (keeping old structure for compatibility)
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	phone_number: string;
}

export interface LoginResponse {
	access_token: string;
	user: {
		id: number;
		name: string;
		email: string;
		avatar?: string | null;
		phone_number: string;
		role: {
			id: number;
			name: string;
			key: string;
			permissions?: Permission[];
		};
	};
}
