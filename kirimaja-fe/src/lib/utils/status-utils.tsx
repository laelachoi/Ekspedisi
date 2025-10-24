import { BoxTick, CloseCircle, Location, Timer, TruckTime } from "iconsax-reactjs";

export const getStatusLabel = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'pending':
            return "Menunggu Konfirmasi";
        case 'waiting_pickup':
            return "Menunggu Dijemput";
        case 'picked_up':
            return "Sudah Dijemput"
        case 'in_transit':
            return "Dalam Perjalanan";
        case 'arrived_at_branch':
            return "Tiba di Cabang";
        case 'at_branch':
            return "Di Cabang";
        case 'ready_to_pickup':
            return "Siap Dijemput";
        case 'ready_to_pickup_at_branch':
            return "Siap Dijemput di Cabang";
        case 'departed_from_branch':
            return "Berangkat dari Cabang";
        case 'on_the_way':
            return "Menuju Cabang Tujuan";
        case 'on_the_way_to_address':
            return "Menuju Alamat Tujuan";
        case 'ready_to_deliver':
            return "Siap Dikirim";
        case 'delivered':
            return "Terkirim";
        case 'completed':
            return "Selesai";
        case 'failed':
            return "Gagal";
        default:
            return status;
    }
};

export const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
        case 'waiting_pickup':
        case 'ready_to_deliver':
        case 'ready_to_pickup':
            return <Timer size={20} variant="Bold" />;
        case 'picked_up':
        case 'in_transit':
        case 'on_the_way':
        case 'on_the_way_to_address':
        case 'departed_from_branch':
            return <TruckTime size={20} variant="Bold" />;
        case 'arrived_at_branch':
        case 'at_branch':
        case 'ready_to_pickup_at_branch':
            return <Location size={20} variant="Bold" />;
        case 'delivered':
        case 'completed':
            return <BoxTick size={20} variant="Bold" />;
        case 'failed':
            return <CloseCircle size={20} variant="Bold" />;
        default:
            return <Timer size={20} variant="Bold" />;
    }
};

export const getStatusBadgeVariant = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'pending':
        case 'waiting_pickup':
            return "secondary";
        case 'picked_up':
        case 'in_transit':
        case 'on_the_way':
        case 'on_the_way_to_address':
        case 'departed_from_branch':
        case 'ready_to_deliver':
        case 'ready_to_pickup':
            return "default";
        case 'arrived_at_branch':
        case 'at_branch':
        case 'ready_to_pickup_at_branch':
            return "outline";
        case 'delivered':
        case 'completed':
            return "darkgreen";
        case 'failed':
            return "destructive";
        default:
            return "secondary";
    }
}