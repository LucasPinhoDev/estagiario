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
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('type') type: string,
    @Body('password') password: string,
  ): Promise<string> {
    const token = await this.authService.register(
      fullName,
      email,
      password,
      type,
    );
    return token;
  }
}
