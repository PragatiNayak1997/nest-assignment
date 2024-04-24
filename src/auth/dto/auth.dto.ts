import { RoleName } from '@prisma/client';
import { IsEnum, IsNotEmpty, Min } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  name: string;

  @Min(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleName)
  role: RoleName;
}

export class LoginDTO {
  @IsNotEmpty()
  name: string;

  @Min(6)
  @IsNotEmpty()
  password: string;
}
