"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ShipmentBranchLog } from "@/lib/api/types/shipment-branch";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

const getTypeVariant = (type: "IN" | "OUT") => {
	return type === "IN" ? "darkGreen" : "warning";
};

export const columns: ColumnDef<ShipmentBranchLog>[] = [
	{
		accessorKey: "tracking_number",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="h-auto p-0 font-semibold"
				>
					Tracking Number
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const tracking_number = row.getValue("tracking_number") as string;
			return (
				<div className="font-mono text-sm font-medium">
					{tracking_number}
				</div>
			);
		},
	},
	{
		accessorKey: "type",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="h-auto p-0 font-semibold"
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const type = row.getValue("type") as "IN" | "OUT";
			return (
				<Badge variant={getTypeVariant(type)} className="font-semibold">
					{type}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="h-auto p-0 font-semibold"
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const createdAt = row.getValue("created_at") as string;
			return (
				<div className="text-sm">
					{format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
				</div>
			);
		},
	},
	{
		accessorKey: "user_id",
		header: "User ID",
		cell: ({ row }) => {
			const userId = row.getValue("user_id") as number;
			return <div className="text-sm font-medium">User {userId}</div>;
		},
	},
];
