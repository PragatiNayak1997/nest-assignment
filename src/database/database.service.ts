import { BadRequestException } from '@nestjs/common';
import { PrismaClient, RoleName, User } from '@prisma/client';

export class DatabaseService {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async addDefaultRole() {
    const rolesExist = await this.prisma.role.findFirst();
    if (!rolesExist)
      await this.prisma.role.createMany({
        data: [
          {
            name: RoleName.ADMIN,
            Permissions: JSON.stringify([
              'create',
              'update',
              'delete',
              'fetch',
            ]),
          },
          {
            name: RoleName.SELLER,
            Permissions: JSON.stringify(['create', 'update', 'fetch']),
          },
          {
            name: RoleName.SUPPORTER,
            Permissions: JSON.stringify(['delete', 'fetch']),
          },
          {
            name: RoleName.CUSTOMER,
            Permissions: JSON.stringify(['fetch']),
          },
        ],
      });
    return true;
  }

  async findUserByName(name: string) {
    return this.prisma.user.findFirst({
      include: {
        role: true,
      },
      where: {
        name,
      },
    });
  }

  async getRole(role: RoleName) {
    let roleEnum;
    switch (role) {
      case 'ADMIN':
        roleEnum = RoleName.ADMIN;
        break;
      case 'CUSTOMER':
        roleEnum = RoleName.CUSTOMER;
        break;
      case 'SELLER':
        roleEnum = RoleName.SELLER;
        break;
      case 'SUPPORTER':
        roleEnum = RoleName.SUPPORTER;
        break;
      default:
        break;
    }

    if (!roleEnum) throw new BadRequestException('invalid role');
    return this.prisma.role.findFirst({
      select: {
        id: true,
        Permissions:true
      },
      where: {
        name: roleEnum,
      },
    });
  }

  async createUser(user: IUser): Promise<{ id: number }> {
    return this.prisma.user.create({
      data: user,
      select: { id: true },
    });
  }


}
