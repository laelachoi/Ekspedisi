// Webhook related types

export interface XenditWebhookRequest {
	id: string;
	external_id: string;
	status: string;
	paid_amount: number;
	payment_channel: string;
	paid_at: string;
}

export interface XenditWebhookResponse {
	message: string;
}
