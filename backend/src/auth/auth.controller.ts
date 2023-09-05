import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signin')
  signinLocal(@Body('username') username: string,
  @Body('password') password: string,
  ) { 
    let dto = {
      username: username,
      password: password
    }
    return this.authService.signinLocal(dto);
  }

}
