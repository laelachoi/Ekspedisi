import type { UserAddress } from "@/lib/api/types/user-address";

export const userAddresses: UserAddress[] = [
	{
		id: 1,
		user_id: 1,
		address:
			"Jl. Pahlawan No. 10, RT 002/RW 003, Kelurahan Kebayoran Baru, Jakarta Selatan",
		tag: "Rumah berwarna putih dengan pagar hitam, dekat warung sate",
		label: "Rumah",
		photo: "/images/addresses/home-1.jpg",
		created_at: "2024-05-15T08:30:00Z",
		updated_at: "2024-05-15T08:30:00Z",
		user: {
			id: 1,
			name: "Budi Santoso",
			email: "budi.santoso@example.com",
			phone_number: "081234567890",
			avatar: null,
			created_at: "2024-05-01T08:00:00Z",
			updated_at: "2024-05-01T08:00:00Z",
		},
	},
	{
		id: 2,
		user_id: 1,
		address:
			"Jl. Gatot Subroto No. 55, Menara Kuningan Lt.20, Jakarta Selatan",
		tag: "Gedung kantor warna biru, sebelah kiri pintu masuk utama",
		label: "Kantor",
		photo: "/images/addresses/office-1.jpg",
		created_at: "2024-05-16T09:15:00Z",
		updated_at: "2024-05-16T09:15:00Z",
		user: {
			id: 1,
			name: "Budi Santoso",
			email: "budi.santoso@example.com",
			phone_number: "081234567890",
			avatar: null,
			created_at: "2024-05-01T08:00:00Z",
			updated_at: "2024-05-01T08:00:00Z",
		},
	},
	{
		id: 3,
		user_id: 2,
		address:
			"Jl. Mangga Besar No. 24, RT 001/RW 005, Kelurahan Taman Sari, Jakarta Barat",
		tag: "Toko elektronik dengan spanduk biru, samping restoran padang",
		label: "Toko",
		photo: "/images/addresses/store-1.jpg",
		created_at: "2024-05-17T10:45:00Z",
		updated_at: "2024-06-01T14:20:00Z",
		user: {
			id: 2,
			name: "Siti Rahayu",
			email: "siti.rahayu@example.com",
			phone_number: "081987654321",
			avatar: null,
			created_at: "2024-05-02T08:00:00Z",
			updated_at: "2024-05-02T08:00:00Z",
		},
	},
	{
		id: 4,
		user_id: 2,
		address:
			"Jl. Kemang Raya No. 33, RT 004/RW 002, Kelurahan Kemang, Jakarta Selatan",
		tag: "Kafe dengan teras hijau, sebelah apotek",
		label: "Kafe",
		photo: "/images/addresses/cafe-1.jpg",
		created_at: "2024-05-18T13:20:00Z",
		updated_at: "2024-05-18T13:20:00Z",
		user: {
			id: 2,
			name: "Siti Rahayu",
			email: "siti.rahayu@example.com",
			phone_number: "081987654321",
			avatar: null,
			created_at: "2024-05-02T08:00:00Z",
			updated_at: "2024-05-02T08:00:00Z",
		},
	},
	{
		id: 5,
		user_id: 3,
		address:
			"Jl. Pluit Raya No. 77, RT 008/RW 010, Kelurahan Pluit, Jakarta Utara",
		tag: "Apartemen tower B, lantai 15 unit 1503",
		label: "Apartemen",
		photo: "/images/addresses/apartment-1.jpg",
		created_at: "2024-05-19T15:10:00Z",
		updated_at: "2024-05-19T15:10:00Z",
		user: {
			id: 3,
			name: "Ahmad Rizal",
			email: "ahmad.rizal@example.com",
			phone_number: "081345678901",
			avatar: null,
			created_at: "2024-05-03T08:00:00Z",
			updated_at: "2024-05-03T08:00:00Z",
		},
	},
	{
		id: 6,
		user_id: 3,
		address:
			"Jl. Radio Dalam No. 12, RT 005/RW 007, Kelurahan Gandaria Utara, Jakarta Selatan",
		tag: "Rumah cat kuning dengan taman kecil di depan",
		label: "Rumah Orang Tua",
		photo: "/images/addresses/home-2.jpg",
		created_at: "2024-05-20T16:45:00Z",
		updated_at: "2024-05-20T16:45:00Z",
		user: {
			id: 3,
			name: "Ahmad Rizal",
			email: "ahmad.rizal@example.com",
			phone_number: "081345678901",
			avatar: null,
			created_at: "2024-05-03T08:00:00Z",
			updated_at: "2024-05-03T08:00:00Z",
		},
	},
	{
		id: 7,
		user_id: 4,
		address:
			"Jl. Kebon Jeruk Raya No. 45, RT 003/RW 004, Kelurahan Kebon Jeruk, Jakarta Barat",
		tag: "Ruko dua lantai warna cream, sebelah bank BCA",
		label: "Kantor Cabang",
		photo: "/images/addresses/office-2.jpg",
		created_at: "2024-05-21T11:30:00Z",
		updated_at: "2024-06-10T09:15:00Z",
		user: {
			id: 4,
			name: "Dewi Lestari",
			email: "dewi.lestari@example.com",
			phone_number: "081765432109",
			avatar: null,
			created_at: "2024-05-04T08:00:00Z",
			updated_at: "2024-05-04T08:00:00Z",
		},
	},
	{
		id: 8,
		user_id: 4,
		address:
			"Jl. Pondok Indah Raya No. 101, RT 010/RW 012, Kelurahan Pondok Indah, Jakarta Selatan",
		tag: "Rumah dengan pagar putih dan pohon mangga di depan",
		label: "Rumah",
		photo: "/images/addresses/home-3.jpg",
		created_at: "2024-05-22T14:20:00Z",
		updated_at: "2024-05-22T14:20:00Z",
		user: {
			id: 4,
			name: "Dewi Lestari",
			email: "dewi.lestari@example.com",
			phone_number: "081765432109",
			avatar: null,
			created_at: "2024-05-04T08:00:00Z",
			updated_at: "2024-05-04T08:00:00Z",
		},
	},
];

// Legacy export for backward compatibility
export type UserAddressItem = UserAddress;

export const mockUserAddressService = {
	getAll: async (): Promise<UserAddress[]> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return userAddresses;
	},

	getById: async (id: number): Promise<UserAddress | null> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return userAddresses.find((address) => address.id === id) || null;
	},

	getByUserId: async (userId: number): Promise<UserAddress[]> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return userAddresses.filter((address) => address.user_id === userId);
	},

	create: async (
		data: Omit<UserAddress, "id" | "created_at" | "updated_at">
	): Promise<UserAddress> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const newAddress: UserAddress = {
			id: Math.max(...userAddresses.map((a) => a.id)) + 1,
			...data,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		userAddresses.push(newAddress);
		return newAddress;
	},

	update: async (
		id: number,
		data: Partial<Omit<UserAddress, "id" | "created_at" | "updated_at">>
	): Promise<UserAddress | null> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const index = userAddresses.findIndex((address) => address.id === id);
		if (index === -1) return null;

		userAddresses[index] = {
			...userAddresses[index],
			...data,
			updated_at: new Date().toISOString(),
		};
		return userAddresses[index];
	},

	delete: async (id: number): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		const index = userAddresses.findIndex((address) => address.id === id);
		if (index === -1) return false;

		userAddresses.splice(index, 1);
		return true;
	},
};
