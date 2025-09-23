import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DeliveryForm } from "./components/delivery-form";
import { Slash } from "lucide-react";
import { useMeta, META_DATA } from "@/hooks/use-meta";

const Page = () => {
	// Use custom meta hook
	useMeta(META_DATA["send-package-add"]);

	return (
		<>
			<main className="px-8 py-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/send-package">
								Kirim Paket
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash size={16} />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>Tambah Pengiriman</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="my-4">
					<h1 className="text-3xl font-bold">Pengiriman Product</h1>
				</div>
				<DeliveryForm />
			</main>
		</>
	);
};

export default Page;
