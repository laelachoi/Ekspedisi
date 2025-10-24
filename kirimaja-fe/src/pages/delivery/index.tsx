import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { courierColumns } from "./components/datatable/courier-columns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { Shipment } from "@/lib/api/types/shipment";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useCourierShipments } from "@/hooks/use-delivery";
import { Button, PermissionGuard } from "@/components";

export default function DeliveryPage() {
	// Use custom meta hook
	useMeta(META_DATA.delivery);

	const [searchTerm, setSearchTerm] = useState("");

	const { data: shipments = [], error, refetch } = useCourierShipments();

	// Filter shipments based on search term
	const filteredShipments = (shipments as unknown as Shipment[]).filter(
		(shipment) =>
			shipment.tracking_number
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			shipment.shipment_detail?.package_type
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			shipment.shipment_detail?.destination_address
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			shipment.shipment_detail?.recipient_name
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	const handleRefresh = () => {
		refetch()
		toast.success("Pengiriman berhasil diperbarui");
	};

	if (error) {
		return (
			<Page title="Daftar Pengiriman 🚚📦">
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<p className="text-red-500 mb-4"> Error: {error.message}</p>
					<Button onClick={() => refetch()} variant="outline">
							Coba Lagi
					</Button>
				</div>
			</Page>
		);
	}

	return (
		<>
			<PermissionGuard permission="delivery.read">
				<Page title="Daftar Pengiriman 🚚📦">
					<div className="mb-4 flex gap-4 items-center">
						<Input
							type="text"
							placeholder="Cari berdasarkan nomor resi, produk, atau alamat"
							className="w-full max-w-md bg-white"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<DataTable
						data={filteredShipments}
						columns={courierColumns(handleRefresh)}
						title="Semua Pengiriman"
					/>
				</Page>
			</PermissionGuard>
		</>
	);
}
