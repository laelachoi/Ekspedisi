"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeliverToBranch, useDeliverToCustomer, usePickFromBranch, usePickShipment, usePickupFromBranch, usePickupShipment } from "@/hooks/use-delivery";
import { ShipmentStatus, type Shipment } from "@/lib/api/types/shipment";
import { Camera, Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Detail from "../detail";

interface ActionButtonsProps {
	shipment: Shipment;
	onActionComplete: () => void;
}

function ActionButtons({ shipment, onActionComplete }: ActionButtonsProps) {
	const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
	const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [actionType, setActionType] = useState<"pickup" | "deliver">(
		"pickup"
	);
	const [isDetailOpen, setIsDetailOpen] = useState(false);

    const pickShipment = usePickShipment();
    const pickupShipment = usePickupShipment();
    const deliverToBranch = useDeliverToBranch();
    const pickFromBranch = usePickFromBranch();
    const pickupFromBranch = usePickupFromBranch();
    const deliverToCustomer = useDeliverToCustomer();

	const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				toast.error("Harap pilih file gambar");
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				toast.error("Ukuran file maksimal 5MB");
				return;
			}

			setSelectedPhoto(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setPhotoPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePhotoUpload = async () => {
		if (!selectedPhoto || !shipment.tracking_number) {
			toast.error("Foto belum dipilih");
			return;
		}

		try {
			if (actionType === "pickup") {
				await pickupShipment.mutateAsync({
                    trackingNumber: shipment.tracking_number,
                    photo: selectedPhoto,
                });
			} else {
				await deliverToCustomer.mutateAsync({
                    trackingNumber: shipment.tracking_number,
                    photo: selectedPhoto,
                });
			}

			setIsPhotoDialogOpen(false);
			setSelectedPhoto(null);
			setPhotoPreview(null);
			onActionComplete();
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Gagal mengunggah foto";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const openPhotoDialog = (type: "pickup" | "deliver") => {
		setActionType(type);
		setIsPhotoDialogOpen(true);
	};

	const handlePickShipment = async () => {
		if (!shipment.tracking_number) return;
		try {
			await pickShipment.mutateAsync(shipment.tracking_number);
			onActionComplete();
		} catch {
			// Error handled by hook
		}
	}

	const handleDeliverToBranch = async () => {
		if (!shipment.tracking_number) return;
		try {
			await deliverToBranch.mutateAsync(shipment.tracking_number);
			onActionComplete();
		} catch {
			// Error handled by hook
		}
	}

	const handlePickFromBranch = async () => {
		if (!shipment.tracking_number) return;
		try {
			await pickFromBranch.mutateAsync(shipment.tracking_number);
			onActionComplete();
		} catch {
			// Error handled by hook
		}
	}

	const handlePickupFromBranch = async () => {
		if (!shipment.tracking_number) return;
		try {
			await pickupFromBranch.mutateAsync(shipment.tracking_number);
			onActionComplete();
		} catch {
			// Error handled by hook
		}
	}

	// Determine which buttons to show based on delivery status
	const renderActionButtons = () => {
		if (!shipment.tracking_number) return null;

		const isLoading =
			pickShipment.isPending ||
			pickupShipment.isPending ||
			deliverToBranch.isPending ||
			pickFromBranch.isPending ||
			pickupFromBranch.isPending ||
			deliverToCustomer.isPending;

		switch (shipment.delivery_status) {
			case ShipmentStatus.READY_TO_PICKUP:
				return (
					<>
						<Button
							variant="darkGreen"
							size="sm"
							onClick={handlePickShipment}
							disabled={isLoading}
						>
							Pick
						</Button>
					</>
				);
			case ShipmentStatus.WAITING_PICKUP:
				return (
					<>
						<Button
							variant="darkGreen"
							size="sm"
							onClick={() => openPhotoDialog("pickup")}
							disabled={isLoading}
						>
							<Camera className="w-4 h-4 mr-1" />
							Konfirmasi Pickup
						</Button>
					</>
				);

			case ShipmentStatus.PICKED_UP:
				return (
					<Button 
						variant="oranye" 
						size="sm" 
						onClick={handleDeliverToBranch}
						disabled={isLoading}
					>
						Kirim ke Cabang
					</Button>
				);

			case ShipmentStatus.READY_TO_PICKUP_AT_BRANCH:
				return (
					<Button 
						variant="secondary" 
						size="sm" 
						onClick={handlePickFromBranch}
						disabled={isLoading}
					>
						Ambil dari Cabang
					</Button>
				);

			case ShipmentStatus.READY_TO_DELIVER:
				return (
					<Button 
						variant="default" 
						size="sm" 
						onClick={handlePickupFromBranch}
						disabled={isLoading}>
						Siap Kirim
					</Button>
				);

			case ShipmentStatus.ON_THE_WAY_TO_ADDRESS:
				return (
					<Button
						variant="darkGreen"
						size="sm"
						onClick={() => openPhotoDialog("deliver")}
						disabled={isLoading}
					>
						<Camera className="w-4 h-4 mr-1" />
						Konfirmasi Terkirim
					</Button>
				);

			default:
				return null;
		}
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="sm"
				onClick={() => setIsDetailOpen(true)}
			>
				<Eye className="w-4 h-4 mr-1" />
				Detail Paket
			</Button>

			{renderActionButtons()}

			{/* Simplified Package Detail Modal */}
			<Detail
				shipment={shipment}
				isOpen={isDetailOpen}
				onClose={() => setIsDetailOpen(false)}
			/>

			{/* Photo Upload Dialog */}
			<Dialog
				open={isPhotoDialogOpen}
				onOpenChange={setIsPhotoDialogOpen}
			>
				<DialogContent className="!max-w-sm">
					<DialogHeader>
						<DialogTitle>
							{actionType === "pickup"
								? "Konfirmasi Pickup"
								: "Konfirmasi Pengiriman"}
						</DialogTitle>
						<DialogDescription>
							{actionType === "pickup"
								? "Unggah foto paket yang telah dipickup sebagai bukti"
								: "Unggah foto bukti pengiriman ke customer"}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<div>
							<Label
								htmlFor="photo"
								className="text-sm font-medium"
							>
								Foto Bukti
							</Label>
							<Input
								id="photo"
								type="file"
								accept="image/*"
								onChange={handlePhotoSelect}
								className="mt-2"
							/>
						</div>

						{photoPreview && (
							<div className="mt-4">
								<img
									src={photoPreview}
									alt="Preview"
									className="w-full h-40 object-cover rounded-lg border"
								/>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button
							variant="secondary"
							onClick={() => {
								setIsPhotoDialogOpen(false);
								setSelectedPhoto(null);
								setPhotoPreview(null);
							}}
							disabled={isLoading}
						>
							Batal
						</Button>
						<Button
							variant="darkGreen"
							onClick={handlePhotoUpload}
							disabled={!selectedPhoto || isLoading}
						>
							{isLoading ? "Mengunggah..." : "Upload"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
export default ActionButtons;