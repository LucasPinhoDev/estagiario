import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './auth-jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule, // Importe o módulo ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importe o ConfigModule para ter acesso ao ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Obtenha a chave secreta do ConfigService
        // Outras opções do JwtModule
      }),
      inject: [ConfigService], // Injete o ConfigService
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
