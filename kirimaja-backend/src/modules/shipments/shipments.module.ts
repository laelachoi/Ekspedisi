import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { OpenCageService } from 'src/common/opencage/opencage.service';
import { XenditService } from 'src/common/xendit/xendit.service';
import { QueueModule } from 'src/common/queue/queue.module';
import { ShipmentsWebhookController } from './webhook/shipments-webhook.controller';
import { QrCodeService } from 'src/common/qrcode/qrcode.service';

@Module({
    imports: [QueueModule],
    controllers: [ShipmentsController, ShipmentsWebhookController],
    providers: [
        ShipmentsService,
        PrismaService,
        OpenCageService,
        XenditService,
        QrCodeService,
    ],
})
export class ShipmentsModule {}
