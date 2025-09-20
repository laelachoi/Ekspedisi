import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Shipment, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/logged-in.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { BaseResponse } from 'src/common/interface/base-response.interface';


@Controller('history')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @RequirePermissions('shipments.read')
  async findAll(
    @Req() req: Request & { user?: User },
  ): Promise<BaseResponse<Shipment[]>> {
    return {
      data: await this.historyService.findAll(req.user!),
      message: 'History retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<BaseResponse<Shipment>> {
    return {
      data: await this.historyService.findOne(+id),
      message: 'Shipment retrieved successfully',
    }
  }
}
