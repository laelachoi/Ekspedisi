import type { ShipmentBranchLog } from "@/lib/api/types/shipment-branch";

export const shipmentBranchLogs: ShipmentBranchLog[] = [
	{
		id: 1,
		tracking_number: "KJ2024001",
		type: "IN",
		branch_id: 1,
		user_id: 101,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: 2,
		tracking_number: "KJ2024002",
		type: "OUT",
		branch_id: 1,
		user_id: 102,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: 3,
		tracking_number: "KJ2024003",
		type: "IN",
		branch_id: 2,
		user_id: 103,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
	},
	{
		id: 4,
		tracking_number: "KJ2024004",
		type: "IN",
		branch_id: 1,
		user_id: 101,
		is_ready_to_pickup: true,
		created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
	},
	{
		id: 5,
		tracking_number: "KJ2024005",
		type: "OUT",
		branch_id: 3,
		user_id: 104,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
	},
	{
		id: 6,
		tracking_number: "KJ2024006",
		type: "IN",
		branch_id: 1,
		user_id: 102,
		is_ready_to_pickup: false,
		created_at: new Date().toISOString(),
	},
	{
		id: 7,
		tracking_number: "KJ2024007",
		type: "OUT",
		branch_id: 2,
		user_id: 103,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: 8,
		tracking_number: "KJ2024008",
		type: "IN",
		branch_id: 1,
		user_id: 101,
		is_ready_to_pickup: false,
		created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
	},
];

export const mockShipmentBranchService = {
	getAll: async (): Promise<ShipmentBranchLog[]> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return shipmentBranchLogs;
	},

	getByBranchId: async (branchId: number): Promise<ShipmentBranchLog[]> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return shipmentBranchLogs.filter((log) => log.branch_id === branchId);
	},

	getByTrackingNumber: async (
		trackingNumber: string
	): Promise<ShipmentBranchLog[]> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return shipmentBranchLogs.filter(
			(log) => log.tracking_number === trackingNumber
		);
	},

	scan: async (
		trackingNumber: string,
		type: "IN" | "OUT",
		isReadyToPickup = false,
		userId: number,
		branchId: number
	): Promise<ShipmentBranchLog> => {
		await new Promise((resolve) => setTimeout(resolve, 600));

		const newLog: ShipmentBranchLog = {
			id: Math.max(...shipmentBranchLogs.map((l) => l.id)) + 1,
			tracking_number: trackingNumber,
			type,
			branch_id: branchId,
			user_id: userId,
			is_ready_to_pickup: isReadyToPickup,
			created_at: new Date().toISOString(),
		};

		shipmentBranchLogs.push(newLog);
		return newLog;
	},
};
