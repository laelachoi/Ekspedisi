"use client";

import { Button } from "@/components/ui/button";
import type { BranchItem } from "@/data/branch";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { BranchActionCell } from "./branch-action-cell";

export const columns = (onDataChange?: () => void): ColumnDef<BranchItem>[] => [
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
		accessorKey: "name",
		header: "Nama Cabang",
		cell: ({ row }) => {
			return <div className="text-sm">{row.getValue("name")}</div>;
		},
	},
	{
		accessorKey: "address",
		header: "Alamat",
		cell: ({ row }) => {
			const address = row.getValue("address") as string;
			return (
				<div className="text-sm max-w-[200px] md:max-w-none">
					<div className="truncate" title={address}>
						{address}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "phone_number",
		header: "Nomor Telepon",
		cell: ({ row }) => {
			return (
				<div className="text-sm">{row.getValue("phone_number")}</div>
			);
		},
	},
	{
		accessorKey: "created_at",
		header: "Tanggal Dibuat",
		cell: ({ row }) => {
			const date = new Date(row.getValue("created_at") as string);
			return (
				<div className="text-sm">
					{date.toLocaleDateString("id-ID")}
				</div>
			);
		},
	},
	{
		id: "action",
		header: "Action",
		cell: ({ row }) => {
			return (
				<BranchActionCell
					branch={row.original}
					onDataChange={onDataChange}
				/>
			);
		},
	},
];
