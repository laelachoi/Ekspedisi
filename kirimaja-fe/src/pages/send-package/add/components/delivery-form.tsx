import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { DirectboxReceive, DirectboxSend } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { UserAddressItem } from "@/data/user-addresses";
import { userAddresses } from "@/data/user-addresses";
import {
	deliveryFormSchema,
	type DeliveryFormData,
} from "@/lib/validations/shipment";

export function DeliveryForm() {
	const [userAddressesState, setUserAddressesState] = useState<
		UserAddressItem[]
	>([]);
	const [loading, setLoading] = useState(false);
	const [addressesLoading, setAddressesLoading] = useState(true);
	const navigate = useNavigate();
	const user = { id: 1, name: "Demo User", phone_number: "081234567890" }; // Mock user for demo

	const form = useForm<DeliveryFormData>({
		resolver: zodResolver(deliveryFormSchema),
		defaultValues: {
			senderPhone: user?.phone_number || "",
			totalWeight: 500,
			senderName: user?.name || "",
		},
	});

	// Load user addresses on component mount
	useEffect(() => {
		const loadUserAddresses = async () => {
			try {
				setAddressesLoading(true);
				// Use mock data instead of API call
				const addresses = userAddresses;
				setUserAddressesState(addresses);

				if (addresses.length === 0) {
					toast.error(
						"Anda belum memiliki alamat. Silakan tambah alamat terlebih dahulu."
					);
				}
			} catch (error) {
				console.error("Failed to load user addresses:", error);
				toast.error("Gagal memuat alamat pengguna");
			} finally {
				setAddressesLoading(false);
			}
		};

		loadUserAddresses();
	}, []);

	// Update form when user data is available
	useEffect(() => {
		if (user) {
			form.setValue("senderName", user.name || "");
			form.setValue("senderPhone", user.phone_number || "");
		}
	}, [user, form]);

	async function onSubmit(values: DeliveryFormData) {
		if (userAddressesState.length === 0) {
			toast.error(
				"Anda belum memiliki alamat. Silakan tambah alamat terlebih dahulu."
			);
			return;
		}

		try {
			setLoading(true);

			// Validate form data before proceeding
			if (!values.pickupLocationId || !values.deliveryLocation) {
				toast.error("Mohon lengkapi semua data yang diperlukan");
				return;
			}

			// Mock shipment creation - in real app would call API
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const mockShipmentId = Math.floor(Math.random() * 1000) + 1;

			toast.success("Pengiriman berhasil dibuat!");

			// Redirect to payment page with shipment ID
			navigate(`/send-package/pay/${mockShipmentId}`);
		} catch (error) {
			console.error("Failed to create shipment:", error);
			toast.error("Gagal membuat pengiriman. Silakan coba lagi.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card className="mx-auto">
			<CardHeader>
				<CardTitle>Detail Pengiriman</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
							<div className="space-y-6">
								<FormField
									control={form.control}
									name="pickupLocationId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Lokasi Jemput</FormLabel>
											<FormControl>
												{addressesLoading ? (
													<Input
														disabled
														placeholder="Memuat alamat..."
														startIcon={
															DirectboxSend
														}
														iconProps={{
															className:
																"text-primary",
															variant: "Bold",
														}}
													/>
												) : (
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<SelectTrigger className="w-full h-12 px-4 text-base bg-gray-50 border-gray-200 focus:bg-white focus:border-primary rounded-lg transition-colors">
															<div className="flex items-center">
																<DirectboxSend
																	className="text-primary mr-2"
																	size={20}
																	variant="Bold"
																/>
																<SelectValue placeholder="Pilih alamat jemput" />
															</div>
														</SelectTrigger>
														<SelectContent>
															{userAddressesState.map(
																(address) => (
																	<SelectItem
																		key={
																			address.id
																		}
																		value={address.id.toString()}
																	>
																		<div className="flex flex-col">
																			<span className="font-medium">
																				{
																					address.label
																				}{" "}
																				-{" "}
																				{
																					address.address
																				}
																			</span>
																		</div>
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
												)}
											</FormControl>
											<FormMessage />
											{userAddressesState.length === 0 &&
												!addressesLoading && (
													<p className="text-sm text-red-500">
														Belum ada alamat.{" "}
														<button
															type="button"
															className="underline"
															onClick={() =>
																navigate(
																	"/user-addresses/add"
																)
															}
														>
															Tambah alamat
														</button>
													</p>
												)}
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="deliveryLocation"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Lokasi Pengiriman
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Jalan Kayu Manis No. 10"
													startIcon={DirectboxReceive}
													iconProps={{
														className:
															"text-warning",
														variant: "Bold",
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="senderName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Pengirim</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Masukkan nama pengirim"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="senderPhone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Nomor Telepon Pengirim
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Masukkan nomor telepon pengirim"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shippingType"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>
												Jenis Pengiriman
											</FormLabel>
											<FormControl>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full h-12 px-4 text-base bg-gray-50 border-gray-200 focus:bg-white focus:border-primary rounded-lg transition-colors">
															<SelectValue placeholder="Pilih jenis pengiriman" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="REGULAR">
															Regular (3-5 hari) -
															Rp 8.000
														</SelectItem>
														<SelectItem value="sameday">
															Sameday (6–8 jam) -
															Rp 15.000
														</SelectItem>
														<SelectItem value="nextday">
															Next Day (1–2 hari)
															- Rp 13.000
														</SelectItem>
														<SelectItem value="instant">
															Instant (2–4 jam) -
															Rp 10.000
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="space-y-6">
								<FormField
									control={form.control}
									name="receiverName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Penerima</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Masukkan nama penerima"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="receiverPhone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Nomor Telepon Penerima
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Masukkan nomor telepon penerima"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="totalWeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Total Berat (gram)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													step="10"
													min="100"
													placeholder="Masukkan berat paket dalam gram (contoh: 500)"
													onChange={(e) =>
														field.onChange(
															parseFloat(
																e.target.value
															) || 0
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="packageType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Paketnya berupa apa?
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full h-12 px-4 text-base bg-gray-50 border-gray-200 focus:bg-white focus:border-primary rounded-lg transition-colors">
														<SelectValue placeholder="Pilih jenis paket" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="furniture">
														Furniture
													</SelectItem>
													<SelectItem value="electronics">
														Elektronik
													</SelectItem>
													<SelectItem value="clothing">
														Pakaian
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="w-full bg-dark-green"
									disabled={loading}
								>
									{loading ? "Memproses..." : "Lanjut"}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
