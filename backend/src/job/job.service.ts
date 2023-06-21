import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
