import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMeta, META_DATA } from "@/hooks/use-meta";
 
// Components
import { DataTable, columns, AddBranchModal } from "./components";
import { useBranches } from "@/hooks/use-branch";
import { PermissionGuard } from "@/components";

export default function BranchPage() {
	// Use custom meta hook
	useMeta(META_DATA.branch);

	const [searchTerm, setSearchTerm] = useState("");

	const { data: branches = [], error } = useBranches();
	
	const filteredBranches = branches.filter(
		(branch) =>
			branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			branch.phone_number.includes(searchTerm)
	);

	if (error) {
		return (
			<Page title="Daftar Cabang 🏢">
				<div className="text-center text-red-500">
					Error: {(error as Error).message}
				</div>
			</Page>
		);
	}

	return (
		<>
			<Page title="Daftar Cabang 🏢" action={
				<PermissionGuard permission="branches.create">
					<AddBranchModal />
				</PermissionGuard>
			}>
				<Input
					type="text"
					placeholder="Cari Cabang"
					className="mb-4 w-full max-w-sm bg-white"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<DataTable
					data={filteredBranches}
					columns={columns()}
					title="Semua Cabang"
				/>
			</Page>
		</>
	);
}
