import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { createColumns } from "./components/datatable/columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AddSquare } from "iconsax-reactjs";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useUserAddresses } from "@/hooks/use-user-address";

export default function UserAddressesPage() {
	// Use custom meta hook
	useMeta(META_DATA["user-addresses"]);

	const [searchTerm, setSearchTerm] = useState("");
	const { data: userAddresses = [], isLoading, error } = useUserAddresses();

	const filteredUserAddresses = userAddresses.filter (
		(address) => 
			address.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			address.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
			address.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const columns = createColumns(() => {
		// Refresh function - TanStack Query will handle invalidation
	});

	if (error) {
		return (
			<Page title="Alamat Saya">
				<div className="flex items-center justify-center h-64">
					<p className="text-red-500">Error: {error.message}</p>
				</div>
			</Page>
		);
	}

	return (
		<>
			<Page
				title="Alamat Saya"
				action={
					<Link to="/user-addresses/add">
						<Button variant="darkGreen">
							Tambah Alamat Baru
							<AddSquare
								className="ml-auto"
								variant="Bold"
								size="20"
							/>
						</Button>
					</Link>
				}
			>
				<div className="flex justify-between items-center mb-4">
					<Input
						type="text"
						placeholder="Cari Alamat"
						className="w-full max-w-sm bg-white"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{isLoading ? (
					<div className="space-y-4">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
						<Skeleton className="h-[400px] w-full" />
					</div>
				) : (
					<DataTable
						data={filteredUserAddresses}
						columns={columns}
						title="Daftar Alamat"
					/>
				)}
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
