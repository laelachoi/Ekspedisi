"use client";

import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { UserAddress } from "@/lib/api/types/user-address";
import { ActionCell } from "./action-cell";

export const createColumns = (
	onDataChange?: () => void
): ColumnDef<UserAddress>[] => [
	{
		id: "number",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			const isAsc = isSorted === "asc";
			const isDesc = isSorted === "desc";

			const handleSort = () => {
				if (!isSorted) {
					column.toggleSorting(false);
				} else if (isAsc) {
					column.toggleSorting(true);
				} else {
					column.clearSorting();
				}
			};

			return (
				<div className="flex items-center justify-between">
					<span>No</span>
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
			return <div className="text-sm font-medium">{row.index + 1}</div>;
		},
	},
	{
		accessorKey: "address",
		header: "Alamat",
		cell: ({ row }) => {
			return (
				<div className="text-sm max-w-xs truncate">
					{row.getValue("address")}
				</div>
			);
		},
	},
	{
		accessorKey: "tag",
		header: "Patokan",
		cell: ({ row }) => {
			return <div className="text-sm">{row.getValue("tag")}</div>;
		},
	},
	{
		accessorKey: "label",
		header: "Label",
		cell: ({ row }) => {
			const label = row.getValue("label") as string;
			return (
				<div className="text-sm">
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
						{label || "Tidak ada label"}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			return (
				<ActionCell
					userAddress={row.original}
					onDataChange={onDataChange}
				/>
			);
		},
	},
];
