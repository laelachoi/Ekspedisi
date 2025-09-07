import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { EmailService } from "../email/email.service";
import { EmailQueueProcessor } from "./processors/email-queue.processor";

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379', 10),
                password: process.env.REDIS_PASSWORD,
            },
        }),
        BullModule.registerQueue({
            name: 'email-queue',
        }),
    ],
    controllers: [],
    providers: [QueueService, EmailService, EmailQueueProcessor],
    exports: [QueueService],
})
export class QueueModule {}