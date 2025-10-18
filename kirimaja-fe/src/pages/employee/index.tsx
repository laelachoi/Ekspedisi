import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { AddEmployeeModal } from "./components/add-employee-modal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useEmployees } from "@/hooks/use-employee";
import { PermissionGuard } from "@/components";

export default function EmployeePage() {
	// Use custom meta hook
	useMeta(META_DATA.employee);

	const [searchTerm, setSearchTerm] = useState("");

	const { data: employees = [], error: employeeError } = useEmployees();

	const filteredEmployees = employees.filter(
		(employee) =>
			employee.user.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.user.email
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.user.phone_number.includes(searchTerm) ||
			employee.branch.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.type.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (employeeError) {
		return (
			<Page title="Kelola Karyawan 👥💼 ">
				<div className="flex items-center justify-center h-64">
					<div className="text-center">
						<p className="text-red-600 mb-4">
							Gagal memuat data karyawan
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Coba lagi
						</button>
					</div>
				</div>
			</Page>
		);
	}

	return (
		<>
			<Page 
				title="Kelola Karyawan 👥💼" 
				action={
					<PermissionGuard permission="employee.create">
						<AddEmployeeModal />
					</PermissionGuard>
				}
			>
				<Input
					type="text"
					placeholder="Cari Karyawan (Nama, Email, Telepon, Cabang, Tipe)"
					className="mb-4 w-full max-w-md bg-white"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<PermissionGuard permission="employee.read">
					<DataTable
						data={filteredEmployees}
						columns={columns()}
						title="Daftar Karyawan"
					/>
				</PermissionGuard>
			</Page>
		</>
	);
}
