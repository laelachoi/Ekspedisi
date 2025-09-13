import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { PrismaService } from 'src/common/prisma/prisma.service';

export interface PaymentExpiryJobData {
    paymentId: number;
    shipmentId: number;
    externalId: string;
}

@Processor('payment-expired-queue')
@Injectable()
export class PaymentExpiryQueueProcessor {
    private readonly logger = new Logger(PaymentExpiryQueueProcessor.name);

    constructor(private readonly prismaService: PrismaService) {}

    @Process('expire-payment')
    async handleExpirePayment(job: Job<PaymentExpiryJobData>) {
        const { data } = job;
        this.logger.log(
            `Processing payment expiry for payment ID: ${data.paymentId}`,
        );

        try {
            // Check if payment is still pending
            const payment = await this.prismaService.payment.findUnique({
                where: { id: data.paymentId },
                include: {
                    shipment: {
                        include: {
                            shipmentDetail: {
                                include: {
                                    user: {
                                        select: {
                                            email: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            if (!payment) {
                this.logger.warn(`Payment with ID ${data.paymentId} not found`);
                return;
            }

            // Only expire if payment is still pending
            if (payment.status !== PaymentStatus.PENDING) {
                this.logger.log(
                    `Payment ${data.paymentId} is no longer pending (status: ${payment.status}). Skipping expiry.`,
                );
                return;
            }

            // Update payment and shipment status to expired
            await this.prismaService.$transaction(async (tx) => {
                // Update payment status
                await tx.payment.update({
                    where: { id: data.paymentId },
                    data: {
                        status: PaymentStatus.EXPIRED,
                    },
                });

                // Update shipment status
                await tx.shipment.update({
                    where: { id: data.shipmentId },
                    data: {
                        paymentStatus: PaymentStatus.EXPIRED,
                    },
                });

                // Add shipment history
                await tx.shipmentHistory.create({
                    data: {
                        shipmentId: data.shipmentId,
                        status: PaymentStatus.EXPIRED,
                        description: 'Payment expired - automatic expiry',
                    },
                });
            });

            this.logger.log(
                `Payment ${data.paymentId} has been expired successfully`,
            );
            // Just update status
            // We don't send email here as it will be handled by webhook processor
            // When xendit sends the expiry webhook
        } catch (error) {
            this.logger.error(
                `Failed to expiry payment ${data.paymentId}`,
                error.stack,
            );
            throw error;
        }
    }
}
