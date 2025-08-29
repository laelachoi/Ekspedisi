import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { permission } from 'process';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(
    private prismaService: PrismaService, // Assumsing PrismaService is imported from the correct path
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.prismaService.permission.findMany();
  }

  async getUserPermissions(userId:number): Promise<String[]> {
    const user = await await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return [];
    }

    return (
      user.role?.rolePermissions.map(
        (rolePermission) => rolePermission.permission.key,
      ) || []
    );
  }

  async userHasAnyPermission(userId: number, permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);
    return permissions.some((permission) => 
      userPermissions.includes(permission),
    )
  }

  async userHasAllPermissions(userId: number, permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);
    return permissions.every((permission) => 
      userPermissions.includes(permission),
    )
  }  
}
