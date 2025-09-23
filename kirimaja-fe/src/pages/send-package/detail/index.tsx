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
	CloseCircle,
	Gps,
	I3DCubeScan,
	Location,
	Profile2User,
	Timer,
	TruckTime,
	User,
} from "iconsax-reactjs";
import { Slash, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import type { Shipment } from "@/lib/api/types/shipment";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { mockShipmentService } from "@/data/shipment";

const DetailPage = () => {
	// Use custom meta hook
	useMeta(META_DATA["send-package-detail"]);
	const [shipment, setShipment] = useState<Shipment | null>(null);
	const [loading, setLoading] = useState(true);
	const [downloadingPdf, setDownloadingPdf] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const loadShipment = async () => {
			if (!id) {
				toast.error("ID pengiriman tidak valid");
				navigate("/send-package");
				return;
			}

			try {
				setLoading(true);
				const shipmentData = await mockShipmentService.getById(
					parseInt(id)
				);
				setShipment(shipmentData);
			} catch (error) {
				console.error("Failed to load shipment:", error);
				toast.error("Gagal memuat data pengiriman");
				navigate("/send-package");
			} finally {
				setLoading(false);
			}
		};

		loadShipment();
	}, [id, navigate]);

	const downloadPdf = async () => {
		if (!id) return;

		try {
			setDownloadingPdf(true);
			// Mock PDF download - in real app would download actual PDF
			toast.success("PDF akan diunduh (fitur demo)");

			// Simulate download delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success("PDF berhasil diunduh");
		} catch (error) {
			console.error("Failed to download PDF:", error);
			toast.error("Gagal mengunduh PDF");
		} finally {
			setDownloadingPdf(false);
		}
	};

	if (loading) {
		return (
			<Page title="Detail Pengiriman">
				<div className="flex items-center justify-center h-64">
					<p>Memuat data pengiriman...</p>
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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusBadgeVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "ready_to_pickup":
			case "waiting_pickup":
				return "secondary"; // abu-abu
			case "picked_up":
			case "in_transit":
			case "arrived_at_branch":
			case "at_branch":
			case "departed_from_branch":
			case "on_the_way":
			case "on_the_way_to_address":
			case "ready_to_deliver":
				return "default"; // kuning atau biru muda
			case "delivered":
			case "completed":
				return "darkGreen"; // hijau
			case "failed":
				return "destructive"; // merah
			default:
				return "secondary";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
			case "ready_to_pickup":
			case "waiting_pickup":
				return <Timer size={20} variant="Bold" />;
			case "picked_up":
				return <BoxTick size={20} variant="Bold" />;
			case "in_transit":
			case "on_the_way":
			case "on_the_way_to_address":
			case "departed_from_branch":
				return <TruckTime size={20} variant="Bold" />;
			case "arrived_at_branch":
			case "at_branch":
				return <Location size={20} variant="Bold" />;
			case "ready_to_deliver":
				return <Truck size={20} />;
			case "delivered":
			case "completed":
				return <Box size={20} variant="Bold" />;
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
			case "ready_to_pickup":
				return "Siap Di Pickup";
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

	const breadcrumbs: PageBreadcrumbItem[] = [
		{
			label: "Kirim Paket",
			href: "/send-package",
		},
		{
			label: "Detail Pengiriman",
			href: `/send-package/detail/${shipment.id}`,
		},
	];

	return (
		<>
			<Page
				title="Detail Pengiriman"
				breadcrumbs={{
					items: breadcrumbs,
					separator: <Slash size={16} />,
				}}
			>
				<div className="max-w-full overflow-hidden">
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 items-start">
						<div className="flex flex-col gap-4 min-w-0">
							{/* User Information */}
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Informasi Pengirim
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center gap-3">
										<div className="bg-primary p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<User size={20} variant="Bold" />
										</div>
										<div className="space-y-1 min-w-0 flex-1">
											<h2 className="font-semibold truncate">
												{shipment.shipment_detail?.user
													?.name || "Tidak tersedia"}
											</h2>
											<p className="text-sm text-secondary">
												Nama Pengirim
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-dark-green p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<CallOutgoing
												size={20}
												variant="Bold"
											/>
										</div>
										<div className="space-y-1 min-w-0 flex-1">
											<h2 className="font-semibold break-all">
												{shipment.shipment_detail?.user
													?.phone_number ||
													"Tidak tersedia"}
											</h2>
											<p className="text-sm text-secondary">
												Nomor Telepon
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Recipient Information */}
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Informasi Penerima
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center gap-3">
										<div className="bg-oranye p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<Profile2User
												size={20}
												variant="Bold"
											/>
										</div>
										<div className="space-y-1 min-w-0 flex-1">
											<h2 className="font-semibold truncate">
												{shipment.shipment_detail
													?.recipient_name ||
													"Tidak tersedia"}
											</h2>
											<p className="text-sm text-secondary">
												Nama Penerima
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-secondary p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<CallIncoming
												size={20}
												variant="Bold"
											/>
										</div>
										<div className="space-y-1 min-w-0 flex-1">
											<h2 className="font-semibold break-all">
												{shipment.shipment_detail
													?.recipient_phone ||
													"Tidak tersedia"}
											</h2>
											<p className="text-sm text-secondary">
												Nomor Telepon
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Address Information */}
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Alamat Pengiriman
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start gap-3">
										<div className="bg-primary p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<Gps size={20} variant="Bold" />
										</div>
										<div className="space-y-1 flex-1 min-w-0">
											<h2 className="font-semibold break-words leading-relaxed">
												{shipment.shipment_detail
													?.address?.address ||
													"Detail alamat tidak tersedia"}
											</h2>
											<p className="text-xs text-secondary">
												Alamat Penjemputan
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="bg-oranye p-3 sm:p-4 rounded-2xl text-white flex-shrink-0">
											<Location
												size={20}
												variant="Bold"
											/>
										</div>
										<div className="space-y-1 flex-1 min-w-0">
											<h2 className="font-semibold break-words leading-relaxed">
												{shipment.shipment_detail
													?.destination_address ||
													"Alamat tidak tersedia"}
											</h2>
											<p className="text-xs text-secondary">
												Alamat Tujuan
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Package Information */}
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Informasi Paket
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="flex items-center gap-3 min-w-0">
											<div className="bg-primary p-3 rounded-xl text-white flex-shrink-0">
												<Box size={16} variant="Bold" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm text-secondary">
													Jenis Paket
												</h3>
												<p className="font-semibold capitalize truncate">
													{shipment.shipment_detail?.package_type?.toLowerCase() ||
														"Tidak tersedia"}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3 min-w-0">
											<div className="bg-dark-green p-3 rounded-xl text-white flex-shrink-0">
												<TruckTime
													size={16}
													variant="Bold"
												/>
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm text-secondary">
													Jenis Pengiriman
												</h3>
												<p className="font-semibold capitalize truncate">
													{shipment.shipment_detail?.delivery_type?.toLowerCase() ||
														"Regular"}
												</p>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="flex items-center gap-3 min-w-0">
											<div className="bg-oranye p-3 rounded-xl text-white flex-shrink-0">
												<Box size={16} variant="Bold" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm text-secondary">
													Berat Paket
												</h3>
												<p className="font-semibold">
													{formatWeight(
														shipment.shipment_detail
															?.weight || 0
													)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3 min-w-0">
											<div className="bg-primary p-3 rounded-xl text-white flex-shrink-0">
												<I3DCubeScan
													size={16}
													variant="Bold"
												/>
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm text-secondary">
													No. Resi
												</h3>
												<p className="font-semibold break-all">
													{shipment.tracking_number ||
														"Tidak tersedia"}
												</p>
											</div>
										</div>
									</div>
									{shipment.delivery_status && (
										<div className="flex items-center gap-3">
											<div className="bg-dark-green p-3 rounded-xl text-white flex-shrink-0">
												<Box size={16} variant="Bold" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm text-secondary">
													Status Pengiriman
												</h3>
												<Badge
													variant={getStatusBadgeVariant(
														shipment.delivery_status
													)}
													className="mt-1"
												>
													{getStatusLabel(
														shipment.delivery_status
													)}
												</Badge>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</div>

						<div className="flex flex-col gap-4 min-w-0">
							{/* Download PDF Button only when payment is paid*/}
							{shipment.payment_status === "PAID" && (
								<Button
									onClick={downloadPdf}
									disabled={downloadingPdf}
									className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
								>
									{downloadingPdf ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 flex-shrink-0" />
											<span className="truncate">
												Mengunduh PDF...
											</span>
										</>
									) : (
										<>
											<svg
												className="w-4 h-4 mr-2 flex-shrink-0"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
											<span className="truncate">
												Unduh PDF
											</span>
										</>
									)}
								</Button>
							)}

							{/* Shipment History */}
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Riwayat Pengiriman
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{shipment.shipment_history &&
									shipment.shipment_history.length > 0 ? (
										shipment.shipment_history
											.sort(
												(a, b) =>
													new Date(
														b.created_at
													).getTime() -
													new Date(
														a.created_at
													).getTime()
											)
											.map((history, index) => (
												<div
													key={history.id}
													className="flex gap-4"
												>
													<div className="flex flex-col items-center flex-shrink-0">
														<div
															className={`p-3 rounded-full text-white ${
																index === 0
																	? "bg-primary"
																	: index ===
																	  1
																	? "bg-dark-green"
																	: "bg-oranye"
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
															<div className="w-0.5 h-8 bg-gray-200 mt-2" />
														)}
													</div>
													<div className="flex-1 pb-4 min-w-0">
														<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
															<h3 className="font-semibold">
																{getStatusLabel(
																	history.status
																)}
															</h3>
															<span className="text-sm text-secondary flex-shrink-0">
																{formatDate(
																	history.created_at
																)}
															</span>
														</div>
														<p className="text-sm text-secondary break-words">
															{history.description ||
																`Status pengiriman diperbarui menjadi ${getStatusLabel(
																	history.status
																)}`}
														</p>
													</div>
												</div>
											))
									) : (
										<div className="text-center py-8 text-secondary">
											<Timer
												size={32}
												className="mx-auto mb-2 opacity-50"
											/>
											<p>Belum ada riwayat pengiriman</p>
										</div>
									)}
								</CardContent>
							</Card>

							{/* Pickup Proof */}
							{shipment.shipment_detail?.pickup_proof && (
								<Card className="rounded-2xl">
									<CardHeader>
										<CardTitle className="text-lg sm:text-xl font-semibold">
											Bukti Penjemputan
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="bg-gray-50 rounded-xl p-4 overflow-hidden">
												<img
													src={
														import.meta.env
															.VITE_API_BASE_URL +
														"/" +
														shipment.shipment_detail
															.pickup_proof
													}
													alt="Bukti Penjemputan"
													className="w-full h-auto max-h-96 object-contain rounded-lg"
													onError={(e) => {
														const target =
															e.target as HTMLImageElement;
														target.style.display =
															"none";
														target.nextElementSibling?.classList.remove(
															"hidden"
														);
													}}
												/>
												<div className="hidden text-center py-8 text-secondary">
													<Box
														size={32}
														className="mx-auto mb-2 opacity-50"
													/>
													<p>
														Gambar tidak dapat
														dimuat
													</p>
												</div>
											</div>
											<p className="text-sm text-secondary text-center">
												Foto yang diambil saat paket
												dijemput dari alamat penjemputan
											</p>
										</div>
									</CardContent>
								</Card>
							)}

							{/* Receipt Proof */}
							{shipment.shipment_detail?.receipt_proof && (
								<Card className="rounded-2xl">
									<CardHeader>
										<CardTitle className="text-lg sm:text-xl font-semibold">
											Bukti Penerimaan
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="bg-gray-50 rounded-xl p-4 overflow-hidden">
												<img
													src={
														import.meta.env
															.VITE_API_BASE_URL +
														"/" +
														shipment.shipment_detail
															.receipt_proof
													}
													alt="Bukti Penerimaan"
													className="w-full h-auto max-h-96 object-contain rounded-lg"
													onError={(e) => {
														const target =
															e.target as HTMLImageElement;
														target.style.display =
															"none";
														target.nextElementSibling?.classList.remove(
															"hidden"
														);
													}}
												/>
												<div className="hidden text-center py-8 text-secondary">
													<Box
														size={32}
														className="mx-auto mb-2 opacity-50"
													/>
													<p>
														Gambar tidak dapat
														dimuat
													</p>
												</div>
											</div>
											<p className="text-sm text-secondary text-center">
												Foto yang diambil saat paket
												diterima di alamat tujuan
											</p>
										</div>
									</CardContent>
								</Card>
							)}

							{/* Payment Details */}
							<Card className="bg-dark-green text-white rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Detail Pembayaran
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{shipment.shipment_detail ? (
										<>
											<div className="flex items-center justify-between gap-4">
												<div className="flex gap-3 min-w-0">
													<TruckTime
														size={20}
														variant="Bold"
														className="flex-shrink-0"
													/>
													<span className="font-medium">
														Biaya Dasar
													</span>
												</div>
												<span className="text-lg font-semibold flex-shrink-0">
													{formatPrice(
														shipment.shipment_detail
															.base_price
													)}
												</span>
											</div>
											<div className="flex items-center justify-between gap-4">
												<div className="flex gap-3 min-w-0">
													<Box
														size={20}
														variant="Bold"
														className="flex-shrink-0"
													/>
													<span className="font-medium">
														Biaya Berat
													</span>
												</div>
												<span className="text-lg font-semibold flex-shrink-0">
													{formatPrice(
														shipment.shipment_detail
															.weight_price
													)}
												</span>
											</div>
											<div className="flex items-center justify-between gap-4">
												<div className="flex gap-3 min-w-0">
													<Gps
														size={20}
														variant="Bold"
														className="flex-shrink-0"
													/>
													<span className="font-medium">
														Biaya Jarak
													</span>
												</div>
												<span className="text-lg font-semibold flex-shrink-0">
													{formatPrice(
														shipment.shipment_detail
															.distance_price
													)}
												</span>
											</div>
											<hr className="border-t border-white border-dashed" />
											<div className="flex items-center justify-between gap-4">
												<div className="flex gap-3 min-w-0">
													<CardPos
														size={20}
														variant="Bold"
														className="flex-shrink-0"
													/>
													<span className="font-semibold">
														Total Harga
													</span>
												</div>
												<span className="text-xl font-bold flex-shrink-0">
													{formatPrice(
														shipment.price
													)}
												</span>
											</div>
											<div className="mt-4 p-3 bg-white/10 rounded-xl">
												<div className="flex items-center justify-between gap-4">
													<span className="font-medium">
														Status Pembayaran
													</span>
													<Badge
														variant={
															shipment.payment_status ===
															"PAID"
																? "default"
																: "secondary"
														}
														className="bg-white text-dark-green flex-shrink-0"
													>
														{
															shipment.payment_status
														}
													</Badge>
												</div>
											</div>
											{shipment.payment_status ===
												"PENDING" &&
												shipment.payment
													?.invoice_url && (
													<Button
														onClick={() =>
															window.open(
																shipment.payment!
																	.invoice_url,
																"_blank"
															)
														}
														className="w-full bg-white text-dark-green hover:bg-gray-100 font-semibold"
													>
														<span className="truncate">
															Bayar Sekarang
														</span>
													</Button>
												)}
										</>
									) : (
										<div className="text-center py-8">
											<CardPos
												size={32}
												className="mx-auto mb-2 opacity-50"
											/>
											<p>
												Informasi pembayaran tidak
												tersedia
											</p>
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</Page>
		</>
	);
};
export default DetailPage;
