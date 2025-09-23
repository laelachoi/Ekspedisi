import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Box,
	I3DCubeScan,
	Timer,
	BoxTick,
	TruckTime,
	CloseCircle,
} from "iconsax-reactjs";
import { Truck } from "lucide-react";
import type { Shipment } from "@/lib/api/types/shipment";

interface DetailProps {
	shipment: Shipment | null;
	isOpen: boolean;
	onClose: () => void;
}

const Detail = ({ shipment, isOpen, onClose }: DetailProps) => {
	if (!shipment) return null;

	const formatWeight = (grams: number) => {
		if (grams >= 1000) {
			return `${(grams / 1000).toFixed(1)} kg`;
		}
		return `${grams} g`;
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(price);
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

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "waiting_pickup":
				return <Timer size={16} variant="Bold" />;
			case "picked_up":
				return <BoxTick size={16} variant="Bold" />;
			case "in_transit":
			case "on_the_way":
			case "on_the_way_to_address":
				return <TruckTime size={16} variant="Bold" />;
			case "ready_to_deliver":
				return <Truck size={16} />;
			case "delivered":
				return <Box size={16} variant="Bold" />;
			case "failed":
				return <CloseCircle size={16} variant="Bold" />;
			default:
				return <Timer size={16} variant="Bold" />;
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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">
						Detail Paket
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Package Basic Info */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">
								Informasi Paket
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{/* Tracking Number */}
							<div className="flex items-center gap-3">
								<div className="bg-primary p-2 rounded-lg text-white">
									<I3DCubeScan size={16} variant="Bold" />
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										No. Resi
									</p>
									<p className="font-semibold">
										{shipment.tracking_number ||
											"Belum tersedia"}
									</p>
								</div>
							</div>

							{/* Package Type */}
							<div className="flex items-center gap-3">
								<div className="bg-orange-500 p-2 rounded-lg text-white">
									<Box size={16} variant="Bold" />
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										Jenis Paket
									</p>
									<p className="font-semibold capitalize">
										{shipment.shipment_detail?.package_type?.toLowerCase() ||
											"Standar"}
									</p>
								</div>
							</div>

							{/* Weight */}
							<div className="flex items-center gap-3">
								<div className="bg-green-600 p-2 rounded-lg text-white">
									<Box size={16} variant="Bold" />
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										Berat
									</p>
									<p className="font-semibold">
										{formatWeight(
											shipment.shipment_detail?.weight ||
												0
										)}
									</p>
								</div>
							</div>

							{/* Price */}
							<div className="flex items-center gap-3">
								<div className="bg-blue-600 p-2 rounded-lg text-white">
									<Box size={16} variant="Bold" />
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										Ongkir
									</p>
									<p className="font-semibold">
										{formatPrice(shipment.price || 0)}
									</p>
								</div>
							</div>

							{/* Status */}
							<div className="flex items-center gap-3">
								<div className="bg-purple-600 p-2 rounded-lg text-white">
									{getStatusIcon(
										shipment.delivery_status || "pending"
									)}
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										Status
									</p>
									<Badge
										variant={getStatusBadgeVariant(
											shipment.delivery_status ||
												"pending"
										)}
										className="mt-1"
									>
										{getStatusLabel(
											shipment.delivery_status ||
												"pending"
										)}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Basic Address Info - Simplified */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">
								Pengiriman
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm text-gray-600">
										Dari
									</p>
									<p className="font-medium">
										{shipment.shipment_detail?.address
											?.label || "Alamat pickup"}
									</p>
								</div>
								<div className="text-center">
									<div className="bg-gray-200 p-2 rounded-full">
										<TruckTime size={16} />
									</div>
								</div>
								<div>
									<p className="text-sm text-gray-600">Ke</p>
									<p className="font-medium">
										{shipment.shipment_detail
											?.recipient_name || "Penerima"}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Detail;
