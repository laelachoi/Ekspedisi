// Role and Permission related types and mock data
import type { Role, Permission } from "../lib/api/types/role";

// Mock permissions data
export const permissions: Permission[] = [
	{
		id: 1,
		name: "View Branches",
		key: "branches.view",
		resource: "branches",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 2,
		name: "Create Branches",
		key: "branches.create",
		resource: "branches",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 3,
		name: "Update Branches",
		key: "branches.update",
		resource: "branches",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 4,
		name: "Delete Branches",
		key: "branches.delete",
		resource: "branches",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 5,
		name: "View Shipments",
		key: "shipments.view",
		resource: "shipments",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 6,
		name: "Create Shipments",
		key: "shipments.create",
		resource: "shipments",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 7,
		name: "Update Shipments",
		key: "shipments.update",
		resource: "shipments",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 8,
		name: "Cancel Shipments",
		key: "shipments.cancel",
		resource: "shipments",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 9,
		name: "View Employees",
		key: "employees.view",
		resource: "employees",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 10,
		name: "Create Employees",
		key: "employees.create",
		resource: "employees",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 11,
		name: "Update Employees",
		key: "employees.update",
		resource: "employees",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 12,
		name: "Delete Employees",
		key: "employees.delete",
		resource: "employees",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 13,
		name: "View Roles",
		key: "roles.view",
		resource: "roles",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 14,
		name: "Manage Permissions",
		key: "permissions.manage",
		resource: "permissions",
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
];

// Mock roles data with assigned permissions
export const roles: Role[] = [
	{
		id: 1,
		name: "Admin",
		key: "admin",
		permissions: permissions,
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 2,
		name: "Branch Manager",
		key: "branch-manager",
		permissions: permissions.slice(0, 8), // First 8 permissions (branches + shipments)
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 3,
		name: "Courier",
		key: "courier",
		permissions: permissions.filter((p) => p.id === 5 || p.id === 7), // View and Update Shipments
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 4,
		name: "Customer Service",
		key: "customer-service",
		permissions: permissions.filter((p) => p.id >= 5 && p.id <= 8), // Shipment permissions
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
	{
		id: 5,
		name: "HR Manager",
		key: "hr-manager",
		permissions: permissions.filter((p) => p.id >= 9 && p.id <= 12), // Employee permissions
		created_at: "2024-06-01T00:00:00Z",
		updated_at: "2024-06-01T00:00:00Z",
	},
];

// Mock services for API integration
export const mockRoleService = {
	getRoles: async (): Promise<Role[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return roles;
	},

	getRoleById: async (id: number): Promise<Role | null> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));
		return roles.find((role) => role.id === id) || null;
	},

	updateRole: async (
		id: number,
		data: { name?: string; permission_ids?: number[] }
	): Promise<Role> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 800));
		const roleIndex = roles.findIndex((role) => role.id === id);
		if (roleIndex === -1) {
			throw new Error("Role not found");
		}

		const updatedRole = { ...roles[roleIndex] };
		if (data.name) {
			updatedRole.name = data.name;
		}
		if (data.permission_ids) {
			updatedRole.permissions = permissions.filter((p) =>
				data.permission_ids!.includes(p.id)
			);
		}
		updatedRole.updated_at = new Date().toISOString();

		roles[roleIndex] = updatedRole;
		return updatedRole;
	},

	updateRolePermissions: async (
		id: number,
		permissionIds: number[]
	): Promise<Role> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 600));
		const roleIndex = roles.findIndex((role) => role.id === id);
		if (roleIndex === -1) {
			throw new Error("Role not found");
		}

		const updatedRole = { ...roles[roleIndex] };
		updatedRole.permissions = permissions.filter((p) =>
			permissionIds.includes(p.id)
		);
		updatedRole.updated_at = new Date().toISOString();

		roles[roleIndex] = updatedRole;
		return updatedRole;
	},
};

export const mockPermissionService = {
	getPermissions: async (): Promise<Permission[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 400));
		return permissions;
	},

	getPermissionById: async (id: number): Promise<Permission | null> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 200));
		return permissions.find((permission) => permission.id === id) || null;
	},
};
