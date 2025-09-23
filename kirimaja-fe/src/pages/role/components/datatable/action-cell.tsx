import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import type { Role } from "@/lib/api/types";
import { permissions } from "@/data/role";
import toast from "react-hot-toast";

const formSchema = z.object({
	name: z.string().min(1, "Nama role tidak boleh kosong"),
	key: z.string().min(1, "Key tidak boleh kosong"),
	permissions: z.array(z.number()).optional(),
});

interface ActionCellProps {
	role: Role;
	onDataChange?: () => void;
}

export function ActionCell({ role, onDataChange }: ActionCellProps) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: role.name,
			key: role.key,
			permissions: role.permissions.map((p) => p.id),
		},
	});

	useEffect(() => {
		form.reset({
			name: role.name,
			key: role.key,
			permissions: role.permissions.map((p) => p.id),
		});
	}, [role, form]);

	const handleEdit = () => {
		toast.success("Role berhasil diperbarui!");
		onDataChange?.();
		setIsEditDialogOpen(false);
	};

	return (
		<div className="flex gap-2">
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="darkGreen" size="sm">
						Edit
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Edit Role</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleEdit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Role</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="permissions"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Permissions</FormLabel>
											<div className="flex items-center space-x-2">
												<Checkbox
													id="select-all-permissions"
													checked={
														field.value?.length ===
														permissions.length
													}
													onCheckedChange={(
														checked
													) => {
														if (checked) {
															field.onChange(
																permissions.map(
																	(p) => p.id
																)
															);
														} else {
															field.onChange([]);
														}
													}}
												/>
												<label
													htmlFor="select-all-permissions"
													className="text-sm text-muted-foreground cursor-pointer"
												>
													Select All
												</label>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-h-60 overflow-y-auto border rounded-md p-3">
											{permissions.map((permission) => (
												<div
													key={permission.id}
													className="flex items-center space-x-2"
												>
													<Checkbox
														id={`permission-${permission.id}`}
														checked={field.value?.includes(
															permission.id
														)}
														onCheckedChange={(
															checked
														) => {
															const currentPermissions =
																field.value ||
																[];
															if (checked) {
																field.onChange([
																	...currentPermissions,
																	permission.id,
																]);
															} else {
																field.onChange(
																	currentPermissions.filter(
																		(id) =>
																			id !==
																			permission.id
																	)
																);
															}
														}}
													/>
													<label
														htmlFor={`permission-${permission.id}`}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
													>
														{permission.name}
													</label>
												</div>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button
									type="button"
									variant="secondary"
									onClick={() => setIsEditDialogOpen(false)}
								>
									Batal
								</Button>
								<Button type="submit" variant="darkGreen">
									Simpan
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
