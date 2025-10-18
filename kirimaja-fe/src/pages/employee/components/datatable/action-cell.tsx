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
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UserRole, type EmployeeBranch, type UpdateEmployeeBranchRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { PermissionGuard } from "@/components/permission-guard";
import { updateEmployeeSchema } from "@/lib/validations";
import { useDeleteEmployee, useEmployees, useUpdateEmployee } from "@/hooks/use-employee";
import { useAuth } from "@/hooks/use-auth";
import { useBranches } from "@/hooks/use-branch";

interface ActionCellProps {
	employee: EmployeeBranch;
	onDataChange?: () => void;
}

export function ActionCell({ employee, onDataChange }: ActionCellProps) {
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isEditDialogOpen, setEditDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const updateEmployeeMutation = useUpdateEmployee();
	const deleteEmployeeMutation = useDeleteEmployee();
	const { user } = useAuth();

	const isAdminBranch = user?.role?.key === "admin-branch";
	const { data: employees = []} = useEmployees();

	const { data: branches = [], isLoading: isLoadingBranches } = useBranches({
		enabled: !isAdminBranch,
	});

	const adminEmployee = isAdminBranch
		? employees.find((emp) => emp.user_id === user?.id)
		: null;

	const defaultBranchId = adminEmployee?.branch_id;

	const isEmployeeFromSameBranch = isAdminBranch
		? employee.branch_id === defaultBranchId
		: true;

	const form = useForm<typeof updateEmployeeSchema._type>({
		resolver: zodResolver(updateEmployeeSchema),
		defaultValues: {
			name: employee.user?.name || "",
			email: employee.user?.email || "",
			phone_number: employee.user?.phone_number || "",
			type: isAdminBranch ? "courier" : employee.type,
			branch_id: isAdminBranch ? defaultBranchId : employee.branch_id,
			password: "",
		},
	});

	useEffect(() => {
		if (
			isAdminBranch &&
			defaultBranchId &&
			defaultBranchId !== form.getValues("branch_id")
		) {
			form.setValue("branch_id", defaultBranchId);
		}
	}, [isAdminBranch, defaultBranchId, form]);

	const handleEdit = async (values: z.infer<typeof updateEmployeeSchema>) => {
		try {
			setIsLoading(true);
			const requestData: UpdateEmployeeBranchRequest = {
				name: values.name,
				email: values.email,
				phone_number: values.phone_number,
				type: isAdminBranch ? "courier": values.type,
				role_id: isAdminBranch 
					? UserRole.COURIER
					: values.type === "courier"
					? UserRole.COURIER
					: UserRole.ADMIN_BRANCH,
				branch_id: isAdminBranch ? defaultBranchId! : values.branch_id,
			};

			if (values.password && values.password.length > 0) {
				requestData.password = values.password;
			}

			await updateEmployeeMutation.mutateAsync({
				id: employee.id,
				data: requestData,
			});

			toast.success("Karyawan berhasil diperbarui");
			setEditDialogOpen(false);
			onDataChange?.();
		} catch (error) {
			console.error("Error updating employee:", error);
			toast.error("Gagal memperbarui karyawan. Silakan coba lagi.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			await deleteEmployeeMutation.mutateAsync(employee.id);

			toast.success("Karyawan berhasil dihapus");
			setDeleteDialogOpen(false);
			onDataChange?.();
		} catch (error) {
			console.error("Error deleting employee:", error);
			toast.error("Gagal menghapus karyawan. Silakan coba lagi.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isEmployeeFromSameBranch) {
		return <div className="flex space-x-2">-</div>;
	}

	return (
		<div className="flex space-x-2">
			<PermissionGuard permission="employee.update">
				<Dialog
					open={isEditDialogOpen}
					onOpenChange={setEditDialogOpen}
				>
					<DialogTrigger asChild>
						<Button
							variant="darkGreen"
							size="sm"
							className="rounded-lg"
						>
							Edit
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>Edit Karyawan</DialogTitle>
							<DialogDescription>
								Ubah informasi karyawan. Klik simpan ketika
								selesai.
							</DialogDescription>
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
											<FormLabel>Nama Lengkap</FormLabel>
											<FormControl>
												<Input
													placeholder="Masukkan nama lengkap"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Masukkan email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nomor Telepon</FormLabel>
											<FormControl>
												<Input
													placeholder="Masukkan nomor telepon"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tipe Karyawan</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={isAdminBranch}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Pilih tipe karyawan" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="courier">
														Kurir
													</SelectItem>
													{!isAdminBranch && (
														<SelectItem value="admin">
															Admin
														</SelectItem>
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{!isAdminBranch && (
									<FormField
										control={form.control}
										name="branch_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Cabang</FormLabel>
												<Select
													onValueChange={(value) =>
														field.onChange(
															parseInt(value)
														)
													}
													value={field.value?.toString()}
													defaultValue={field.value?.toString()}
													disabled={user?.role?.key === "admin_branch"}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih cabang" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{isLoadingBranches ? (
															<SelectItem value="">
																Memuat cabang...
															</SelectItem>												
														): (
															branches.map((branch) => (
															<SelectItem
																key={branch.id}
																value={branch.id.toString()}
															>
																{branch.name}
															</SelectItem>
															))
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Password (Opsional)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="password"
													placeholder="Kosongkan jika tidak ingin mengubah password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<Button
										type="button"
										variant="secondary"
										onClick={() => setEditDialogOpen(false)}
									>
										Batal
									</Button>
									<Button
										type="submit"
										disabled={updateEmployeeMutation.isPending}
										variant="darkGreen"
									>
										{updateEmployeeMutation.isPending ? "Menyimpan..." : "Simpan"}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</PermissionGuard>

			<PermissionGuard permission="employee.delete">
				<Dialog
					open={isDeleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
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
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Hapus Karyawan</DialogTitle>
							<DialogDescription>
								Apakah Anda yakin ingin menghapus karyawan{" "}
								<strong>{employee.user.name}</strong>? Tindakan
								ini tidak dapat dibatalkan.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setDeleteDialogOpen(false)}
							>
								Batal
							</Button>
							<Button
								variant="destructive"
								onClick={handleDelete}
								disabled={deleteEmployeeMutation.isPending}
							>
								{deleteEmployeeMutation.isPending ? "Menghapus..." : "Hapus"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</PermissionGuard>
		</div>
	);
}
