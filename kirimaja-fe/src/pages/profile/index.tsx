import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileFormData } from "@/lib/validations/profile";
import toast from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useProfile, useUpdateProfileWithAvatar } from "@/hooks/use-profile";
import { API_CONFIG } from "@/lib/api/config";

const Index = () => {
	const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Use custom meta hook instead of react-helmet
	useMeta(META_DATA.profile);

	const { data: profile, isLoading, error } = useProfile();
	const updateProfileMutation = useUpdateProfileWithAvatar();

	// React Hook Form setup
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: "",
			email: "",
			phone_number: "",
			password: "",
		},
	});

	// Handle avatar file selection
	const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}

			// Validate file size (e.g., max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image size should be less than 5MB");
				return;
			}

			setSelectedAvatar(file);

			// Create preview
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Remove avatar
	const removeAvatar = () => {
		setSelectedAvatar(null);
		setAvatarPreview("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	useEffect(() => {
		if (profile) {
			reset({
				name: profile.name,
				email: profile.email,
				phone_number: profile.phone_number,
				password: "",
			});
		}
	}, [profile, reset]);

	// Handle form submission
	const onSubmit = async (data: UpdateProfileFormData) => {
		try {
			const updateData = {
				name: data.name,
				phone_number: data.phone_number,
				avatar: selectedAvatar || undefined,
				password: data.password || undefined,
			};
			await updateProfileMutation.mutateAsync(updateData);
			reset({
				...data,
				password: "", // Reset password field after update
			});
		} catch (error) {
			console.error("Failed to update profile:", error);
		}
	};

	if (isLoading) {
		return (
			<Page title="Profile">
				<div className="flex items-center justify-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
						<p className="mt-2 text-gray-600">Loading profile...</p>
					</div>
				</div>
			</Page>
		);
	}

	if (error) {
		return (
			<Page title="Profile">
				<div className="flex items-center justify-center h-64">
					<div className="text-center">
						<p className="text-red-600">Failed to load profile</p>
						<Button
							onClick={() => window.location.reload()}
							className="mt-2"
						>
							Retry
						</Button>
					</div>
				</div>
			</Page>
		);
	}

	return (
		<>
			<Page title="Profile">
				<div className="grid grid-cols-1">
					<div className="space-y-6">
						<form 
							className="bg-gray-50 rounded-lg p-6" 
							onSubmit={handleSubmit(onSubmit)}
						>
							{/* Avatar Section */}
							<div className="flex gap-4 items-center mb-8">
								<div className="relative">
									<img
										src={
											avatarPreview ||
											(profile?.avatar
												? `${API_CONFIG.baseURL}/${profile.avatar}`
												: "/images/vespa-tiger.jpg")
										}
										alt="Profile"
										className="size-[100px] rounded-full object-cover border-4 border-white shadow-md"
									/>
									{selectedAvatar && (
										<Button
											type="button"
											variant="destructive"
											size="sm"
											className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
											onClick={removeAvatar}
										>
											×
										</Button>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<Button
										type="button"
										variant="darkGreen"
										className="px-6 py-2"
										onClick={() =>
											fileInputRef.current?.click()
										}
									>
										Ubah Foto
									</Button>
									<input
										type="file"
										ref={fileInputRef}
										accept="image/*"
										onChange={handleAvatarSelect}
										className="hidden"
									/>
								</div>
							</div>

							{/* Form Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Left Column */}
								<div className="space-y-6">
									{/* Email Field */}
									<div>
										<Label
											htmlFor="email"
											className="text-sm font-medium text-gray-700 mb-2 block"
										>
											Email
										</Label>
										<Input
											{...register("email")}
											id="email"
											type="email"
											className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-100"
											placeholder="superadmin@gmail.com"
											disabled
										/>
										{errors.email && (
											<p className="text-sm text-red-600 mt-1">
												{errors.email.message}
											</p>
										)}
									</div>
									{/* Name Field */}
									<div>
										<Label
											htmlFor="name"
											className="text-sm font-medium text-gray-700 mb-2 block"
										>
											Nama
										</Label>
										<Input
											{...register("name")}
											id="name"
											className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="Masukkan nama kamu"
										/>
										{errors.name && (
											<p className="text-sm text-red-600 mt-1">
												{errors.name.message}
											</p>
										)}
									</div>
								</div>

								{/* Right Column */}
								<div className="space-y-6">
									{/* Phone Number Field */}
									<div>
										<Label
											htmlFor="phone_number"
											className="text-sm font-medium text-gray-700 mb-2 block"
										>
											Nomor Telepon
										</Label>
										<Input
											{...register("phone_number")}
											id="phone_number"
											type="tel"
											className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="Masukkan nomor telepon"
										/>
										{errors.phone_number && (
											<p className="text-sm text-red-600 mt-1">
												{errors.phone_number.message}
											</p>
										)}
									</div>

									{/* Password Field */}
									<div>
										<Label
											htmlFor="password"
											className="text-sm font-medium text-gray-700 mb-2 block"
										>
											Password Baru
										</Label>
										<Input
											{...register("password")}
											id="password"
											type="password"
											className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="Masukkan password baru (opsional)"
										/>
										{errors.password && (
											<p className="text-sm text-red-600 mt-1">
												{errors.password.message}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col gap-4 mt-8">
								<Button
									type="submit"
									variant="darkGreen"
									className="py-3"
									disabled={updateProfileMutation.isPending}
								>
									{updateProfileMutation.isPending
										? "Memperbarui..."
										: "Perbarui Profile"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Page>
		</>
	);
};
export default Index;
