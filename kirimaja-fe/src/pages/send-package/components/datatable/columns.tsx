"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Shipment } from "@/lib/api/types/shipment";
import {
	ShipmentStatus,
	PaymentStatus,
	type ShipmentStatusType,
	type PaymentStatusType,
} from "@/lib/api/types/shipment";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const getVariantFromStatus = (
	status: ShipmentStatusType
):
	| "secondary"
	| "warning"
	| "default"
	| "destructive"
	| "darkGreen"
	| "outline" => {
	switch (status) {
		case ShipmentStatus.READY_TO_PICKUP:
		case ShipmentStatus.WAITING_PICKUP:
			return "secondary"; // abu-abu
		case ShipmentStatus.PICKED_UP:
		case ShipmentStatus.IN_TRANSIT:
		case ShipmentStatus.ARRIVED_AT_BRANCH:
		case ShipmentStatus.AT_BRANCH:
		case ShipmentStatus.DEPARTED_FROM_BRANCH:
		case ShipmentStatus.ON_THE_WAY:
		case ShipmentStatus.ON_THE_WAY_TO_ADDRESS:
		case ShipmentStatus.READY_TO_DELIVER:
			return "warning"; // kuning
		case ShipmentStatus.DELIVERED:
		case ShipmentStatus.COMPLETED:
			return "darkGreen"; // hijau
		default:
			return "default"; // fallback
	}
};

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

const formatShipmentStatus = (status: ShipmentStatusType): string => {
	switch (status) {
		case ShipmentStatus.READY_TO_PICKUP:
			return "Siap Di Pickup";
		case ShipmentStatus.WAITING_PICKUP:
			return "Menunggu Pickup";
		case ShipmentStatus.PICKED_UP:
			return "Sudah Dipickup";
		case ShipmentStatus.IN_TRANSIT:
			return "Dalam Perjalanan";
		case ShipmentStatus.ARRIVED_AT_BRANCH:
			return "Tiba di Cabang";
		case ShipmentStatus.AT_BRANCH:
			return "Di Cabang";
		case ShipmentStatus.DEPARTED_FROM_BRANCH:
			return "Berangkat dari Cabang";
		case ShipmentStatus.ON_THE_WAY:
			return "Menuju Cabang Tujuan";
		case ShipmentStatus.ON_THE_WAY_TO_ADDRESS:
			return "Menuju Alamat Tujuan";
		case ShipmentStatus.READY_TO_DELIVER:
			return "Siap Dikirim";
		case ShipmentStatus.DELIVERED:
			return "Terkirim";
		case ShipmentStatus.COMPLETED:
			return "Selesai";
		default:
			return status;
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

interface ActionCellProps {
	shipment: Shipment;
	onDataChange?: () => void;
}

function ActionCell({ shipment, onDataChange }: ActionCellProps) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handlePayment = () => {
		navigate(`/send-package/pay/${shipment.id}`);
	};

	const handlePickup = async () => {
		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success("Pickup berhasil di-request!");
			onDataChange?.();
		} catch {
			toast.error("Gagal request pickup.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex gap-2">
			<Link
				to={`/send-package/detail/${shipment.id}`}
				className={buttonVariants({ variant: "outline", size: "sm" })}
			>
				Detail
			</Link>
			{shipment.payment_status === PaymentStatus.PENDING && (
				<Button size="sm" onClick={handlePayment}>
					Bayar
				</Button>
			)}
			{shipment.payment_status === PaymentStatus.PAID &&
				shipment.delivery_status === ShipmentStatus.WAITING_PICKUP && (
					<Button
						size="sm"
						onClick={handlePickup}
						disabled={isLoading}
					>
						{isLoading ? "Requesting..." : "Request Pickup"}
					</Button>
				)}
		</div>
	);
}

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
				const status = row.getValue(
					"delivery_status"
				) as ShipmentStatusType;
				return (
					status && (
						// Ensure status is defined before rendering
						<Badge variant={getVariantFromStatus(status)}>
							{formatShipmentStatus(status)}
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
