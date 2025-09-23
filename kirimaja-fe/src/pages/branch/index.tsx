import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { branches } from "@/data/branch";

// Components
import { DataTable, columns, AddBranchModal } from "./components";

export default function BranchPage() {
	// Use custom meta hook
	useMeta(META_DATA.branch);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredBranches = branches.filter(
		(branch) =>
			branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			branch.phone_number.includes(searchTerm)
	);

	return (
		<>
			<Page title="Daftar Cabang 🏢" action={<AddBranchModal />}>
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
