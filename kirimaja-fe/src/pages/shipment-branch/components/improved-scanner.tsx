import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, StopCircle } from "iconsax-reactjs";

interface ImprovedScannerProps {
	onScanSuccess: (decodedText: string) => void;
	onScanError?: (error: string) => void;
	isActive: boolean;
	className?: string;
}

export function ImprovedScanner({
	onScanSuccess,
	onScanError,
	isActive,
	className = "",
}: ImprovedScannerProps) {
	const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
	const [isScanning, setIsScanning] = useState(false);
	const [error, setError] = useState<string>("");
	const [cameras, setCameras] = useState<
		Array<{ id: string; label: string }>
	>([]);
	const scannerRef = useRef<HTMLDivElement>(null);
	const elementId = `qr-scanner-${Math.random().toString(36).substr(2, 9)}`;

	// Get available cameras
	useEffect(() => {
		Html5Qrcode.getCameras()
			.then((devices) => {
				setCameras(
					devices.map((device) => ({
						id: device.id,
						label: device.label,
					}))
				);
			})
			.catch((err) => {
				console.error("Error getting cameras:", err);
				setError(
					"Cannot access cameras. Please ensure camera permissions are granted."
				);
			});
	}, []);

	// Start/stop scanner based on isActive prop
	useEffect(() => {
		if (isActive && cameras.length > 0) {
			startScanner();
		} else if (!isActive) {
			stopScanner();
		}

		return () => {
			stopScanner();
		};
	}, [isActive, cameras.length]);

	const startScanner = async () => {
		if (isScanning || !cameras.length) return;

		try {
			setError("");

			const html5QrCodeInstance = new Html5Qrcode(elementId);
			setHtml5QrCode(html5QrCodeInstance);

			// Use the first available camera (usually back camera on mobile)
			const cameraId = cameras[0].id;

			const config = {
				fps: 10,
				qrbox: { width: 250, height: 250 },
				aspectRatio: 1.0,
			};

			await html5QrCodeInstance.start(
				cameraId,
				config,
				(decodedText) => {
					onScanSuccess(decodedText);
				},
				(errorMessage) => {
					// Only log non-spam errors
					if (
						!errorMessage.includes("NotFoundError") &&
						!errorMessage.includes("No QR code found")
					) {
						onScanError?.(errorMessage);
					}
				}
			);

			setIsScanning(true);
		} catch (err: unknown) {
			console.error("Error starting scanner:", err);
			const errorMessage =
				err instanceof Error ? err.message : String(err);
			setError(`Failed to start camera: ${errorMessage}`);
			setIsScanning(false);
		}
	};

	const stopScanner = async () => {
		if (!html5QrCode || !isScanning) return;

		try {
			if (html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
				await html5QrCode.stop();
			}

			html5QrCode.clear();
			setHtml5QrCode(null);
			setIsScanning(false);
		} catch (err: unknown) {
			console.error("Error stopping scanner:", err);
			const errorMessage =
				err instanceof Error ? err.message : String(err);
			setError(`Failed to stop camera: ${errorMessage}`);
		}
	};

	return (
		<div className={`space-y-4 ${className}`}>
			<div className="bg-white rounded-lg border overflow-hidden">
				<div
					id={elementId}
					ref={scannerRef}
					style={{ width: "100%", minHeight: "300px" }}
				/>
			</div>

			{error && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-3">
					<p className="text-sm text-red-600">{error}</p>
				</div>
			)}

			<div className="flex justify-center gap-2">
				{!isScanning ? (
					<Button
						onClick={startScanner}
						disabled={cameras.length === 0}
						className="flex items-center gap-2"
					>
						<Camera size={16} />
						Start Camera
					</Button>
				) : (
					<Button
						onClick={stopScanner}
						variant="outline"
						className="flex items-center gap-2"
					>
						<StopCircle size={16} />
						Stop Camera
					</Button>
				)}
			</div>

			{cameras.length === 0 && (
				<div className="text-center text-sm text-gray-500">
					<p>No cameras detected. Please ensure:</p>
					<ul className="list-disc list-inside mt-2">
						<li>Camera permissions are granted</li>
						<li>Camera is not being used by another application</li>
						<li>
							You're accessing the site via HTTPS or localhost
						</li>
					</ul>
				</div>
			)}

			<div className="text-center text-xs text-gray-500">
				<p>Detected {cameras.length} camera(s)</p>
				{cameras.length > 0 && (
					<p>Using: {cameras[0].label || "Default Camera"}</p>
				)}
			</div>
		</div>
	);
}
