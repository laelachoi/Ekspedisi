import { Button } from "@/components/ui/button";
import { deliveries } from "@/data/deliveries";
import {
	AddSquare,
	BoxTick,
	PercentageCircle,
	Timer,
	TruckTime,
} from "iconsax-reactjs";
import { columns } from "./components/deliveries/columns";
import { DataTable } from "./components/deliveries/data-table";
import { Link } from "react-router";
import { Page } from "@/components/ui/page";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis } from "recharts";
import { useMeta, META_DATA } from "@/hooks/use-meta";

const Index = () => {
	// Use custom meta hook
	useMeta(META_DATA.dashboard);

	const chartData = [
		{ name: "Elektronik", value: 120 },
		{ name: "Pakaian", value: 90 },
		{ name: "Makanan", value: 75 },
		{ name: "Olahraga", value: 60 },
		{ name: "Peralatan", value: 45 },
	];
	const chartConfig = {
		sales: {
			color: "#2563eb",
		},
	} satisfies ChartConfig;
	return (
		<>
			<Page>
				<div className="w-full max-w-full overflow-hidden">
					<div className="flex flex-col lg:flex-row gap-3 mb-4">
						<div className="relative overflow-hidden bg-primary rounded-2xl px-6 py-5 text-white w-full lg:w-80 lg:flex-shrink-0">
							<div
								id="overlay"
								className="absolute inset-0 bg-gradient-to-r from-dark-green to-primary/20 z-10"
							/>
							<div className="flex flex-col h-full gap-2 relative z-20">
								<h1 className="text-xl sm:text-2xl font-semibold">
									Pengiriman Cepat, Tanpa Hambatan!
								</h1>
								<p className="text-sm sm:text-base">
									Pengiriman paket tepat waktu, aman, dan
									efisien!
								</p>
								<Link to={"/send-package/add"}>
									<Button className="bg-white mt-2 text-dark-green hover:bg-white/80 h-10 w-full shadow-md shadow-black/20">
										<span>Lihat Pengiriman</span>
										<AddSquare
											className="ml-auto"
											variant="Bold"
											size="20"
										/>
									</Button>
								</Link>
							</div>
							<img
								src="/images/pizza-delivery.png"
								alt="Illustration"
								className="absolute w-32 sm:w-40 lg:w-48 bottom-0 -right-4 sm:-right-8 lg:-right-12"
							/>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 flex-1 min-w-0">
							<div className="bg-white h-full rounded-xl w-full p-4 sm:p-6 flex flex-col gap-3 items-center min-w-0">
								<img
									src="/images/box-right-up.png"
									alt=""
									width={60}
									height={48}
									className="sm:w-[75px] sm:h-[60px]"
								/>
								<div className="text-center min-w-0">
									<div className="font-medium text-xs sm:text-sm">
										Total New Order
									</div>
									<div className="text-2xl sm:text-[32px] font-semibold mt-0.5">
										344
									</div>
								</div>
							</div>
							<div className="bg-white h-full rounded-xl w-full p-4 sm:p-6 flex flex-col gap-3 items-center min-w-0">
								<img
									src="/images/box-receipt.png"
									alt=""
									width={60}
									height={48}
									className="sm:w-[75px] sm:h-[60px]"
								/>
								<div className="text-center min-w-0">
									<div className="font-medium text-xs sm:text-sm">
										Ready for Ship
									</div>
									<div className="text-2xl sm:text-[32px] font-semibold mt-0.5">
										344
									</div>
								</div>
							</div>
							<div className="bg-white h-full rounded-xl w-full p-4 sm:p-6 flex flex-col gap-3 items-center min-w-0">
								<img
									src="/images/box-with-clock.png"
									alt=""
									width={60}
									height={48}
									className="sm:w-[75px] sm:h-[60px]"
								/>
								<div className="text-center min-w-0">
									<div className="font-medium text-xs sm:text-sm">
										Pending Shipment
									</div>
									<div className="text-2xl sm:text-[32px] font-semibold mt-0.5">
										344
									</div>
								</div>
							</div>
							<div className="bg-white h-full rounded-xl w-full p-4 sm:p-6 flex flex-col gap-3 items-center min-w-0">
								<img
									src="/images/box-right-down.png"
									alt=""
									width={60}
									height={48}
									className="sm:w-[75px] sm:h-[60px]"
								/>
								<div className="text-center min-w-0">
									<div className="font-medium text-xs sm:text-sm">
										Total Delivery
									</div>
									<div className="text-2xl sm:text-[32px] font-semibold mt-0.5">
										344
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
						<div className="flex flex-col gap-4 min-w-0">
							<DataTable
								title="Tugas Pengiriman Hari Ini"
								data={deliveries}
								columns={columns}
							/>
							<Card className="rounded-2xl bg-gradient-to-l text-white from-primary to-dark-green">
								<CardContent className="flex flex-col sm:flex-row gap-4 items-center">
									<div className="flex-1 text-center sm:text-left min-w-0">
										<h2 className="font-semibold text-2xl sm:text-[32px]">
											Save Up to 45%
										</h2>
										<p className="text-sm sm:text-base">
											Jangan lewatkan, klaim diskon kamu
											dan kirim dengan biaya yang lebih
											murah
										</p>
									</div>
									<Button
										variant={"outline"}
										className="text-dark-green rounded-xl flex-shrink-0"
									>
										<span className="hidden sm:inline">
											Ambil Diskon
										</span>
										<span className="sm:hidden">
											Diskon
										</span>
										<PercentageCircle
											className="ml-auto"
											variant="Bold"
											size="20"
										/>
									</Button>
								</CardContent>
							</Card>
						</div>
						<div className="flex flex-col gap-4 min-w-0">
							<Card className=" from-primary to-white bg-top-right bg-radial-[at_100%_0%] rounded-2xl to-45%">
								<CardHeader>
									<CardTitle>
										<h2 className="text-lg sm:text-xl font-semibold">
											Pengiriman Terakhir
										</h2>
										<p className="text-secondary font-normal text-xs sm:text-sm">
											Kategori produk yang paling sering
											dikirimkan
										</p>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer config={chartConfig}>
										<BarChart
											data={chartData}
											accessibilityLayer
										>
											<Bar
												dataKey="value"
												className="hover:cursor-pointer hover:fill-primary fill-secondary"
												radius={4}
											/>
											<XAxis
												dataKey="name"
												axisLine={false}
												tickLine={false}
											/>
										</BarChart>
									</ChartContainer>
								</CardContent>
							</Card>
							<Card className="rounded-2xl">
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl font-semibold">
										Status Pengiriman
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
										<div className="flex items-center gap-3 shrink-0">
											<div className="bg-primary p-3 sm:p-4 rounded-full text-white">
												<Timer
													size={20}
													variant="Bold"
												/>
											</div>
											<h3 className="text-secondary text-sm">
												9 April
											</h3>
										</div>
										<div className="flex-1 min-w-0">
											<h2 className="font-semibold text-sm sm:text-base">
												Final Delivery
											</h2>
											<p className="font-medium text-secondary text-xs sm:text-sm">
												Paket kamu tiba di tujuan tepat
												waktu
											</p>
										</div>
									</div>
									<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
										<div className="flex items-center gap-3 shrink-0">
											<div className="bg-dark-green p-3 sm:p-4 rounded-full text-white">
												<TruckTime
													size={20}
													variant="Bold"
												/>
											</div>
											<h3 className="text-secondary text-sm">
												9 April
											</h3>
										</div>
										<div className="flex-1 min-w-0">
											<h2 className="font-semibold text-sm sm:text-base">
												Shipping in Progress
											</h2>
											<p className="font-medium text-secondary text-xs sm:text-sm">
												Paket akan disortir dan siap
												untuk diantarkan ke alamat
												tujuan
											</p>
										</div>
									</div>
									<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
										<div className="flex items-center gap-3 shrink-0">
											<div className="bg-oranye p-3 sm:p-4 rounded-full text-white">
												<BoxTick
													size={20}
													variant="Bold"
												/>
											</div>
											<h3 className="text-secondary text-sm">
												9 April
											</h3>
										</div>
										<div className="flex-1 min-w-0">
											<h2 className="font-semibold text-sm sm:text-base">
												Shipment Preparation
											</h2>
											<p className="font-medium text-secondary text-xs sm:text-sm">
												Paket sedang dijadwalkan untuk
												diambil oleh kurir
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</Page>
		</>
	);
};

export default Index;
