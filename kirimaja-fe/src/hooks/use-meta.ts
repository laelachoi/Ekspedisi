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
		title: "Dashboard - KirimAja",
		description:
			"Dashboard utama untuk mengelola pengiriman dan melihat statistik pengiriman paket",
	},
	login: {
		title: "Login - KirimAja",
		description:
			"Masuk ke akun KirimAja untuk mengakses layanan pengiriman paket",
	},
	register: {
		title: "Daftar - KirimAja",
		description:
			"Daftar akun baru KirimAja untuk mulai menggunakan layanan pengiriman",
	},
	profile: {
		title: "Profil - KirimAja",
		description:
			"Kelola informasi profil dan pengaturan akun KirimAja Anda",
	},
	delivery: {
		title: "Pengiriman - KirimAja",
		description:
			"Kelola dan pantau semua pengiriman paket yang sedang berlangsung",
	},
	"send-package": {
		title: "Kirim Paket - KirimAja",
		description:
			"Kirim paket dengan mudah dan aman melalui layanan KirimAja",
	},
	"send-package-add": {
		title: "Buat Pengiriman Baru - KirimAja",
		description:
			"Buat pengiriman paket baru dengan mengisi detail alamat dan informasi paket",
	},
	"send-package-detail": {
		title: "Detail Pengiriman - KirimAja",
		description:
			"Lihat detail lengkap pengiriman paket dan informasi tracking",
	},
	"send-package-pay": {
		title: "Pembayaran Pengiriman - KirimAja",
		description: "Lakukan pembayaran untuk pengiriman paket Anda",
	},
	history: {
		title: "Riwayat Pengiriman - KirimAja",
		description:
			"Lihat riwayat semua pengiriman paket yang pernah Anda lakukan",
	},
	"history-detail": {
		title: "Detail Riwayat Pengiriman - KirimAja",
		description: "Lihat detail lengkap riwayat pengiriman paket",
	},
	"track-package": {
		title: "Lacak Paket - KirimAja",
		description: "Lacak dan cek status pengiriman paket dengan nomor resi",
	},
	branch: {
		title: "Kelola Cabang - KirimAja",
		description: "Kelola informasi cabang dan lokasi layanan KirimAja",
	},
	role: {
		title: "Kelola Role - KirimAja",
		description: "Kelola role dan hak akses pengguna dalam sistem",
	},
	employee: {
		title: "Kelola Karyawan - KirimAja",
		description: "Kelola data karyawan dan informasi personil",
	},
	"user-addresses": {
		title: "Alamat Saya - KirimAja",
		description:
			"Kelola alamat pengiriman dan penerima untuk kemudahan berkirim",
	},
	"user-addresses-add": {
		title: "Tambah Alamat - KirimAja",
		description: "Tambah alamat baru untuk pengiriman paket",
	},
	"user-addresses-edit": {
		title: "Edit Alamat - KirimAja",
		description: "Edit dan perbarui informasi alamat pengiriman",
	},
	"shipment-branch": {
		title: "Pengiriman Cabang - KirimAja",
		description: "Kelola pengiriman antar cabang dan transfer paket",
	},
};
