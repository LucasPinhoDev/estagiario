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

    const token = jwt.sign({ userId: user.id }, '1d');
    return token;
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('E-mail já existente');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, '1d');
    return token;
  }

  async validateUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
