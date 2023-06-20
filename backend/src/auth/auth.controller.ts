import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    const token = await this.authService.login(
      loginData.email,
      loginData.password,
    );
    return { token };
  }

  @Post('register')
  async register(
    @Body()
    registerData: {
      fullName: string;
      email: string;
      type: string;
      password: string;
    },
  ) {
    const token = await this.authService.register(
      registerData.fullName,
      registerData.email,
      registerData.password,
      registerData.type,
    );
    return token;
  }
}
