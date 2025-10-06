import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { createColumns } from "./components/datatable/columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useRoles } from "@/hooks/use-role";
import { PermissionGuard, Skeleton } from "@/components";

export default function RolePage() {
	// Use custom meta hook
	useMeta(META_DATA.role);

	const [searchTerm, setSearchTerm] = useState("");

	const { data: roles, isLoading, error } = useRoles();

	const filteredRoles = 
		roles?.filter(
			(role) =>
				role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
				role.permissions.some(
					(permission) =>
						permission.name
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						permission.key
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				)
		) || [];

	const columns = createColumns();

	if (error) {
		return (
			<Page title="Kelola Role 🔐👨‍💼">
				<div className="text-center py-8">
					<p className="text-red-500">
						{error instanceof Error
							? error.message
							: "Terjadi kesalahan saat memuat data role"}
					</p>
				</div>
			</Page>
		);
	}

	return (
		<>
			<PermissionGuard permission="permissions.manage">
				<Page title="Kelola Role 🔐👨‍💼">
					<Input
						type="text"
						placeholder="Cari Role (Nama, Key, Permission)"
						className="mb-4 w-full max-w-md bg-white"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{isLoading ? (
						<div className="space-y-4">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					): (
						<DataTable
							data={filteredRoles}
							columns={columns}
							title="Daftar Role"
						/>
					)}
				</Page>
			</PermissionGuard>
		</>
	);
}
