import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page, type PageBreadcrumbItem } from "@/components/ui/page";
import {
	Box,
	BoxTick,
	CallIncoming,
	CallOutgoing,
	CardPos,
	Gps,
	I3DCubeScan,
	Location,
	Profile2User,
	Timer,
	TruckTime,
	User,
	CloseCircle,
} from "iconsax-reactjs";
import { Slash } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { type Shipment } from "@/lib/api/types/shipment";
import { getHistoryById } from "@/lib/api/services/mock-history";
import { useMeta, META_DATA } from "@/hooks/use-meta";

const DetailHistoryPage = () => {
	// Use custom meta hook
	useMeta(META_DATA["history-detail"]);
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

	const breadcrumbs: PageBreadcrumbItem[] = [
		{
			label: "Riwayat Pengiriman",
			href: "/history",
		},
		{
			label: "Detail Pengiriman",
			href: `/history/detail/${id}`,
		},
	];

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "waiting_pickup":
				return <Timer size={20} variant="Bold" />;
			case "picked_up":
			case "in_transit":
			case "on_the_way":
			case "on_the_way_to_address":
			case "departed_from_branch":
				return <TruckTime size={20} variant="Bold" />;
			case "arrived_at_branch":
			case "at_branch":
				return <Location size={20} variant="Bold" />;
			case "delivered":
			case "completed":
				return <BoxTick size={20} variant="Bold" />;
			case "failed":
				return <CloseCircle size={20} variant="Bold" />;
			default:
				return <Timer size={20} variant="Bold" />;
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
				return "Menunggu Konfirmasi";
			case "waiting_pickup":
				return "Menunggu Dijemput";
			case "picked_up":
				return "Sudah Dijemput";
			case "in_transit":
				return "Dalam Perjalanan";
			case "arrived_at_branch":
				return "Tiba di Cabang";
			case "at_branch":
				return "Di Cabang";
			case "departed_from_branch":
				return "Berangkat dari Cabang";
			case "on_the_way":
				return "Menuju Cabang Tujuan";
			case "on_the_way_to_address":
				return "Menuju Alamat Tujuan";
			case "ready_to_deliver":
				return "Siap Dikirim";
			case "delivered":
				return "Terkirim";
			case "completed":
				return "Selesai";
			case "failed":
				return "Gagal";
			default:
				return status;
		}
	};

	const getStatusBadgeVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "waiting_pickup":
				return "secondary";
			case "picked_up":
			case "in_transit":
			case "on_the_way":
			case "on_the_way_to_address":
			case "departed_from_branch":
				return "default";
			case "arrived_at_branch":
			case "at_branch":
				return "outline";
			case "delivered":
			case "completed":
				return "darkGreen";
			case "failed":
				return "destructive";
			default:
				return "secondary";
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (isLoading) {
		return (
			<Page title="Detail Pengiriman">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-secondary">
							Memuat detail pengiriman...
						</p>
					</div>
				</div>
			</Page>
		);
	}

	if (!shipment) {
		return (
			<Page title="Detail Pengiriman">
				<div className="text-center py-8">
					<CloseCircle
						size={64}
						className="mx-auto mb-4 text-red-500"
					/>
					<h3 className="text-lg font-semibold mb-2">
						Pengiriman Tidak Ditemukan
					</h3>
					<p className="text-secondary mb-4">
						Data pengiriman yang Anda cari tidak dapat ditemukan.
					</p>
					<Button
						onClick={() => navigate("/history")}
						variant="darkGreen"
					>
						Kembali ke Riwayat
					</Button>
				</div>
			</Page>
		);
	}

	return (
		<>
			<Page
				title={`Detail Pengiriman - ${shipment.tracking_number}`}
				breadcrumbs={{
					items: breadcrumbs,
					separator: <Slash size={16} />,
				}}
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
					<div className="flex flex-col gap-4">
						{/* Alamat Pengiriman */}
						<Card className="rounded-2xl">
							<CardHeader>
								<CardTitle className="text-xl font-semibold">
									Alamat Pengiriman
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="bg-primary p-4 rounded-2xl text-white">
										<Gps size={20} variant="Bold" />
									</div>
									<div className="space-y-2">
										<h2 className="font-semibold">
											{typeof shipment.shipment_detail
												?.address === "string"
												? shipment.shipment_detail
														.address
												: shipment.shipment_detail
														?.address?.address ||
												  "Alamat tidak tersedia"}
										</h2>
										<p className="text-sm text-secondary">
											Alamat Pengirim
										</p>
										<div className="flex items-center gap-2 text-sm">
											<User size={16} />
											<span>
												{shipment.shipment_detail?.user
													?.name || "Tidak tersedia"}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<CallOutgoing size={16} />
											<span>
												{shipment.shipment_detail?.user
													?.phone_number ||
													"Tidak tersedia"}
											</span>
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="bg-oranye p-4 rounded-2xl text-white">
										<Location size={20} variant="Bold" />
									</div>
									<div className="space-y-2">
										<h2 className="font-semibold">
											{shipment.shipment_detail
												?.destination_address ||
												"Alamat tidak tersedia"}
										</h2>
										<p className="text-sm text-secondary">
											Alamat Penerima
										</p>
										<div className="flex items-center gap-2 text-sm">
											<Profile2User size={16} />
											<span>
												{shipment.shipment_detail
													?.recipient_name ||
													"Tidak tersedia"}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<CallIncoming size={16} />
											<span>
												{shipment.shipment_detail
													?.recipient_phone ||
													"Tidak tersedia"}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Info Pengiriman */}
						<Card className="rounded-2xl">
							<CardHeader>
								<CardTitle className="text-xl font-semibold">
									Info Pengiriman
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-center gap-3">
										<div className="bg-dark-green p-3 rounded-xl text-white">
											<TruckTime
												size={16}
												variant="Bold"
											/>
										</div>
										<div>
											<h3 className="text-sm text-secondary">
												Jenis Pengiriman
											</h3>
											<p className="font-semibold capitalize">
												{shipment.shipment_detail
													?.delivery_type ||
													"Reguler"}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-primary p-3 rounded-xl text-white">
											<Box size={16} variant="Bold" />
										</div>
										<div>
											<h3 className="text-sm text-secondary">
												No. Resi
											</h3>
											<p className="font-semibold">
												{shipment.tracking_number ||
													"Tidak tersedia"}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-oranye p-3 rounded-xl text-white">
											<I3DCubeScan
												size={16}
												variant="Bold"
											/>
										</div>
										<div>
											<h3 className="text-sm text-secondary">
												Jenis Paket
											</h3>
											<p className="font-semibold capitalize">
												{shipment.shipment_detail?.package_type?.toLowerCase() ||
													"Tidak tersedia"}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-dark-green p-3 rounded-xl text-white">
											<CardPos size={16} variant="Bold" />
										</div>
										<div>
											<h3 className="text-sm text-secondary">
												Status
											</h3>
											<Badge
												variant={getStatusBadgeVariant(
													shipment.delivery_status ||
														"pending"
												)}
											>
												{getStatusLabel(
													shipment.delivery_status ||
														"pending"
												)}
											</Badge>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Status Pengiriman */}
					<div className="flex flex-col gap-4">
						<Card className="rounded-2xl">
							<CardHeader>
								<CardTitle className="text-xl font-semibold">
									Riwayat Status Pengiriman
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{shipment.shipment_history &&
								shipment.shipment_history.length > 0 ? (
									shipment.shipment_history
										.sort(
											(a, b) =>
												new Date(
													b.created_at
												).getTime() -
												new Date(a.created_at).getTime()
										)
										.map((history, index) => (
											<div
												key={history.id}
												className="flex gap-4"
											>
												<div className="flex flex-col items-center">
													<div
														className={`p-3 rounded-full text-white ${
															index === 0
																? "bg-primary"
																: "bg-dark-green"
														}`}
													>
														{getStatusIcon(
															history.status
														)}
													</div>
													{index <
														shipment.shipment_history!
															.length -
															1 && (
														<div className="w-px h-8 bg-gray-300 mt-2" />
													)}
												</div>
												<div className="flex-1 pb-6">
													<p className="text-sm text-secondary mb-1">
														{formatDate(
															history.created_at
														)}
													</p>
													{history.description && (
														<p className="text-sm text-gray-600">
															{
																history.description
															}
														</p>
													)}
												</div>
											</div>
										))
								) : (
									<div className="text-center py-8">
										<Timer
											size={32}
											className="mx-auto mb-2 opacity-50"
										/>
										<p className="text-secondary">
											Belum ada riwayat status
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</Page>
		</>
	);
};

export default DetailHistoryPage;
