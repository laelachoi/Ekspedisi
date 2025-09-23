import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { AddEmployeeModal } from "./components/add-employee-modal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { employees } from "@/data/employee";
import { Toaster } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function EmployeePage() {
	// Use custom meta hook
	useMeta(META_DATA.employee);

	const [searchTerm, setSearchTerm] = useState("");

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

	return (
		<>
			<Page title="Kelola Karyawan 👥💼" action={<AddEmployeeModal />}>
				<Input
					type="text"
					placeholder="Cari Karyawan (Nama, Email, Telepon, Cabang, Tipe)"
					className="mb-4 w-full max-w-md bg-white"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<DataTable
					data={filteredEmployees}
					columns={columns()}
					title="Daftar Karyawan"
				/>
				<Toaster position="top-right" />
			</Page>
		</>
	);
}
