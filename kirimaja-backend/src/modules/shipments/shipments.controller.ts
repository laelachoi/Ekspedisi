import { Controller, Get, Post, Body, Param, UseGuards, Res, Req } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { JwtAuthGuard } from '../auth/guards/logged-in.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { Shipment } from '@prisma/client';
import { Response } from 'express';

@Controller('shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @RequirePermissions('shipments.create')
  async create(
    @Body() createShipmentDto: CreateShipmentDto,
  ): Promise<BaseResponse<Shipment>> {
    return {
      data: await this.shipmentsService.create(createShipmentDto),
      message: 'Shipment created successfully',
    };
  }

  @Get()
  async findAll(
    @Req() req: Request & { user?: any },
  ): Promise<BaseResponse<Shipment[]>> {
    return {
      data: await this.shipmentsService.findAll(req.user.id),
      message: 'Shipment retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Shipment>> {
    return {
      data: await this.shipmentsService.findOne(+id),
      message: 'Shipment retrieved successfully',
    };
  }

  @Get(':id/pdf')
  async generatePdf(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer = await this.shipmentsService.generateShipmentPdf(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="shipment-${id}.pdf"`,
    });
    res.send(pdfBuffer);
  }

  @Get('tracking/:trackingNumber')
  async findShipmentByTrackingNumber(
    @Param('trackingNumber') trackingNumber: string,
  ): Promise<BaseResponse<Shipment>> {
    return {
      data: await this.shipmentsService.findShipmentByTrackingNumber(
        trackingNumber,
      ),
      message: 'Shipment retrieved successfully',
    };
  }
}
