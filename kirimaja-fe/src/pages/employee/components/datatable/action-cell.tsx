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
import type { UpdateEmployeeBranchRequest } from "@/lib/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { PermissionGuard } from "@/components/permission-guard";
import type { EmployeeItem } from "@/data/employee";
import { branches } from "@/data/branch";

const employeeSchema = z.object({
	name: z
		.string()
		.min(2, "Nama minimal 2 karakter")
		.max(100, "Nama maksimal 100 karakter"),
	email: z.string().email("Email harus valid"),
	phone_number: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
	type: z
		.enum(["courier", "admin"], {
			required_error: "Pilih tipe karyawan",
		})
		.optional(),
	branch_id: z.coerce.number().min(1, "Pilih cabang").optional(),
	password: z
		.string()
		.min(6, "Password minimal 6 karakter")
		.optional()
		.or(z.literal("")),
});

interface ActionCellProps {
	employee: EmployeeItem;
	onDataChange?: () => void;
}

export function ActionCell({ employee, onDataChange }: ActionCellProps) {
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isEditDialogOpen, setEditDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof employeeSchema>>({
		resolver: zodResolver(employeeSchema),
		defaultValues: {
			name: employee.user.name,
			email: employee.user.email,
			phone_number: employee.user.phone_number,
			type: employee.type,
			branch_id: employee.branch_id,
			password: "",
		},
	});

	const handleEdit = async (values: z.infer<typeof employeeSchema>) => {
		try {
			setIsLoading(true);
			const requestData: UpdateEmployeeBranchRequest = {
				name: values.name,
				email: values.email,
				phone_number: values.phone_number,
				type: values.type || employee.type,
				role_id: (values.type || employee.type) === "courier" ? 3 : 4,
				branch_id: values.branch_id || employee.branch_id,
			};

			if (values.password && values.password.length > 0) {
				requestData.password = values.password;
			}

			// TODO: Implement actual API call when backend is ready
			console.log("Updating employee with data:", requestData);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success("Karyawan berhasil diperbarui!");
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
			// TODO: Implement actual API call when backend is ready
			console.log("Deleting employee:", employee.id);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success("Karyawan berhasil dihapus!");
			setDeleteDialogOpen(false);
			onDataChange?.();
		} catch (error) {
			console.error("Error deleting employee:", error);
			toast.error("Gagal menghapus karyawan. Silakan coba lagi.");
		} finally {
			setIsLoading(false);
		}
	};

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
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Pilih tipe karyawan" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="courier">
														Courier
													</SelectItem>
													<SelectItem value="admin">
														Admin
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
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
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Pilih cabang" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{branches.map((branch) => (
														<SelectItem
															key={branch.id}
															value={branch.id.toString()}
														>
															{branch.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
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
										disabled={isLoading}
										variant="darkGreen"
									>
										{isLoading ? "Menyimpan..." : "Simpan"}
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
								disabled={isLoading}
							>
								{isLoading ? "Menghapus..." : "Hapus"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</PermissionGuard>
		</div>
	);
}
