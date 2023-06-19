// jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy as PassportJwtStrategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies['jwt'],
      secretOrKey: 'teste123',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return user;
  }
}
