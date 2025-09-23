"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { Shipment } from "@/lib/api/types/shipment";
import { HistoryActionCell } from "./history-action-cell";

const getVariantFromStatus = (status: string) => {
	switch (status.toLowerCase()) {
		case "picked_up":
		case "in_transit":
		case "on_the_way":
		case "departed_from_branch":
			return "default";
		case "waiting_pickup":
		case "pending":
			return "secondary";
		case "arrived_at_branch":
		case "at_branch":
			return "outline";
		case "delivered":
		case "completed":
			return "darkGreen";
		case "failed":
			return "destructive";
		default:
			return "default";
	}
};

export const columns: ColumnDef<Shipment>[] = [
	{
		accessorKey: "tracking_number",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			const isAsc = isSorted === "asc";
			const isDesc = isSorted === "desc";

			const handleSort = () => {
				if (!isSorted) {
					// Not sorted → sort ascending
					column.toggleSorting(false);
				} else if (isAsc) {
					// Currently ascending → sort descending
					column.toggleSorting(true);
				} else {
					// Currently descending → clear sorting
					column.clearSorting();
				}
			};

			return (
				<div className="flex items-center justify-between">
					<span>No Resi</span>
					<Button
						variant="ghost"
						onClick={handleSort}
						className="flex items-center gap-2"
					>
						<ArrowUpDown
							className="h-4 w-4"
							color={
								isAsc ? "#4CAF50" : isDesc ? "#F44336" : "#000"
							}
						/>
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
		accessorKey: "shipment_detail.package_type",
		header: "Jenis Paket",
		cell: ({ row }) => {
			const shipment = row.original;
			return (
				<div className="text-sm capitalize">
					{shipment.shipment_detail?.package_type?.toLowerCase() ||
						"N/A"}
				</div>
			);
		},
	},
	{
		accessorKey: "created_at",
		header: "Tanggal Dibuat",
		cell: ({ row }) => {
			const shipment = row.original;
			const date = shipment.created_at
				? new Date(shipment.created_at).toLocaleDateString("id-ID")
				: "N/A";
			return <div className="text-sm">{date}</div>;
		},
	},
	{
		accessorKey: "delivery_status",
		header: "Status",
		cell: ({ row }) => {
			const shipment = row.original;
			const status = shipment.delivery_status || "pending";
			return (
				<Badge variant={getVariantFromStatus(status)}>
					{status
						.replace(/_/g, " ")
						.toLowerCase()
						.replace(/\b\w/g, (l) => l.toUpperCase())}
				</Badge>
			);
		},
	},
	{
		accessorKey: "action",
		header: "Action",
		cell: ({ row }) => {
			return <HistoryActionCell shipment={row.original} />;
		},
	},
];
