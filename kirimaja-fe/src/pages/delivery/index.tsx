import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { courierColumns } from "./components/datatable/courier-columns";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { shipments } from "@/data/courier-shipments";
import type { Shipment } from "@/lib/api/types/shipment";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function DeliveryPage() {
	// Use custom meta hook
	useMeta(META_DATA.delivery);

	const [_loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

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
		// Simulate refresh action
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			toast.success("Data berhasil diperbarui");
		}, 1000);
	};

	return (
		<>
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
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
