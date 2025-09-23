export const deliveries: DeliveryItem[] = [
	{
		resi: "TRK9876543210",
		product: "Samsung A54",
		pickupAddr: "Jl. Diponegoro No. 5",
		destinationAddr: "Jl. Gubeng No. 10",
		pickupDate: "02-03-2025",
		weight: 1.5,
		status: "picked up",
	},
	{
		resi: "TRK5678901234",
		product: "Headset H390",
		pickupAddr: "Jl. Siliwangi No. 3",
		destinationAddr: "Jl. Asia Afrika No. 4",
		pickupDate: "03-03-2025",
		weight: 0.5,
		status: "in transit",
	},
	{
		resi: "TRK1928374650",
		product: "Tas Ransel",
		pickupAddr: "Jl. Sudirman No. 12",
		destinationAddr: "Jl. A Yani No. 15",
		pickupDate: "05-03-2025",
		weight: 2.0,
		status: "picked up",
	},
	{
		resi: "TRK5647382910",
		product: "Keyboard",
		pickupAddr: "Jl. T Umar No. 9",
		destinationAddr: "Jl. Raya Kuta No. 11",
		pickupDate: "06-03-2025",
		status: "waiting pickup",
		weight: 1.0,
	},
	{
		resi: "TRK7483920165",
		product: "Smartwatch Xiorni",
		pickupAddr: "Jl. Soe-Hatta No. 3",
		destinationAddr: "Jl. Pahlawan No. 5",
		pickupDate: "08-03-2025",
		status: "delivered",
		weight: 0.3,
		delivery_type: "same day",
	},
];

export type DeliveryItem = {
	resi: string;
	product: string;
	pickupAddr: string;
	destinationAddr: string;
	weight?: number;
	pickupDate: string;
	status:
		| "picked up"
		| "waiting pickup"
		| "in transit"
		| "delivered"
		| "failed";
	delivery_type?: "same day" | "next day" | "instant";
};
