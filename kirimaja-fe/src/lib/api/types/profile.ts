import type { User } from "./auth";

// Legacy User interface for backward compatibility
export interface LegacyUser {
	id: number;
	name: string;
	email: string;
	avatar: string;
	phone_number: string;
	role: {
		id: number;
		name: string;
		key: string;
	};
}

export interface ProfileResponse {
	message: string;
	data: User;
}

export interface UpdateProfileRequest {
	name?: string;
	phone_number?: string;
	avatar?: string; // binary format in multipart
}

export interface UpdateProfileResponse {
	data: LegacyUser;
	message: string;
	success: boolean;
}
