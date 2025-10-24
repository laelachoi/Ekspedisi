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
import {
	deliveryFormSchema,
	type DeliveryFormData,
} from "@/lib/validations/shipment";
import { useUserAddresses } from "@/hooks/use-user-address";
import { useCreateShipment } from "@/hooks/use-shipment";
import { useProfile } from "@/hooks/use-profile";

export function DeliveryForm() {
	const [loading, setLoading] = useState(false);
	const { data: userAddresses = [], isLoading: addressesLoading } = useUserAddresses();
	const createShipment = useCreateShipment();
	const { data: user } = useProfile();
	const navigate = useNavigate();

	const form = useForm<DeliveryFormData>({
		resolver: zodResolver(deliveryFormSchema),
		defaultValues: {
			senderPhone: user?.phone_number || "",
			totalWeight: 500,
			senderName: user?.name || "",
		},
	});

	// Update form when user data is available
	useEffect(() => {
		if (user) {
			form.setValue("senderName", user.name || "");
			form.setValue("senderPhone", user.phone_number || "");
		}
	}, [user, form]);

	useEffect(() => {
		if (!addressesLoading && userAddresses.length === 0) {
			navigate("/send-package/no-address");
		}
	}, [userAddresses.length, addressesLoading, navigate]);

	async function onSubmit(values: DeliveryFormData) {
		try {
			setLoading(true);

			// Validate form data before proceeding
			if (!values.pickupLocationId || !values.deliveryLocation) {
				toast.error("Mohon lengkapi semua data yang diperlukan");
				return;
			}

			// Create shipment using API
			const shipmentData = {
				pickup_address_id: parseInt(values.pickupLocationId),
				destination_address: values.deliveryLocation,
				recipient_name: values.receiverName,
				recipient_phone: values.receiverPhone,
				weight: values.totalWeight,
				package_type: values.packageType,
				delivery_type: values.shippingType,
			};

			const shipment = await createShipment.mutateAsync(shipmentData);

			// Redirect to payment page with shipment ID
			navigate(`/send-package/pay/${shipment.id}`);
		} catch (error) {
			console.error("Failed to create shipment:", error);
			toast.error("Gagal membuat pengiriman. Silakan coba lagi.");
		} finally {
			setLoading(false);
		}
	}

	if (addressesLoading) {
		return (
			<Card className="mx-auto">
				<CardHeader>
					<CardTitle>Detail Pengiriman</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
					</div>
				</CardContent>
			</Card>
		);
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
															{userAddresses.map(
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
														<SelectItem value="regular">
															Regular (3-5 hari) -
															Rp 5.000
														</SelectItem>
														<SelectItem value="same_day">
															Sameday (6–8 jam) -
															Rp 15.000
														</SelectItem>
														<SelectItem value="next_day">
															Next Day (1–2 hari)
															- Rp 10.000
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
