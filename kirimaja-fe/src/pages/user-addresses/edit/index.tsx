import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import type { UserAddress } from "@/lib/api/types/user-address";
import { Upload, MapPin, Slash } from "lucide-react";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	updateUserAddressSchema,
	type UpdateUserAddressFormData,
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
// Import dummy data
import { userAddresses } from "@/data/user-addresses";

// Get the API base URL for image handling
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const getImageUrl = (photoPath: string) => {
	if (!photoPath) return "";
	if (photoPath.startsWith("http")) return photoPath;
	return `${API_BASE_URL}/${photoPath.replace(/^\//, "")}`;
};

export default function EditUserAddressPage() {
	// Use custom meta hook
	useMeta(META_DATA["user-addresses-edit"]);
	const navigate = useNavigate();
	const { id: addressId } = useParams();

	const [loading, setLoading] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
	const [, setSelectedPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
		reset,
	} = useForm<UpdateUserAddressFormData>({
		resolver: zodResolver(updateUserAddressSchema),
		defaultValues: {
			address: "",
			tag: "",
			label: "",
			photo: undefined,
		},
	});

	useEffect(() => {
		if (!addressId) {
			toast.error("Address ID is required");
			navigate("/user-addresses");
			return;
		}

		const fetchAddress = async () => {
			try {
				// Find address in dummy data
				const id = parseInt(addressId);
				const foundAddress = userAddresses.find(
					(addr) => addr.id === id
				);

				if (!foundAddress) {
					throw new Error("Address not found");
				}

				// Convert the dummy data to match the UserAddress type
				const data: UserAddress = {
					id: foundAddress.id,
					user_id: foundAddress.user_id,
					address: foundAddress.address,
					tag: foundAddress.tag,
					label: foundAddress.label,
					photo: foundAddress.photo,
					latitude: foundAddress.latitude || 0,
					longitude: foundAddress.longitude || 0,
					created_at: foundAddress.created_at,
					updated_at: foundAddress.updated_at,
					user: foundAddress.user,
				};

				setUserAddress(data);

				// Update form values using React Hook Form
				reset({
					address: data.address,
					tag: data.tag,
					label: data.label,
					photo: undefined,
				});

				// Set photo preview with proper base URL
				if (data.photo) {
					setPhotoPreview(getImageUrl(data.photo));
				}
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Failed to fetch address";
				toast.error(errorMessage);
				navigate("/user-addresses");
			} finally {
				setFetchLoading(false);
			}
		};

		fetchAddress();
	}, [addressId, navigate, reset]);

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

	const onSubmit = async (data: UpdateUserAddressFormData) => {
		if (!userAddress) return;

		setLoading(true);

		try {
			// Simulate API update with timeout
			await new Promise((resolve) => setTimeout(resolve, 800));

			// For development with dummy data, just show success message
			// Address update simulation completed
			console.log("Submitting updated address data:", data);

			toast.success("Alamat berhasil diperbarui");
			navigate("/user-addresses");
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Gagal memperbarui alamat";
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (fetchLoading) {
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
								<BreadcrumbPage>Edit Alamat</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="my-4">
						<h1 className="text-3xl font-bold">Edit Alamat 🏠</h1>
					</div>

					<div className="rounded-xl bg-white p-6 shadow-sm border">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div className="flex flex-col justify-center space-y-6">
								<Skeleton className="h-4 w-[200px]" />
								<Skeleton className="h-20 w-full" />
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
							<div className="flex flex-col justify-center">
								<Skeleton className="h-64 w-full" />
								<div className="mt-4">
									<Skeleton className="h-10 w-full" />
								</div>
							</div>
						</div>
					</div>
				</main>
			</>
		);
	}

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
							<BreadcrumbPage>Edit Alamat</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="my-4">
					<h1 className="text-3xl font-bold">Edit Alamat 🏠</h1>
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

								{/* Nama Alamat Section */}
								<div className="space-y-2">
									<Label
										htmlFor="label"
										className="text-sm font-medium text-gray-700"
									>
										Nama Alamat
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
										{loading
											? "Menyimpan..."
											: "Simpan Perubahan"}
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
