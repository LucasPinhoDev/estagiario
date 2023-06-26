import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      throw new BadRequestException('Email ou senha incorretos');
    }

    if (!user.password) {
      throw new BadRequestException('Email ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Email ou senha incorretos');
    }

    const secretKey = 'minhaChavePrivadaSuperSecreta'; // Defina sua chave privada aqui
    const tokenPayload = { userId: user.id, userType: user.type };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1d' });

    return token;
  }

  async register(
    fullName: string,
    email: string,
    password: string,
    type: string,
  ): Promise<string> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('E-mail já existente');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          fullName: fullName,
          email: email,
          password: hashedPassword,
          type: type,
        },
      });

      const secretKey = 'minhaChavePrivadaSuperSecreta'; // Defina sua chave privada aqui
      const tokenPayload = { userId: newUser.id, userType: newUser.type };
      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1d' });

      return token;
    }
  }

  async validateUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
