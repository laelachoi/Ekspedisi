import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";
import type { Shipment } from "@/lib/api/types/shipment";

interface HistoryActionCellProps {
	shipment: Shipment;
	onDataChange?: () => void;
}

export function HistoryActionCell({ shipment }: HistoryActionCellProps) {
	return (
		<div className="flex items-center gap-2">
			<Link
				to={`/history/detail/${shipment.id}`}
				className={buttonVariants({
					variant: "darkGreen",
					size: "sm",
				})}
			>
				Detail
			</Link>
		</div>
	);
}
