import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { createColumns } from "./components/datatable/columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { roles } from "@/data/role";
import { Toaster } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function RolePage() {
	// Use custom meta hook
	useMeta(META_DATA.role);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredRoles = roles.filter(
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
	);

	const columns = createColumns();

	return (
		<>
			<Page title="Kelola Role 🔐👨‍💼">
				<Input
					type="text"
					placeholder="Cari Role (Nama, Key, Permission)"
					className="mb-4 w-full max-w-md bg-white"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<DataTable
					data={filteredRoles}
					columns={columns}
					title="Daftar Role"
				/>
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
