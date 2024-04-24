import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/database/database.service';
import { JWTSECRET } from './constants/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController,
   ],
   imports :[ JwtModule.register({
    global: true,
    secret: JWTSECRET,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService,DatabaseService]
})
export class AuthModule {}
