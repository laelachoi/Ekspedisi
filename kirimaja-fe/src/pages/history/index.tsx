import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { type Shipment } from "@/lib/api/types/shipment";
import { shipmentHistoryData } from "@/data/shipment-history";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function HistoryPage() {
	// Use custom meta hook
	useMeta(META_DATA.history);

	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				// Menggunakan data dummy dari file shipment-history.ts
				const historyData = shipmentHistoryData;
				setShipments(historyData);
				setFilteredShipments(historyData);
			} catch (error: unknown) {
				console.error("Failed to fetch history:", error);
				const errorMessage =
					error instanceof Error
						? error.message
						: "Gagal memuat riwayat pengiriman";
				toast.error(errorMessage);
			}
		};

		fetchHistory();
	}, []);

	useEffect(() => {
		const filtered = shipments.filter(
			(shipment) =>
				shipment.tracking_number
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				shipment.shipment_detail?.recipient_name
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				shipment.delivery_status
					?.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);
		setFilteredShipments(filtered);
	}, [searchQuery, shipments]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<Page title="Riwayat Pengiriman 📜⏰">
				<Input
					type="text"
					placeholder="Cari Pengiriman"
					className="mb-4 w-full max-w-sm bg-white"
					value={searchQuery}
					onChange={handleSearch}
				/>
				<DataTable
					data={filteredShipments}
					columns={columns}
					title="Paket yang Sudah Dikirim"
				/>
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
