import { Page } from "@/components/ui/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { BetterScanModal } from "./components/better-scan-modal";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import type { ShipmentBranchLog } from "@/lib/api/types/shipment-branch";
import { ArrowDown, ArrowUp, RefreshCircle } from "iconsax-reactjs";
import { shipmentBranchLogs } from "@/data/shipment-branch";

export default function ShipmentBranchPage() {
	return <ShipmentBranchContent />;
}

function ShipmentBranchContent() {
	// Use custom meta hook
	useMeta(META_DATA["shipment-branch"]);

	const [logs, setLogs] = useState<ShipmentBranchLog[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [scanInModalOpen, setScanInModalOpen] = useState(false);
	const [scanOutModalOpen, setScanOutModalOpen] = useState(false);

	const fetchLogs = async () => {
		try {
			setLoading(true);
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 500));
			setLogs(shipmentBranchLogs);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Gagal memuat data log cabang. Silakan coba lagi.";
			console.error("Error fetching shipment branch logs:", error);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLogs();
	}, []);

	const filteredLogs = logs.filter((log) =>
		log.tracking_number.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleScanComplete = (newLog?: Partial<ShipmentBranchLog>) => {
		if (newLog) {
			// Add new log to the beginning of the array
			const newLogEntry: ShipmentBranchLog = {
				id: Math.max(...logs.map((l) => l.id)) + 1,
				tracking_number: newLog.tracking_number || "KJ2024NEW",
				type: newLog.type || "IN",
				branch_id: 1,
				user_id: 101,
				is_ready_to_pickup: false,
				created_at: new Date().toISOString(),
			};
			setLogs((prevLogs) => [newLogEntry, ...prevLogs]);
		} else {
			fetchLogs();
		}
	};

	return (
		<>
			<Page
				title="Manajemen Cabang Pengiriman 📦🏢"
				action={
					<div className="flex gap-2">
						<Button
							variant="darkGreen"
							onClick={() => setScanInModalOpen(true)}
							className="flex items-center gap-2"
						>
							<ArrowDown size={20} variant="Bold" />
							Scan Masuk
						</Button>
						<Button
							variant="default"
							onClick={() => setScanOutModalOpen(true)}
							className="flex items-center gap-2"
						>
							<ArrowUp size={20} variant="Bold" />
							Scan Keluar
						</Button>
					</div>
				}
			>
				<div className="space-y-4">
					{/* Search and Filter */}
					<Input
						type="text"
						placeholder="Cari berdasarkan nomor resi, penerima, petugas, atau cabang"
						className="w-full max-w-md bg-white"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<div className="flex items-center gap-3">
								<div className="bg-green-100 p-2 rounded-full">
									<ArrowDown
										size={20}
										className="text-green-600"
									/>
								</div>
								<div>
									<p className="text-sm text-green-600 font-medium">
										Paket Masuk Hari Ini
									</p>
									<p className="text-2xl font-bold text-green-700">
										{
											filteredLogs.filter(
												(log) =>
													log.type === "IN" &&
													new Date(
														log.created_at
													).toDateString() ===
														new Date().toDateString()
											).length
										}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<div className="flex items-center gap-3">
								<div className="bg-blue-100 p-2 rounded-full">
									<ArrowUp
										size={20}
										className="text-blue-600"
									/>
								</div>
								<div>
									<p className="text-sm text-blue-600 font-medium">
										Paket Keluar Hari Ini
									</p>
									<p className="text-2xl font-bold text-blue-700">
										{
											filteredLogs.filter(
												(log) =>
													log.type === "OUT" &&
													new Date(
														log.created_at
													).toDateString() ===
														new Date().toDateString()
											).length
										}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
							<div className="flex items-center gap-3">
								<div className="bg-gray-100 p-2 rounded-full">
									<RefreshCircle
										size={20}
										className="text-gray-600"
									/>
								</div>
								<div>
									<p className="text-sm text-gray-600 font-medium">
										Total Aktivitas
									</p>
									<p className="text-2xl font-bold text-gray-700">
										{filteredLogs.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Data Table */}
					{loading ? (
						<div className="space-y-4">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-[400px] w-full" />
						</div>
					) : (
						<div className="space-y-6">
							<DataTable
								data={filteredLogs}
								columns={columns}
								title="Log Aktivitas Cabang"
							/>
						</div>
					)}
				</div>

				{/* Scan Modals */}
				<BetterScanModal
					isOpen={scanInModalOpen}
					onClose={() => setScanInModalOpen(false)}
					type="IN"
					onScanComplete={handleScanComplete}
				/>

				<BetterScanModal
					isOpen={scanOutModalOpen}
					onClose={() => setScanOutModalOpen(false)}
					type="OUT"
					onScanComplete={handleScanComplete}
				/>

				<Toaster position="top-right" />
			</Page>
		</>
	);
}
