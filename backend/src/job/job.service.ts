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
    applyLink: string;
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
      applyLink,
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
          applyLink,
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

  async findAll(params: string): Promise<any[]> {
    if (params) {
      try {
        const jobs = await this.prisma.job.findMany({
          where: {
            deletedAt: null,
            OR: [
              { title: { contains: params, mode: 'insensitive' } },
              { desc: { contains: params, mode: 'insensitive' } },
              {
                desiredResponsibility: {
                  contains: params,
                  mode: 'insensitive',
                },
              },
              { necessaryKnowledge: { contains: params, mode: 'insensitive' } },
              { benefits: { contains: params, mode: 'insensitive' } },
            ],
          },
          select: {
            id: true,
            title: true,
            desc: true,
            company: {
              select: {
                logo: true,
              },
            },
          },
        });

        return jobs;
      } catch (error) {
        throw new BadRequestException('Erro ao buscar as vagas.' + error);
      }
    } else {
      try {
        const jobs = await this.prisma.job.findMany({
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
            desc: true,
            company: {
              select: {
                logo: true,
              },
            },
          },
        });

        return jobs;
      } catch (error) {
        throw new BadRequestException('Erro ao buscar as vagas.' + error);
      }
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const job = await this.prisma.job.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          jobLocationType: true,
          desc: true,
          desiredResponsibility: true,
          necessaryKnowledge: true,
          benefits: true,
          applyLink: true,
          value: true,
          company: {
            select: {
              name: true,
              website: true,
              logo: true,
              desc: true,
              description: true,
            },
          },
        },
      });

      return job;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar as vagas.' + error);
    }
  }

  async updateJob(data: { jobData: any }): Promise<Job> {
    const { jobData } = data;

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
