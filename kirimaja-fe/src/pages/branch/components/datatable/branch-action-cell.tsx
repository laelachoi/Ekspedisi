import { Button } from "@/components/ui/button";
import { EditBranchModal } from "../edit-branch-modal";
import type { Branch } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, PermissionGuard } from "@/components";
import { useDeleteBranch } from "@/hooks/use-branch";
import { useState } from "react";

interface BranchActionCellProps {
	branch: Branch;
	onDataChange?: () => void;
}

export function BranchActionCell({
	branch,
	onDataChange,
}: BranchActionCellProps) {
	const deleteBranchMutation = useDeleteBranch();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const handleDelete = async () => {
		try {
			await deleteBranchMutation.mutateAsync(branch.id);
			setIsDeleteDialogOpen(false);
			onDataChange?.();
		} catch (error) {
			console.error("Error deleting branch:", error);
		}
	};

	return (
		<div className="flex items-center gap-2">
			<PermissionGuard permission="branches.update">
				<EditBranchModal 
					branch={branch} 
					onBranchUpdated={onDataChange} 
				/>
			</PermissionGuard>
			<PermissionGuard permission="branches.delete">
				<Dialog
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
				>
					<DialogTrigger asChild>
						<Button
							variant="destructive"
							size="sm"
							className="rounded-lg"
						>
							Hapus
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus</DialogTitle>
							<DialogDescription>
								Apakah Anda yakin ingin menghapus cabang "
								{branch.name}"? Tindakan ini tidak dapat dibatalkan.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								type="button"
								variant="secondary"
								onClick={() => setIsDeleteDialogOpen(false)}
								disabled={deleteBranchMutation.isPending}
							>
								Batal
							</Button>
							<Button
								type="button"
								variant="destructive"
								onClick={handleDelete}
								disabled={deleteBranchMutation.isPending}
							>
								{deleteBranchMutation.isPending
									? "Menyimpan..." 
									: "Hapus"}
							</Button>							
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</PermissionGuard>
		</div>
	);
}
