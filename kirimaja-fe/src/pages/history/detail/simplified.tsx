import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/components/ui/page";
import { Box, BoxTick, TruckTime, Location } from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { type Shipment } from "@/lib/api/types/shipment";
import { getHistoryById } from "@/lib/api/services/mock-history";

const SimplifiedHistoryDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [shipment, setShipment] = useState<Shipment | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchShipmentDetail = () => {
			if (!id) {
				toast.error("ID pengiriman tidak valid");
				navigate("/history");
				return;
			}

			try {
				setIsLoading(true);
				const shipmentData = getHistoryById(parseInt(id));
				if (shipmentData) {
					setShipment(shipmentData);
				} else {
					toast.error("Pengiriman tidak ditemukan");
					navigate("/history");
				}
			} catch (error) {
				console.error("Failed to fetch shipment detail:", error);
				toast.error("Gagal memuat detail pengiriman");
				navigate("/history");
			} finally {
				setIsLoading(false);
			}
		};

		fetchShipmentDetail();
	}, [id, navigate]);

	const breadcrumbs = {
		items: [
			{
				label: "Riwayat Pengiriman",
				href: "/history",
			},
			{
				label: "Detail Riwayat",
				href: `/history/detail/${id}`,
			},
		],
	};

	if (isLoading) {
		return (
			<Page title="Detail Riwayat" breadcrumbs={breadcrumbs}>
				<div className="flex items-center justify-center h-64">
					<p>Memuat data riwayat...</p>
				</div>
			</Page>
		);
	}

	if (!shipment) {
		return null;
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const formatWeight = (grams: number) => {
		if (grams >= 1000) {
			return `${(grams / 1000).toFixed(1)} kg`;
		}
		return `${grams} g`;
	};

	const getStatusBadgeVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "waiting_pickup":
				return "secondary";
			case "picked_up":
			case "in_transit":
			case "on_the_way_to_address":
			case "ready_to_deliver":
				return "default";
			case "delivered":
				return "default";
			case "failed":
				return "destructive";
			default:
				return "secondary";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
				return "Menunggu Konfirmasi";
			case "waiting_pickup":
				return "Menunggu Pickup";
			case "picked_up":
				return "Sudah Dipickup";
			case "in_transit":
				return "Dalam Perjalanan";
			case "on_the_way_to_address":
				return "Menuju Alamat";
			case "ready_to_deliver":
				return "Siap Dikirim";
			case "delivered":
				return "Terkirim";
			case "failed":
				return "Gagal";
			default:
				return status;
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<Page title="Detail Riwayat" breadcrumbs={breadcrumbs}>
			<div className="max-w-2xl mx-auto space-y-6">
				{/* Package Summary Card */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Box size={24} variant="Bold" />
							Ringkasan Paket
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Tracking and Status */}
						<div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
							<div>
								<p className="text-sm text-gray-600">
									No. Resi
								</p>
								<p className="font-bold text-lg">
									{shipment.tracking_number ||
										"Belum tersedia"}
								</p>
							</div>
							<Badge
								variant={getStatusBadgeVariant(
									shipment.delivery_status || "pending"
								)}
								className="text-sm px-3 py-1"
							>
								{getStatusLabel(
									shipment.delivery_status || "pending"
								)}
							</Badge>
						</div>

						{/* Package Info Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							<div className="text-center p-3 border rounded-lg">
								<p className="text-xs text-gray-600">Jenis</p>
								<p className="font-semibold text-sm capitalize truncate">
									{shipment.shipment_detail?.package_type?.toLowerCase() ||
										"Standar"}
								</p>
							</div>
							<div className="text-center p-3 border rounded-lg">
								<p className="text-xs text-gray-600">Berat</p>
								<p className="font-semibold text-sm">
									{formatWeight(
										shipment.shipment_detail?.weight || 0
									)}
								</p>
							</div>
							<div className="text-center p-3 border rounded-lg">
								<p className="text-xs text-gray-600">Ongkir</p>
								<p className="font-semibold text-sm text-green-600">
									{formatPrice(shipment.price || 0)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Delivery Route */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TruckTime size={24} variant="Bold" />
							Rute Pengiriman
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div className="text-center flex-1">
								<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
									<Location
										size={16}
										className="text-blue-600"
									/>
								</div>
								<p className="text-xs text-gray-600">Dari</p>
								<p className="font-medium text-sm">
									{shipment.shipment_detail?.address?.label ||
										"Pickup"}
								</p>
							</div>

							<div className="flex-1 px-4">
								<div className="border-t-2 border-dashed border-gray-300 relative">
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1">
										<TruckTime
											size={16}
											className="text-orange-500"
										/>
									</div>
								</div>
							</div>

							<div className="text-center flex-1">
								<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
									<Location
										size={16}
										className="text-green-600"
									/>
								</div>
								<p className="text-xs text-gray-600">Ke</p>
								<p className="font-medium text-sm">
									{shipment.shipment_detail?.recipient_name ||
										"Penerima"}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Completion Status */}
				{shipment.delivery_status === "delivered" && (
					<Card className="border-green-200 bg-green-50">
						<CardContent className="pt-6">
							<div className="text-center">
								<div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
									<BoxTick size={24} className="text-white" />
								</div>
								<h3 className="font-semibold text-green-800 mb-1">
									Paket Terkirim
								</h3>
								<p className="text-sm text-green-600">
									Pengiriman telah selesai pada{" "}
									{formatDate(shipment.updated_at)}
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Action Button */}
				<Button
					variant="outline"
					onClick={() => navigate("/history")}
					className="w-full"
				>
					Kembali ke Riwayat
				</Button>
			</div>
		</Page>
	);
};

export default SimplifiedHistoryDetailPage;
