export { ConfigService } from '@nestjs/config';

export interface ApiConfig {
  nest: NestConfig;
  cors: CorsConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: number;
  jwtRefreshSecret: string;
  jwtAccessSecret: string;
}
