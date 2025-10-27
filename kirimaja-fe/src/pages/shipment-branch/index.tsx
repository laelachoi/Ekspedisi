import { Page } from "@/components/ui/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { BetterScanModal } from "./components/better-scan-modal";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { ArrowDown, ArrowUp, RefreshCircle } from "iconsax-reactjs";
import { useShipmentBranchLogs } from "@/hooks/use-shipment-branch";
import { PermissionGuard } from "@/components";

export default function ShipmentBranchPage() {
	return <ShipmentBranchContent />;
}

function ShipmentBranchContent() {
	// Use custom meta hook
	useMeta(META_DATA["shipment-branch"]);

	const [searchTerm, setSearchTerm] = useState("");
	const [scanInModalOpen, setScanInModalOpen] = useState(false);
	const [scanOutModalOpen, setScanOutModalOpen] = useState(false);

	const { data: logs = [], isLoading, refetch } = useShipmentBranchLogs();

	const filteredLogs = logs.filter((log) =>
		log.tracking_number.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleScanComplete = () => {
		refetch();
	};

	return (
		<>
			<Page
				title="Manajemen Cabang Pengiriman 📦🏢"
				action={
					<PermissionGuard permission="shipment-branch.input">
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
					</PermissionGuard>
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
					<PermissionGuard permission="shipment-branch.read">
						{isLoading ? (
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
					</PermissionGuard>
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
