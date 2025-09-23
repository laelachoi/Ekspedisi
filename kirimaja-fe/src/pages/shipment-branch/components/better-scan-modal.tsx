import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
	ArrowDown,
	ArrowUp,
	ScanBarcode,
	Timer,
	Camera,
} from "iconsax-reactjs";
import { ImprovedScanner } from "./improved-scanner";
import { scanFormSchema, type ScanFormData } from "@/lib/validations/shipment";
import type { ShipmentBranchLog } from "@/lib/api/types/shipment-branch";

interface BetterScanModalProps {
	isOpen: boolean;
	onClose: () => void;
	type: "IN" | "OUT";
	onScanComplete?: (newLog?: Partial<ShipmentBranchLog>) => void;
}

export function BetterScanModal({
	isOpen,
	onClose,
	type,
	onScanComplete,
}: BetterScanModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("manual");
	const [isScannerActive, setIsScannerActive] = useState(false);

	const form = useForm<ScanFormData>({
		resolver: zodResolver(scanFormSchema),
		defaultValues: {
			trackingNumber: "",
			is_ready_to_pickup: false,
		},
	});

	// Reset states when modal opens/closes
	useEffect(() => {
		if (isOpen) {
			setActiveTab("manual");
			setIsScannerActive(false);
			form.reset();
		} else {
			setIsScannerActive(false);
		}
	}, [isOpen, form]);

	// Handle tab changes
	useEffect(() => {
		setIsScannerActive(activeTab === "scanner");
	}, [activeTab]);

	const handleQrScan = (decodedText: string) => {
		if (decodedText) {
			// Extract tracking number from QR code result
			let trackingNumber = decodedText;

			// If the QR code contains JSON, try to extract tracking number
			try {
				const parsed = JSON.parse(decodedText);
				if (parsed.tracking_number) {
					trackingNumber = parsed.tracking_number;
				} else if (parsed.trackingNumber) {
					trackingNumber = parsed.trackingNumber;
				}
			} catch {
				// If not JSON, assume the result is the tracking number itself
				trackingNumber = decodedText.trim();
			}

			form.setValue("trackingNumber", trackingNumber);

			// Stop scanner and switch to manual tab
			setIsScannerActive(false);
			setActiveTab("manual");
			toast.success("QR Code berhasil dipindai!");
		}
	};

	const handleQrError = (error: string) => {
		// Handle scanner errors silently or show user-friendly message
		console.warn("QR Scanner error:", error);
		toast.error("Gagal memindai QR code");
	};

	async function onSubmit(values: ScanFormData) {
		try {
			setIsLoading(true);
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const newLogData = {
				tracking_number: values.trackingNumber,
				type,
				description: `Paket ${
					type === "IN" ? "masuk" : "keluar"
				} dari cabang melalui scan`,
			};

			// Simulate scan process

			toast.success(
				`Paket berhasil discan ${
					type === "IN" ? "masuk" : "keluar"
				} cabang`
			);
			form.reset();
			onClose();
			onScanComplete?.(newLogData);
		} catch (error: unknown) {
			console.error("Error scanning shipment:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: `Gagal scan ${
							type === "IN" ? "masuk" : "keluar"
					  } paket. Silakan coba lagi.`;
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCancel = () => {
		setIsScannerActive(false);
		onClose();
		form.reset();
	};

	const getIcon = () => {
		return type === "IN" ? (
			<ArrowDown size={24} variant="Bold" className="text-green-600" />
		) : (
			<ArrowUp size={24} variant="Bold" className="text-blue-600" />
		);
	};

	const getTitle = () => {
		return type === "IN" ? "Scan Paket Masuk" : "Scan Paket Keluar";
	};

	const getDescription = () => {
		return type === "IN"
			? "Scan QR code atau masukkan nomor resi untuk paket yang masuk ke cabang"
			: "Scan QR code atau masukkan nomor resi untuk paket yang keluar dari cabang";
	};

	const getBadgeColor = () => {
		return type === "IN"
			? "bg-green-100 text-green-800 border-green-200"
			: "bg-blue-100 text-blue-800 border-blue-200";
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleCancel}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						{getIcon()}
						{getTitle()}
						<Badge variant="outline" className={getBadgeColor()}>
							{type}
						</Badge>
					</DialogTitle>
					<DialogDescription>{getDescription()}</DialogDescription>
				</DialogHeader>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger
							value="scanner"
							className="flex items-center gap-2"
						>
							<Camera size={16} />
							Scanner
						</TabsTrigger>
						<TabsTrigger
							value="manual"
							className="flex items-center gap-2"
						>
							<ScanBarcode size={16} />
							Manual
						</TabsTrigger>
					</TabsList>

					<TabsContent value="scanner" className="space-y-4">
						<div className="space-y-4">
							<div className="bg-blue-50 p-3 rounded-lg">
								<div className="flex items-center gap-2 text-blue-700">
									<Camera size={16} />
									<span className="text-sm font-medium">
										Arahkan kamera ke QR code pada paket
									</span>
								</div>
							</div>

							<ImprovedScanner
								onScanSuccess={handleQrScan}
								onScanError={handleQrError}
								isActive={isScannerActive}
							/>
						</div>
					</TabsContent>

					<TabsContent value="manual" className="space-y-4">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="trackingNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nomor Resi</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Masukkan nomor resi"
													className="text-center font-mono"
													autoFocus
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="is_ready_to_pickup"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="text-sm font-medium">
													Siap untuk Pickup
												</FormLabel>
												<p className="text-xs text-muted-foreground">
													Centang jika paket sudah
													siap untuk dijemput
												</p>
											</div>
										</FormItem>
									)}
								/>

								<div className="bg-blue-50 p-3 rounded-lg">
									<div className="flex items-center gap-2 text-blue-700">
										<Timer size={16} />
										<span className="text-sm font-medium">
											Status:{" "}
											{type === "IN"
												? "Paket Masuk Cabang"
												: "Paket Keluar Cabang"}
										</span>
									</div>
								</div>

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
										variant="default"
										disabled={isLoading}
										className={
											type === "IN"
												? "bg-green-600 hover:bg-green-700 text-white"
												: "bg-blue-600 hover:bg-blue-700 text-white"
										}
									>
										{isLoading
											? "Memproses..."
											: `Scan ${type}`}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
