"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Camera, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ShipmentStatus, type Shipment } from "@/lib/api/types/shipment";
import Detail from "../detail";

const getVariantFromStatus = (status: string) => {
	switch (status) {
		case ShipmentStatus.READY_TO_PICKUP:
		case ShipmentStatus.WAITING_PICKUP:
			return "secondary";
		case ShipmentStatus.PICKED_UP:
			return "warning";
		case ShipmentStatus.IN_TRANSIT:
			return "default";
		case ShipmentStatus.READY_TO_DELIVER:
		case ShipmentStatus.READY_TO_PICKUP_AT_BRANCH:
			return "default";
		case ShipmentStatus.ON_THE_WAY_TO_ADDRESS:
			return "warning";
		case ShipmentStatus.DELIVERED:
			return "default";
		default:
			return "default";
	}
};

const formatStatus = (status: string) => {
	switch (status) {
		case ShipmentStatus.READY_TO_PICKUP:
			return "Siap untuk Pickup";
		case ShipmentStatus.WAITING_PICKUP:
			return "Menunggu Pickup";
		case ShipmentStatus.PICKED_UP:
			return "Sudah Dipickup";
		case ShipmentStatus.IN_TRANSIT:
			return "Dalam Perjalanan";
		case ShipmentStatus.READY_TO_DELIVER:
			return "Siap Dikirim";
		case ShipmentStatus.ON_THE_WAY_TO_ADDRESS:
			return "Menuju Alamat";
		case ShipmentStatus.READY_TO_PICKUP_AT_BRANCH:
			return "Siap untuk Pickup di Cabang";
		case ShipmentStatus.DELIVERED:
			return "Terkirim";
		default:
			return status;
	}
};

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
			setIsLoading(true);

			if (actionType === "pickup") {
				toast.success("Pickup berhasil dikonfirmasi");
			} else {
				toast.success("Pengiriman ke customer berhasil");
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

	// Determine which buttons to show based on delivery status
	const renderActionButtons = () => {
		if (!shipment.tracking_number) return null;

		switch (shipment.delivery_status) {
			case ShipmentStatus.READY_TO_PICKUP:
				return (
					<>
						<Button
							variant="darkGreen"
							size="sm"
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
					<Button variant="oranye" size="sm" disabled={isLoading}>
						Kirim ke Cabang
					</Button>
				);

			case ShipmentStatus.READY_TO_PICKUP_AT_BRANCH:
				return (
					<Button variant="secondary" size="sm" disabled={isLoading}>
						Ambil dari Cabang
					</Button>
				);

			case ShipmentStatus.READY_TO_DELIVER:
				return (
					<Button variant="default" size="sm" disabled={isLoading}>
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

			case ShipmentStatus.DELIVERED:
				return (
					<Badge
						variant="default"
						className="bg-green-100 text-green-800"
					>
						Selesai
					</Badge>
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

export const courierColumns = (
	onActionComplete: () => void
): ColumnDef<Shipment>[] => [
	{
		accessorKey: "tracking_number",
		header: ({ column }) => {
			return (
				<div className="flex items-center justify-between">
					<span>No Resi</span>
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
						className="flex items-center gap-2"
					>
						<ArrowUpDown className="h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="text-sm font-medium">
					{row.getValue("tracking_number") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "shipment_detail.destination_address",
		header: "Alamat Tujuan",
		cell: ({ row }) => {
			return (
				<div className="text-sm max-w-xs truncate">
					{row.original.shipment_detail?.destination_address || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "delivery_status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("delivery_status") as string;
			return (
				<Badge variant={getVariantFromStatus(status)}>
					{formatStatus(status)}
				</Badge>
			);
		},
	},
	{
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			return (
				<ActionButtons
					shipment={row.original}
					onActionComplete={onActionComplete}
				/>
			);
		},
	},
];
