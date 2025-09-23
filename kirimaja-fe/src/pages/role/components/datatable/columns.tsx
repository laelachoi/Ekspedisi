"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Role } from "@/lib/api/types";
import { ActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const createColumns = (onDataChange?: () => void): ColumnDef<Role>[] => [
	{
		id: "number",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				No
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.index + 1}</div>,
	},
	{
		accessorKey: "name",
		header: "Nama Role",
		cell: ({ row }) => {
			return (
				<div className="text-sm font-medium">
					{row.getValue("name")}
				</div>
			);
		},
	},
	{
		accessorKey: "key",
		header: "Key",
		cell: ({ row }) => {
			return <div className="text-sm">{row.getValue("key")}</div>;
		},
	},
	{
		id: "permissions",
		header: "Permissions",
		cell: ({ row }) => {
			const permissions = row.original.permissions;
			return (
				<div className="flex flex-wrap gap-1">
					{permissions.slice(0, 3).map((p) => (
						<Badge key={p.id} variant="secondary">
							{p.name}
						</Badge>
					))}
					{permissions.length > 3 && (
						<Badge variant="outline">
							+{permissions.length - 3}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Aksi",
		cell: ({ row }) => {
			return (
				<ActionCell role={row.original} onDataChange={onDataChange} />
			);
		},
	},
];
