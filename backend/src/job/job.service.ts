import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

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

      const tokenPayload = { userId: existingUser.id, userType: newUser.type };
      const token = jwt.sign(tokenPayload, '1d');
      return token;
    }
  }

  async createJob(jobData: {
    title: string;
    jobLocationType: string;
    desc: string;
    desiredResponsibility: string;
    nececessaryKnowledge: string;
    benefits: string;
    value: number;
  }): Promise<Job> {
    const {
      title,
      jobLocationType,
      desc,
      desiredResponsibility,
      nececessaryKnowledge,
      benefits,
      value,
    } = jobData;

    try {
      return await this.prisma.job.create({
        data: {
          title,
          jobLocationType,
          desc,
          desiredResponsibility,
          nececessaryKnowledge,
          benefits,
          value,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
