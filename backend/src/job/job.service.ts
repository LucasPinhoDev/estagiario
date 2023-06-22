import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(jobData: {
    title: string;
    jobLocationType: string;
    desc: string;
    desiredResponsibility: string;
    necessaryKnowledge: string;
    benefits: string;
    value: number;
    companyId: string;
  }): Promise<Job> {
    const {
      title,
      jobLocationType,
      desc,
      desiredResponsibility,
      necessaryKnowledge,
      benefits,
      value,
      companyId,
    } = jobData;

    try {
      return await this.prisma.job.create({
        data: {
          title,
          jobLocationType,
          desc,
          desiredResponsibility,
          necessaryKnowledge,
          benefits,
          value,
          companyId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findJob(jobData: { token: string; find: string }): Promise<Job[]> {
    const { token, find } = jobData;

    const secretKey = 'minhaChavePrivadaSuperSecreta';

    const decodedToken = jwt.verify(token, secretKey) as {
      userId: string;
      userType: string;
    };

    if (find === 'many') {
      try {
        const jobs = await this.prisma.job.findMany({
          where: {
            userId: decodedToken.userId,
          },
        });

        if (jobs.length > 0) {
          console.log(jobs);
          return jobs;
        } else {
          throw new NotFoundException('Empresas não encontradas');
        }
      } catch (error) {
        throw new BadRequestException('Erro ao buscar as empresas.' + error);
      }
    } else {
      throw new BadRequestException('Critério de pesquisa inválido');
    }
  }
}
