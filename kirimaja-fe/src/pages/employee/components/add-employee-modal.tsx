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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddSquare } from "iconsax-reactjs";
import {
	createEmployeeSchema,
	type CreateEmployeeFormData,
} from "@/lib/validations/employee";
import { useCreateEmployee, useEmployees } from "@/hooks/use-employee";
import { useAuth } from "@/hooks/use-auth";
import { useBranches } from "@/hooks/use-branch";
import { UserRole } from "@/lib/api/types/employee";

interface AddEmployeeModalProps {
	onEmployeeAdded?: () => void;
}

export function AddEmployeeModal({ onEmployeeAdded }: AddEmployeeModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const createEmployeeMutation = useCreateEmployee();
	const { user } = useAuth();

	const isAdminBranch = user?.role?.key === "admin-branch";
	const { data: employees = []} = useEmployees();

	const { data: branches = [], isLoading: isLoadingBranches } = useBranches({
		enabled: !isAdminBranch,
	});

	// Find admin's branch if they are admin branch
	const adminEmployee = isAdminBranch
		? employees.find((emp) => emp.user_id === user?.id)
		: null;

	const defaultBranchId = adminEmployee?.branch_id;

	const form = useForm<CreateEmployeeFormData>({
		resolver: zodResolver(createEmployeeSchema),
		defaultValues: {
			email: "",
			name: "",
			phone_number: "",
			type: isAdminBranch ? "courier" : "admin",
			branch_id: defaultBranchId || 0, // Set to 0 initially if not found
			role_id: isAdminBranch ? UserRole.COURIER : UserRole.ADMIN_BRANCH,
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

	// Update role_id when type changes
	useEffect(() => {
		if (!isAdminBranch) {
			const subscription = form.watch((value, { name }) => {
				if (name === "type" && value.type) {
					const roleId =
						value.type === "courier"
							? UserRole.COURIER
							: UserRole.ADMIN_BRANCH;
					form.setValue("role_id", roleId);
				}
			});
			return () => subscription.unsubscribe();
		}
	}, [form, isAdminBranch]);

	async function onSubmit(_values: CreateEmployeeFormData) {
		try {
			await createEmployeeMutation.mutateAsync(_values);
			setIsOpen(false);
			form.reset();
			onEmployeeAdded?.();
		} catch (error) {
			console.error("Error creating employee:", error);
			toast.error("Gagal menambahkan karyawan. Silakan coba lagi.");
		} finally {
			setIsLoading(false);
		}
	}

	const handleCancel = () => {
		setIsOpen(false);
		form.reset();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="darkGreen">
					Tambah Karyawan
					<AddSquare className="ml-auto" variant="Bold" size="20" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Tambah Karyawan Baru</DialogTitle>
					<DialogDescription>
						Masukkan informasi karyawan baru yang akan ditambahkan
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
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
											{...field}
											placeholder="Masukkan nama lengkap"
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
											{...field}
											type="email"
											placeholder="Masukkan email"
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
											{...field}
											placeholder="Masukkan nomor telepon"
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
											onValueChange={field.onChange}
											value={
												field.value
													? field.value.toString()
													: undefined
											}
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
							name="role_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<input 
											{...field}
											type="hidden"
											value={field.value || ""}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="Masukkan password"
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
								onClick={handleCancel}
								disabled={isLoading}
							>
								Batal
							</Button>
							<Button
								type="submit"
								variant="darkGreen"
								disabled={createEmployeeMutation.isPending}
							>
								{createEmployeeMutation.isPending ? "Menyimpan..." : "Simpan"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
