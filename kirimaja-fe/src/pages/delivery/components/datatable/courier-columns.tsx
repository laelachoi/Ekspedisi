"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";
import { ShipmentStatus, type Shipment } from "@/lib/api/types/shipment";
import ActionButtons from "./action-button";

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
