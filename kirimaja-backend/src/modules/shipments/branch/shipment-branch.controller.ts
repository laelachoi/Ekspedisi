import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/logged-in.guard";
import { BaseResponse } from "src/common/interface/base-response.interface";
import { ShipmentBranchLog } from "@prisma/client";
import { PermissionGuard } from "src/modules/auth/guards/permission.guard";
import { RequirePermissions } from "src/modules/auth/decorators/permissions.decorator";
import { ShipmentBranchService } from "./shipment-branch.service";
import { ScanShipmentDto } from "../dto/scan-shipment.dto";

@Controller('shipments/branch')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ShipmentsBranchController {
  constructor(private readonly shipmentBranchService: ShipmentBranchService) {}

  @Get('logs')
  @RequirePermissions('delivery.read')
  async findAll(
    @Req() req: Request & { user?: any },
  ): Promise<BaseResponse<ShipmentBranchLog[]>> {
    try {
      const user = req.user;
      const logs = await this.shipmentBranchService.findAll(user);

      return {
        data: logs,
        message: 'Shipment logs retrieved successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve shipment logs');
    }
  }

  @Post('scan')
  async scanShipment(
    @Body() scanShipmentDto: ScanShipmentDto,
    @Req() req: Request & { user?: any },
  ): Promise<BaseResponse<ShipmentBranchLog>> {
      const user = req.user;
      const shipment = await this.shipmentBranchService.scanShipment(
        scanShipmentDto,
        user.id,
      );

      return {
        data: shipment,
        message: 'Shipment scanned successfully',
      };
  }
}