import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(
    private prismaService: PrismaService, // Assumsing PrismaService is imported from the correct path
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.prismaService.permission.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }
}
