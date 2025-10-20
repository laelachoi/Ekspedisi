import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { UserAddress } from "@/lib/api/types/user-address";
import { useDeleteUserAddress } from "@/hooks/use-user-address";

interface ActionCellProps {
	userAddress: UserAddress;
	onDataChange?: () => void;
}

export function ActionCell({ userAddress, onDataChange }: ActionCellProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const deleteUserAddress = useDeleteUserAddress();

	const handleDelete = async () => {
		deleteUserAddress.mutate(userAddress.id, {
			onSuccess: () => {
				onDataChange?.();
			},
			onSettled: () => {
				setDeleteDialogOpen(false);
			},
		});
	};

	const handleViewLocation = () => {
		if (userAddress.latitude && userAddress.longitude) {
			const url = `https://www.google.com/maps?q=${userAddress.latitude},${userAddress.longitude}`;
			window.open(url, "_blank");
		}
	};

	return (
		<div className="flex items-center gap-2">
			<Link to={`/user-addresses/edit/${userAddress.id}`}>
				<Button variant="darkGreen" size="sm" className="rounded-lg">
					Edit
				</Button>
			</Link>

			{userAddress.latitude && userAddress.longitude && (
				<Button
					variant="oranye"
					size="sm"
					className="rounded-lg"
					onClick={handleViewLocation}
				>
					Lihat Lokasi
				</Button>
			)}

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogTrigger asChild>
					<Button
						variant="destructive"
						size="sm"
						className="rounded-lg"
						disabled={deleteUserAddress.isPending}
					>
						Hapus
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Hapus Alamat</DialogTitle>
						<DialogDescription>
							Apakah Anda yakin ingin menghapus alamat ini?
							Tindakan ini tidak dapat dibatalkan.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setDeleteDialogOpen(false)}
						>
							Batal
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Hapus
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
