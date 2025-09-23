import { Button } from "@/components/ui/button";
import type { BranchItem } from "@/data/branch";
import { EditBranchModal } from "../edit-branch-modal";

interface BranchActionCellProps {
	branch: BranchItem;
	onDataChange?: () => void;
}

export function BranchActionCell({
	branch,
	onDataChange,
}: BranchActionCellProps) {
	const handleDelete = () => {
		// TODO: Implement actual delete functionality when backend is ready
		console.log("Deleting branch:", branch);
		onDataChange?.();
	};

	return (
		<div className="flex items-center gap-2">
			<EditBranchModal branch={branch} onBranchUpdated={onDataChange} />
			<Button
				variant="destructive"
				size="sm"
				className="rounded-lg"
				onClick={handleDelete}
			>
				Hapus
			</Button>
		</div>
	);
}
