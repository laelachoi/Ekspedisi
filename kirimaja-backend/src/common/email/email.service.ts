import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { title } from "process";
import { from } from "rxjs";

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private templatesPath: string;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        this.templatesPath = path.join('./src/common/email/templates');
    }

    private loadTemplate(templateName: string): string {
        const templatePath = path.join(
            this.templatesPath,
            `${templateName}.hbs`
        );
        return require('fs').readFileSync(templatePath, 'utf8');
    }

    private compileTemplate(templateName: string, data: any): string {
        const templateSource = this.loadTemplate(templateName);
        const template = require('handlebars').compile(templateSource);
        return template(data);
    }

    async testingEmail(to: string): Promise<void> {
        const templateData = {
            title: 'Test Email',
            message: 'This is a test email from our application.',
        };

        const htmlContent = this.compileTemplate('test-email', templateData);

        const mailOptions = {
            from: process.env.SMTP_EMAIL_SENDER || 'tes@gmail.com',
            to,
            subject: 'Test Email',
            html: htmlContent,
        };

        await this.transporter.sendMail(mailOptions);
    }
}