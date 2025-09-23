// Role and Permission related types

export interface Permission {
	id: number;
	name: string;
	key: string;
	resource: string;
	created_at: string;
	updated_at: string;
}

export interface Role {
	id: number;
	name: string;
	key: string;
	permissions: Permission[];
	created_at: string;
	updated_at: string;
}

export interface RoleResponse {
	message: string;
	data: Role[];
}

export interface SingleRoleResponse {
	message: string;
	data: Role;
}

export interface PermissionResponse {
	message: string;
	data: Permission[];
}

export interface UpdateRoleRequest {
	name?: string;
	permission_ids?: number[];
}

export interface UpdateRolePermissionsRequest {
	permission_ids: number[];
}

export interface UpdateRolePermissionsResponse {
	message: string;
	data: Role;
}
