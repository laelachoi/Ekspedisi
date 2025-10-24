import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page, type PageBreadcrumbItem } from "@/components/ui/page";
import {
	Box,
	CallIncoming,
	CallOutgoing,
	Gps,
	I3DCubeScan,
	Location,
	Profile,
	Profile2User,
	TruckTime,
} from "iconsax-reactjs";
import { Slash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useShipment } from "@/hooks/use-shipment";

const DetailPage = () => {
	// Use custom meta hook
	useMeta(META_DATA["send-package-pay"]);
	const { id } = useParams();
	const navigate = useNavigate();

	const shipmentId = id ? parseInt(id) : 0;
	
	const { data: shipment, isLoading: loading, error } = useShipment(shipmentId);

	useEffect(() => {
		if (!shipmentId) {
			toast.error("ID pengiriman tidak valid");
			navigate("/send-package");
			return;
		}
	}, [shipmentId, navigate]);

	const handlePayment = async () => {
		if (!shipment || !shipment.payment?.invoice_url) {
			toast.error("URL pembayaran tidak tersedia");
			return;
		}

		// Open the invoice URL in a new tab
		window.open(shipment.payment.invoice_url, "_blank");
		toast.success("Redirecting to payment page...");
	};

	if (error) {
		toast.error("Gagal memuat data pengiriman");
		navigate("/send-package");
		return null;
	}

	if (loading) {
		return (
			<Page title="Pembayaran Pengiriman">
				<div className="flex items-center justify-center h-64">
					<p>Memuat data pengiriman...</p>
				</div>
			</Page>
		);
	}

	if (!shipment) {
		return null;
	}

	const breadcrumbs: PageBreadcrumbItem[] = [
		{
			label: "Kirim Paket",
			href: "/send-package",
		},
		{
			label: "Pembayaran",
			href: `/send-package/pay/${shipment.id}`,
		},
	];
	return (
		<>
			<Page
				title="Pengiriman Product"
				breadcrumbs={{
					items: breadcrumbs,
					separator: <Slash size={16} />,
				}}
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
					<Card className="rounded-2xl">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								Detail Pengiriman
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="bg-primary p-4 rounded-2xl text-white">
									<Profile size={20} variant="Bold" />
								</div>
								<div className="space-y-2">
									<h2 className="font-semibold">
										{shipment.shipment_detail.user.name ||
											"Nama tidak tersedia"}
									</h2>
									<p className="text-sm text-secondary">
										Pengirim
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="bg-primary p-4 rounded-2xl text-white">
									<Gps size={20} variant="Bold" />
								</div>
								<div className="space-y-2">
									<h2 className="font-semibold">
										{shipment.shipment_detail?.address
											.address || "Alamat tidak tersedia"}
									</h2>
									<p className="text-sm text-secondary">
										Alamat Pengirim
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="bg-primary p-4 rounded-2xl text-white">
									<CallIncoming size={20} variant="Bold" />
								</div>
								<div className="space-y-2">
									<h2 className="font-semibold">
										{shipment.shipment_detail.user
											?.phone_number ||
											"Nomor tidak tersedia"}
									</h2>
									<p className="text-sm text-secondary">
										Nomor Telepon Pengirim
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="bg-oranye p-4 rounded-2xl text-white">
									<Profile2User size={20} variant="Bold" />
								</div>
								<div className="space-y-2">
									<h2 className="font-semibold">
										{shipment.shipment_detail
											?.recipient_name ||
											"Nama tidak tersedia"}
									</h2>
									<p className="text-sm text-secondary">
										Penerima
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
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
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="bg-oranye p-4 rounded-2xl text-white">
									<CallOutgoing size={20} variant="Bold" />
								</div>
								<div className="space-y-2">
									<h2 className="font-semibold">
										{shipment.shipment_detail
											?.recipient_phone ||
											"Nomor tidak tersedia"}
									</h2>
									<p className="text-sm text-secondary">
										Nomor Telepon Penerima
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-dark-green text-white rounded-2xl">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								Detail Pembayaran
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between">
								<div className="flex gap-3">
									<TruckTime size={20} variant="Bold" />
									<span className="font-semibold">
										Biaya Dasar
									</span>
								</div>
								<span className="text-lg font-semibold">
									Rp{" "}
									{shipment.shipment_detail?.base_price?.toLocaleString() ||
										"0"}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-3">
									<Box size={20} variant="Bold" />
									<span className="font-semibold">
										Biaya Berat (
										{(
											shipment.shipment_detail?.weight /
											1000
										).toFixed(1) || "0.5"}{" "}
										kg)
									</span>
								</div>
								<span className="text-lg font-semibold">
									Rp{" "}
									{shipment.shipment_detail?.weight_price?.toLocaleString() ||
										"0"}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-3">
									<I3DCubeScan size={20} variant="Bold" />
									<span className="font-semibold">
										Biaya Jarak (
										{shipment.distance?.toFixed(1) || "0"}{" "}
										km)
									</span>
								</div>
								<span className="text-lg font-semibold">
									Rp{" "}
									{shipment.shipment_detail?.distance_price?.toLocaleString() ||
										"0"}
								</span>
							</div>
							<hr className="border-t border-white border-dashed" />
							<div className="flex items-center justify-between">
								<div className="flex gap-3">
									<I3DCubeScan size={20} variant="Bold" />
									<span className="font-semibold">
										Total Pembayaran
									</span>
								</div>
								<span className="text-lg font-semibold">
									Rp {shipment.price?.toLocaleString() || "0"}
								</span>
							</div>
							<Button
								className="bg-white text-dark-green hover:bg-white/80 h-10 w-full shadow-md shadow-black/20"
								onClick={handlePayment}
							>
								Bayar Sekarang
							</Button>
						</CardContent>
					</Card>
				</div>
			</Page>
		</>
	);
};
export default DetailPage;
