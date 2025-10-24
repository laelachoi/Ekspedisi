"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Shipment } from "@/lib/api/types/shipment";
import {
	PaymentStatus,
	type PaymentStatusType,
} from "@/lib/api/types/shipment";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { getStatusBadgeVariant, getStatusLabel } from "@/lib/utils/status-utils";
import ActionCell from "./action-cell";

const getPaymentVariant = (status: PaymentStatusType) => {
	switch (status) {
		case PaymentStatus.PENDING:
			return "warning";
		case PaymentStatus.PAID:
			return "default";
		case PaymentStatus.FAILED:
			return "destructive";
		default:
			return "secondary";
	}
};

const formatPaymentStatus = (status: PaymentStatusType) => {
	switch (status) {
		case PaymentStatus.PENDING:
			return "Belum Bayar";
		case PaymentStatus.PAID:
			return "Sudah Bayar";
		case PaymentStatus.FAILED:
			return "Gagal Bayar";
		default:
			return status;
	}
};

export const useColumns = (
	onDataChange?: () => void
): ColumnDef<Shipment>[] => {
	const columns: ColumnDef<Shipment>[] = [
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
									isAsc
										? "#4CAF50"
										: isDesc
										? "#F44336"
										: "#000"
								}
							/>
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				return (
					<div className="text-sm font-medium">
						{row.getValue("tracking_number")}
					</div>
				);
			},
		},
		{
			accessorKey: "created_at",
			header: "Tanggal Dibuat",
			cell: ({ row }) => {
				const date = new Date(row.getValue("created_at"));
				return (
					<div className="text-sm">
						{date.toLocaleDateString("id-ID")}
					</div>
				);
			},
		},
		{
			accessorKey: "delivery_status",
			header: "Status Pengiriman",
			cell: ({ row }) => {
				const status = row.getValue("delivery_status") as string;
				return (
					status && (
						// Ensure status is defined before rendering
						<Badge 
							variant={
								getStatusBadgeVariant(status) as
								| "default"
								| "destructive"
								| "outline"
								| "secondary"
								| "darkGreen"
							}
						>
							{getStatusLabel(status)}
						</Badge>
					)
				);
			},
		},
		{
			accessorKey: "payment_status",
			header: "Status Pembayaran",
			cell: ({ row }) => {
				const status = row.getValue(
					"payment_status"
				) as PaymentStatusType;
				return (
					<Badge variant={getPaymentVariant(status)}>
						{formatPaymentStatus(status)}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			header: "Aksi",
			cell: ({ row }) => (
				<ActionCell
					shipment={row.original}
					onDataChange={onDataChange}
				/>
			),
		},
	];

	return columns;
};
