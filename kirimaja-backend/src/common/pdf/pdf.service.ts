import { Injectable } from "@nestjs/common";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import * as fs from 'fs';
import * as path from "path";

export interface ShipmentPdfData {
    // Shipment info
    trackingNumber: string;
    shipmentId: number;
    createdAt: Date;
    deliveryType: string;
    packageType: string;
    weight: number;
    price: number;
    distance: number;
    paymentStatus: string;
    deliveryStatus: string;
    currentStatus?: string;

    // Price breakdown
    basePrice?: number;
    weightPrice?: number;
    distancePrice?: number;

    // Sender info
    senderName: string;
    senderEmail: string;
    senderPhone: string;
    pickupAddress: string;

    // Recipient info
    recipientName: string;
    recipientPhone: string;
    destinationAddress: string;

    // QR code
    qrCodePath?: string; 
}

@Injectable()
export class PdfService {
    private templateCache = new Map<string, Handlebars.TemplateDelegate>();

    async generateShipmentPdf(data: ShipmentPdfData): Promise<Buffer> {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });

        try {
            const page = await browser.newPage();
            const htmlContent = await this.generateShipmentPdfHtml(data);
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0',
            });
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20px',
                    right: '10px',
                    bottom: '20px',
                    left: '10px',
                },
            });

            return Buffer.from(pdfBuffer);
        } catch (error) {
            console.error('Error generating PDf:', error);
            throw error;
        }
    }

    async generateShipmentPdfHtml(data: ShipmentPdfData): Promise<string> {
        const template = await this.loadTemplate('shipping-pdf.hbs');
        const css = await this.loadCssFile('shipping-pdf.css');

        const qrCodeBase64 = data.qrCodePath
            ? this.getBase64Image(`public/${data.qrCodePath}`)
            : '';

        const templateData = {
            trackingNumber: data.trackingNumber,
            shipmentId: data.shipmentId,
            createdDate: new Date(data.createdAt).toLocaleDateString('id-ID'),
            deliveryType: data.deliveryType,
            packageType: data.packageType,
            weight: data.weight,
            price: data.price.toLocaleString('id-ID'),
            distance: data.distance.toFixed(2),
            paymentStatus: data.paymentStatus,
            deliveryStatus: data.deliveryStatus,
            currentStatus: data.currentStatus || 'N/A',
            basePrice: data.basePrice?.toLocaleString('id-ID') || '0',
            weightPrice: data.weightPrice?.toLocaleString('id-ID') || '0',
            distancePrice: data.distancePrice?.toLocaleString('id-ID') || '0',
            senderName: data.senderName,
            senderEmail: data.senderEmail,
            senderPhone: data.senderPhone,
            pickupAddress: data.pickupAddress,
            recipientName: data.recipientName,
            recipientPhone: data.recipientPhone,
            destinationAddress: data.destinationAddress,
            qrCodeBase64: qrCodeBase64,
            generatedDate: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            styles: css,
        };

        return template(templateData);
    }

    private async loadTemplate(
        templateName: string,
    ): Promise<HandlebarsTemplateDelegate> {
        if (this.templateCache.has(templateName)) {
            return this.templateCache.get(templateName)!;
        }

        const templatePath = path.join(
            './src/common/pdf',
            'templates',
            templateName,
        );
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(templateSource);

        this.templateCache.set(templateName, template);
        return template;
    }

    private async loadCssFile(cssFileName: string): Promise<string> {
        const cssPath = path.join('./src/common/pdf', 'templates', cssFileName);
        return fs.readFileSync(cssPath, 'utf-8');
    }

    // load pict qrcode, convert to base64
    private getBase64Image(imagePath: string): string {
        try {
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath);
                const base64String = imageBuffer.toString('base64');
                return base64String;
            } else {
                console.warn(`QR code file not found at path: ${imagePath}`);
                return '';
            }
        } catch (error) {
            console.error('Error reading QR code image:', error);
            return '';
        }
    }
}