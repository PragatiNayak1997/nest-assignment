import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async register(@Body() body: RegisterDTO) {
    return this.authService.registerUser(body);
  }

  @Post('/login')
  async login(@Body() body:LoginDTO) {
    return this.authService.login(body);
  }
}
