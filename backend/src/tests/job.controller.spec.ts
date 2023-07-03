import { Test } from '@nestjs/testing';
import { JobService } from '../job/job.service';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

describe('JobService', () => {
  let jobService: JobService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [JobService, PrismaService],
    }).compile();

    jobService = moduleRef.get<JobService>(JobService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('createJob', () => {
    it('should create a new job', async () => {
      // Simulated job data to be created
      const jobData = {
        title: 'Desenvolvedor Full Stack',
        jobLocationType: 'Remoto',
        desc: 'Descrição do trabalho',
        desiredResponsibility: 'Responsabilidades desejadas',
        necessaryKnowledge: 'Conhecimentos necessários',
        benefits: 'Benefícios oferecidos',
        value: 10000,
        companyId: 'companyId123',
        token: 'token123',
      };

      // Mock the Prisma create method
      jest.spyOn(prismaService.job, 'create').mockResolvedValue({} as any);

      const createdJob = await jobService.createJob(jobData);

      expect(prismaService.job.create).toHaveBeenCalledWith({
        data: jobData,
      });
      expect(createdJob).toEqual({} as any);
    });
  });
});
