import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from '@prisma/client';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const [type, accessToken] = request.headers.authorization?.split(' ') ?? [];  
    const decode = await this.jwtService.decode(accessToken);
    const permissions = await this.getUserPermission(decode.role);
    await this.validatePermission(permissions as string[], request.method);
    return true;
  }

  async getUserPermission(role:RoleName) {
    const roles = await this.databaseService.getRole(role);
    const permissions = roles.Permissions;
    return permissions;
  }

  async validatePermission(permissions: string[], requestType) {
    let requiredPermission;
    switch (requestType) {
      case 'GET':
        requiredPermission = 'fetch';
        break;
      case 'POST':
        requiredPermission = 'update';
        break;
      case 'PUT':
        requiredPermission = 'update';
        break;
      case 'POST':
        requiredPermission = 'create';
        break;
      case 'DELTE':
        requiredPermission = 'delete';
        break;
    }
    if (!permissions.includes(requiredPermission))
      throw new UnauthorizedException('Not authorized to access endpoint');
  }
}
