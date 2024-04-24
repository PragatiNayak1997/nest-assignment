import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { RoleName } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly salt =
    '$2a$10$vxliJ./aXotlnxS9HaJoXeeASt48.ddU7sHNOpXC/cLhgzJGdASCe';
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(body: RegisterDTO) {
    const { name, password, role } = body;
    const nameExists = await this.databaseService.findUserByName(name);

    if (!!nameExists) throw new BadRequestException('User name already exists');
    //encrypt the password

    // const encryptPassword = await bcrypt.hash(password, this.salt);
    //Get the role ID form role
    const roleId = await this.databaseService.getRole(role as RoleName);

    if (!roleId?.id) throw new BadRequestException('invalid role');

    return this.databaseService.createUser({
      name,
      password,
      roleId: roleId.id,
    });
  }

  async login(body: LoginDTO) {
    const { name, password } = body;
    const user = await this.databaseService.findUserByName(name);
    if (!user) throw new BadRequestException('User not found');
    //Check password is valid or not

    // const isMatch = await bcrypt.compare(password, this.salt);
    // console.log(password, isMatch);
    if (user.password!== password) throw new BadRequestException('invalid password');
    const payload = { name, sub: user.id,role:user.role.name };
    const accessToken = this.jwtService.sign(payload);
    
    //generate access token
    return {
      accessToken,
    };
  }
}
