import { Module } from '@nestjs/common';
import { JwtModule } from  '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtSecret } from './constant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
    }),
    AccountsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule{}
