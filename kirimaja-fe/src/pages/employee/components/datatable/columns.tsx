"use client";

import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { EmployeeItem } from "@/data/employee";
import { ActionCell } from "./action-cell";

export const columns = (
	onDataChange?: () => void
): ColumnDef<EmployeeItem>[] => [
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
		accessorKey: "user.name",
		header: "Nama Karyawan",
		cell: ({ row }) => {
			return (
				<div className="text-sm font-medium">
					{row.original.user.name}
				</div>
			);
		},
	},
	{
		accessorKey: "user.email",
		header: "Email",
		cell: ({ row }) => {
			return <div className="text-sm">{row.original.user.email}</div>;
		},
	},
	{
		accessorKey: "type",
		header: "Tipe",
		cell: ({ row }) => {
			const type = row.original.type;
			const typeLabel = type === "courier" ? "Kurir" : "Admin";
			const typeColor =
				type === "courier"
					? "bg-blue-100 text-blue-800"
					: "bg-green-100 text-green-800";

			return (
				<span
					className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor}`}
				>
					{typeLabel}
				</span>
			);
		},
	},
	{
		accessorKey: "branch.name",
		header: "Cabang",
		cell: ({ row }) => {
			return <div className="text-sm">{row.original.branch.name}</div>;
		},
	},
	{
		accessorKey: "action",
		header: "Action",
		cell: ({ row }) => {
			return (
				<ActionCell
					employee={row.original}
					onDataChange={onDataChange}
				/>
			);
		},
	},
];
