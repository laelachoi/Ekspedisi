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
import { useState } from "react";
import toast from "react-hot-toast";
import { AddSquare } from "iconsax-reactjs";
import { branches } from "@/data/branch";
import {
	createEmployeeSchema,
	type CreateEmployeeFormData,
} from "@/lib/validations/employee";

interface AddEmployeeModalProps {
	onEmployeeAdded?: () => void;
}

export function AddEmployeeModal({ onEmployeeAdded }: AddEmployeeModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<CreateEmployeeFormData>({
		resolver: zodResolver(createEmployeeSchema),
		defaultValues: {
			email: "",
			name: "",
			phone_number: "",
			type: undefined,
			branch_id: undefined,
			password: "",
		},
	});

	async function onSubmit(_values: CreateEmployeeFormData) {
		try {
			setIsLoading(true);
			// TODO: Implement actual API call when backend is ready
			console.log("Creating employee with data:", _values);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success("Karyawan berhasil ditambahkan!");
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
								disabled={isLoading}
							>
								{isLoading ? "Menyimpan..." : "Simpan"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
