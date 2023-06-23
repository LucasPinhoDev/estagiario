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
    token: string;
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
      token,
    } = jobData;

    const secretKey = 'minhaChavePrivadaSuperSecreta';

    const decodedToken = jwt.verify(token, secretKey) as {
      userId: string;
      userType: string;
    };

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
          userId: decodedToken.userId,
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
            deletedAt: null,
          },
        });

        if (jobs.length > 0) {
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

  async updateJob(data: { jobData: any }): Promise<Job> {
    const { jobData } = data;

    console.log(jobData); // Verifique se o objeto jobData está sendo recebido corretamente

    const job = await this.prisma.job.findFirst({
      where: {
        id: jobData.id,
        deletedAt: null,
      },
    });

    if (job) {
      try {
        const updatedData = {
          ...jobData.editFormData,
          value: parseInt(jobData.editFormData.value),
        };
        return await this.prisma.job.update({
          where: { id: jobData.id },
          data: updatedData,
        });
      } catch (error) {
        throw new BadRequestException('Erro ao atualizar a vaga: ' + error);
      }
    } else {
      throw new BadRequestException('Critério inválido');
    }
  }

  async deleteJob(data: { jobId: any }): Promise<void> {
    const { jobId } = data;
    console.log(jobId);

    const job = await this.prisma.job.findFirst({
      where: {
        id: jobId,
        deletedAt: null,
      },
    });

    if (job) {
      try {
        await this.prisma.job.update({
          where: { id: job.id },
          data: { deletedAt: new Date() },
        });
      } catch (error) {
        throw new BadRequestException('Erro ao atualizar a vaga: ' + error);
      }
    } else {
      throw new BadRequestException('Critério inválido');
    }
  }
}
