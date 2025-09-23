"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DeliveryItem } from "@/data/deliveries";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const getVarianFromStatus = (status: string) => {
  switch (status) {
    case "picked up":
      return "warning";
    case "waiting pickup":
      return "secondary";
    case "in transit":
      return "default";
    case "delivered":
      return "default";
    case "failed":
      return "destructive";
    default:
      return "default";
  }
};

export const columns: ColumnDef<DeliveryItem>[] = [
  {
    accessorKey: "resi",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <span>No Resi</span>
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-sm font-medium">{row.getValue("resi")}</div>;
    },
  },
  {
    accessorKey: "product",
    header: "Produk",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("product")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={getVarianFromStatus(status)} className="rounded-xl">
          {status}
        </Badge>
      );
    },
  },
];
