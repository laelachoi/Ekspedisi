import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { useColumns } from "./components/datatable/columns";
import { Button } from "@/components/ui/button";
import { AddSquare } from "iconsax-reactjs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { Shipment } from "@/lib/api/types/shipment";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { mockShipmentService } from "@/data/shipment";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function SendPackagePage() {
	return <SendPackageContent />;
}

function SendPackageContent() {
	// Use custom meta hook
	useMeta(META_DATA["send-package"]);

	const columns = useColumns();
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	// Load shipments using mock data
	useEffect(() => {
		const loadShipments = async () => {
			try {
				setIsLoading(true);
				const response = await mockShipmentService.getAll();
				setShipments(response);
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Failed to load shipments";
				toast.error(errorMessage);
				console.error("Error loading shipments:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadShipments();
	}, []);

	// Filter shipments based on search query
	const filteredShipments = shipments.filter(
		(shipment) =>
			shipment.tracking_number
				?.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			shipment.shipment_detail.package_type
				?.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			shipment.pickup_address?.address
				?.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			shipment.shipment_detail?.destination_address
				?.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			shipment.shipment_detail?.recipient_name
				?.toLowerCase()
				.includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<Page
				title="Kirim Paket 🚚 🏠"
				action={
					<Link to="/send-package/add">
						<Button variant="darkGreen">
							Buat Pengiriman Baru
							<AddSquare
								className="ml-auto"
								variant="Bold"
								size="20"
							/>
						</Button>
					</Link>
				}
			>
				<Input
					type="text"
					placeholder="Cari Pengiriman"
					className="mb-4 w-full max-w-sm bg-white"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{isLoading ? (
					<div className="space-y-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-20 w-full" />
						<Skeleton className="h-20 w-full" />
						<Skeleton className="h-20 w-full" />
					</div>
				) : (
					<DataTable
						data={filteredShipments}
						columns={columns}
						title="Pengiriman Sebelumnya"
					/>
				)}
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
