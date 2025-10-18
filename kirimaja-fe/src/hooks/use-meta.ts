import { useEffect } from "react";

// Meta data configuration for all pages
export interface MetaData {
	title: string;
	description: string;
}

// Custom hook for managing meta tags
export const useMeta = (meta: MetaData) => {
	useEffect(() => {
		// Update document title
		if (meta.title) {
			document.title = meta.title;
		}

		// Update meta description
		if (meta.description) {
			let metaDesc = document.querySelector('meta[name="description"]');
			if (!metaDesc) {
				metaDesc = document.createElement("meta");
				metaDesc.setAttribute("name", "description");
				document.head.appendChild(metaDesc);
			}
			metaDesc.setAttribute("content", meta.description);
		}
	}, [meta]);
};

export const META_DATA: Record<string, MetaData> = {
	dashboard: {
		title: "Dashboard - Gokirim",
		description:
			"Dashboard utama untuk mengelola pengiriman dan melihat statistik pengiriman paket",
	},
	login: {
		title: "Login - Gokirim",
		description:
			"Masuk ke akun Gokirim untuk mengakses layanan pengiriman paket",
	},
	register: {
		title: "Daftar - Gokirim",
		description:
			"Daftar akun baru Gokirim untuk mulai menggunakan layanan pengiriman",
	},
	profile: {
		title: "Profil - Gokirim",
		description:
			"Kelola informasi profil dan pengaturan akun Gokirim Anda",
	},
	delivery: {
		title: "Pengiriman - Gokirim",
		description:
			"Kelola dan pantau semua pengiriman paket yang sedang berlangsung",
	},
	"send-package": {
		title: "Kirim Paket - Gokirim",
		description:
			"Kirim paket dengan mudah dan aman melalui layanan Gokirim",
	},
	"send-package-add": {
		title: "Buat Pengiriman Baru - Gokirim",
		description:
			"Buat pengiriman paket baru dengan mengisi detail alamat dan informasi paket",
	},
	"send-package-detail": {
		title: "Detail Pengiriman - Gokirim",
		description:
			"Lihat detail lengkap pengiriman paket dan informasi tracking",
	},
	"send-package-pay": {
		title: "Pembayaran Pengiriman - Gokirim",
		description: "Lakukan pembayaran untuk pengiriman paket Anda",
	},
	history: {
		title: "Riwayat Pengiriman - Gokirim",
		description:
			"Lihat riwayat semua pengiriman paket yang pernah Anda lakukan",
	},
	"history-detail": {
		title: "Detail Riwayat Pengiriman - Gokirim",
		description: "Lihat detail lengkap riwayat pengiriman paket",
	},
	"track-package": {
		title: "Lacak Paket - Gokirim",
		description: "Lacak dan cek status pengiriman paket dengan nomor resi",
	},
	branch: {
		title: "Kelola Cabang - Gokirim",
		description: "Kelola informasi cabang dan lokasi layanan Gokirim",
	},
	role: {
		title: "Kelola Role - Gokirim",
		description: "Kelola role dan hak akses pengguna dalam sistem",
	},
	employee: {
		title: "Kelola Karyawan - Gokirim",
		description: "Kelola data karyawan dan informasi personil",
	},
	"user-addresses": {
		title: "Alamat Saya - Gokirim",
		description:
			"Kelola alamat pengiriman dan penerima untuk kemudahan berkirim",
	},
	"user-addresses-add": {
		title: "Tambah Alamat - Gokirim",
		description: "Tambah alamat baru untuk pengiriman paket",
	},
	"user-addresses-edit": {
		title: "Edit Alamat - Gokirim",
		description: "Edit dan perbarui informasi alamat pengiriman",
	},
	"shipment-branch": {
		title: "Pengiriman Cabang - Gokirim",
		description: "Kelola pengiriman antar cabang dan transfer paket",
	},
};
