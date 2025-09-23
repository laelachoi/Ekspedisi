import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, MapPin, Slash } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createUserAddressSchema,
	type CreateUserAddressFormData,
} from "@/lib/validations/user-address";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { Textarea } from "@/components/ui/textarea";

export default function AddUserAddressPage() {
	// Use custom meta hook
	useMeta(META_DATA["user-addresses-add"]);

	const [loading, setLoading] = useState(false);
	const [, setSelectedPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<CreateUserAddressFormData>({
		resolver: zodResolver(createUserAddressSchema),
		defaultValues: {
			address: "",
			tag: "",
			label: "",
			photo: undefined,
		},
	});

	const onSubmit = async (data: CreateUserAddressFormData) => {
		try {
			setLoading(true);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log("Address data:", data);
			// Handle successful submission here
		} catch (error) {
			console.error("Error adding address:", error);
		} finally {
			setLoading(false);
		}
	};

	const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedPhoto(file);
			setValue("photo", file);
			trigger("photo");

			// Create preview URL
			const reader = new FileReader();
			reader.onload = (e) => {
				setPhotoPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removePhoto = () => {
		setSelectedPhoto(null);
		setPhotoPreview("");
		setValue("photo", undefined);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<>
			<main className="px-8 py-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/user-addresses">
								Alamat Saya
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash size={16} />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>Tambah Alamat</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="my-4">
					<h1 className="text-3xl font-bold">Tambah Alamat 🏠</h1>
				</div>

				<div className="rounded-xl bg-white p-6 shadow-sm border">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Left side - Form Fields */}
							<div className="flex flex-col justify-center space-y-6">
								{/* Alamat Saya Section */}
								<div className="space-y-2">
									<Label
										htmlFor="address"
										className="text-sm font-medium text-gray-700"
									>
										Alamat Saya
									</Label>
									<div className="relative">
										<Textarea
											id="address"
											placeholder="Masukkan alamat penjemputan"
											{...register("address")}
											rows={3}
											className="w-full border-gray-300 rounded-lg resize-none"
										/>
										<MapPin className="absolute right-3 top-3 h-4 w-4 text-cyan-500" />
									</div>
									{errors.address && (
										<p className="text-sm text-red-600">
											{errors.address.message}
										</p>
									)}
								</div>

								{/* Patokan Section */}
								<div className="space-y-2">
									<Label
										htmlFor="tag"
										className="text-sm font-medium text-gray-700"
									>
										Patokan
									</Label>
									<Input
										id="tag"
										placeholder="Masukkan patokan alamat kamu"
										{...register("tag")}
										className="w-full border-gray-300 rounded-lg"
									/>
									{errors.tag && (
										<p className="text-sm text-red-600">
											{errors.tag.message}
										</p>
									)}
								</div>

								{/* Label alamat Section */}
								<div className="space-y-2">
									<Label
										htmlFor="label"
										className="text-sm font-medium text-gray-700"
									>
										Label alamat
									</Label>
									<Input
										id="label"
										placeholder="Contoh: Sekolah, Rumah Ibu"
										{...register("label")}
										className="w-full border-gray-300 rounded-lg"
									/>
									{errors.label && (
										<p className="text-sm text-red-600">
											{errors.label.message}
										</p>
									)}
								</div>

								{/* Submit Button */}
								<div className="pt-4">
									<Button
										variant="darkGreen"
										type="submit"
										disabled={loading}
										className="w-full"
									>
										{loading ? "Menyimpan..." : "Simpan"}
									</Button>
								</div>
							</div>

							{/* Right side - Image Preview */}
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<Label className="text-sm font-medium text-gray-700">
										Gambar Patokan
									</Label>

									{photoPreview ? (
										<div className="relative">
											<img
												src={photoPreview}
												alt="Address preview"
												className="w-full h-64 object-cover rounded-lg border"
											/>
											<Button
												type="button"
												variant="destructive"
												size="sm"
												className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
												onClick={removePhoto}
											>
												×
											</Button>
										</div>
									) : (
										<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-64 flex flex-col justify-center">
											<div className="flex flex-col items-center space-y-2">
												<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
													<Upload className="h-8 w-8 text-gray-400" />
												</div>
												<div className="text-sm text-gray-500 text-center">
													<p>
														Tambahkan gambar patokan
														rumah kamu 🏠
													</p>
													<p>
														agar kurir dapat
														menemukan lokasi kamu
													</p>
													<p>
														dengan cepat dan tepat
														📍
													</p>
												</div>
											</div>
										</div>
									)}

									<Input
										type="file"
										ref={fileInputRef}
										accept="image/*"
										onChange={handlePhotoSelect}
										className="hidden"
									/>
									<Button
										type="button"
										variant="outline"
										onClick={() =>
											fileInputRef.current?.click()
										}
										className="w-full"
									>
										{photoPreview
											? "Ganti Gambar"
											: "Choose file"}
										<span className="ml-2 text-gray-400">
											No file chosen
										</span>
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
