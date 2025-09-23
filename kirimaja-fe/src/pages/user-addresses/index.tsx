import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { createColumns } from "./components/datatable/columns";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { UserAddress } from "@/lib/api/types/user-address";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AddSquare } from "iconsax-reactjs";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { userAddresses as dummyAddresses } from "@/data/user-addresses"; // Import dummy addresses data

export default function UserAddressesPage() {
	// Use custom meta hook
	useMeta(META_DATA["user-addresses"]);

	const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// Load user addresses data
	useEffect(() => {
		// Simulate loading with a timeout
		const loadData = async () => {
			try {
				setUserAddresses(dummyAddresses as UserAddress[]);
			} catch {
				setUserAddresses(dummyAddresses as UserAddress[]);
				// Fallback to dummy data for development
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [refreshing]);

	// Function to refresh data
	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 500); // Simulate refresh
	};

	const filtereduserAddresses = userAddresses.filter((address) =>
		address.address.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const columns = createColumns(() => handleRefresh());

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
				{loading ? (
					<div className="space-y-4">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
						<Skeleton className="h-[400px] w-full" />
					</div>
				) : (
					<DataTable
						data={filtereduserAddresses}
						columns={columns}
						title="Daftar Alamat"
					/>
				)}
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
