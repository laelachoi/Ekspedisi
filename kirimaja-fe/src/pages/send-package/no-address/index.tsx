import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/components/ui/page";
import { Location, Add } from "iconsax-reactjs";
import { useNavigate } from "react-router";

export default function NoAddressPage() {
	const navigate = useNavigate();

	return (
		<Page title="Tambah Alamat Terlebih Dahulu 📍">
			<div className="flex items-center justify-center min-h-[60vh]">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
							<Location
								className="text-orange-500"
								size={32}
								variant="Bold"
							/>
						</div>
						<CardTitle className="text-xl font-semibold">
							Belum Ada Alamat
						</CardTitle>
					</CardHeader>
					<CardContent className="text-center space-y-4">
						<p className="text-gray-600">
							Untuk membuat pengiriman, Anda perlu menambahkan
							alamat terlebih dahulu.
						</p>
						<p className="text-sm text-gray-500">
							Alamat akan digunakan sebagai lokasi penjemputan
							paket Anda.
						</p>

						<div className="pt-4">
							<Button
								variant="darkGreen"
								className="w-full"
								onClick={() => navigate("/user-addresses/add")}
							>
								<Add
									className="mr-2"
									size={20}
									variant="Bold"
								/>
								Tambah Alamat
							</Button>
						</div>

						<div className="pt-2">
							<Button
								variant="outline"
								className="w-full"
								onClick={() => navigate("/user-addresses")}
							>
								Lihat Alamat Saya
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</Page>
	);
}
