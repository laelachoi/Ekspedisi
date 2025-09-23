"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import type { DeliveryItem } from "@/data/deliveries";

// Helper function to determine badge variant based on status
const getVariantFromStatus = (
	status: DeliveryItem["status"]
): "darkGreen" | "warning" | "destructive" | "secondary" | "default" => {
	switch (status) {
		case "delivered":
			return "darkGreen";
		case "in transit":
			return "warning";
		case "failed":
			return "destructive";
		case "picked up":
			return "default";
		case "waiting pickup":
			return "secondary";
		default:
			return "secondary";
	}
};

// Helper function to format status text for display
const formatStatus = (status: DeliveryItem["status"]): string => {
	switch (status) {
		case "delivered":
			return "Terkirim";
		case "in transit":
			return "Dalam Perjalanan";
		case "failed":
			return "Gagal";
		case "picked up":
			return "Diambil";
		case "waiting pickup":
			return "Menunggu Pengambilan";
		default:
			return "Tidak Diketahui";
	}
};

export const deliveryColumns: ColumnDef<DeliveryItem>[] = [
	{
		accessorKey: "resi",
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
					{row.getValue("resi") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "product",
		header: "Produk",
		cell: ({ row }) => {
			return (
				<div className="text-sm">
					{row.getValue("product") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "pickupAddr",
		header: "Alamat Pickup",
		cell: ({ row }) => {
			return (
				<div className="text-sm max-w-xs truncate">
					{row.getValue("pickupAddr") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "destinationAddr",
		header: "Alamat Tujuan",
		cell: ({ row }) => {
			return (
				<div className="text-sm max-w-xs truncate">
					{row.getValue("destinationAddr") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "pickupDate",
		header: "Tanggal Pickup",
		cell: ({ row }) => {
			return (
				<div className="text-sm">
					{row.getValue("pickupDate") || "N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "weight",
		header: "Berat (kg)",
		cell: ({ row }) => {
			const weight = row.getValue("weight") as number | undefined;
			return (
				<div className="text-sm">{weight ? `${weight} kg` : "N/A"}</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as DeliveryItem["status"];
			return (
				<Badge variant={getVariantFromStatus(status)}>
					{formatStatus(status)}
				</Badge>
			);
		},
	},
	{
		accessorKey: "delivery_type",
		header: "Tipe Pengiriman",
		cell: ({ row }) => {
			const deliveryType = row.original.delivery_type;
			return (
				<div className="text-sm">
					{deliveryType
						? deliveryType === "same day"
							? "Same Day"
							: deliveryType === "next day"
							? "Next Day"
							: "Instant"
						: "Reguler"}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			const delivery = row.original;
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() => alert(`Detail for ${delivery.resi}`)}
				>
					<Eye className="mr-2 h-4 w-4" />
					Detail
				</Button>
			);
		},
	},
];
