import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from '../job/job.service';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

describe('JobController', () => {
  let controller: JobController;
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    }).compile();

    controller = module.get<JobController>(JobController);
    service = module.get<JobService>(JobService);
  });

  it('should create a job', async () => {
    const jobData = {
      title: 'Software Engineer',
      jobLocationType: 'Remote',
      desc: 'Job description',
      desiredResponsibility: 'Responsibilities',
      necessaryKnowledge: 'Requirements',
      benefits: 'Benefits',
      value: 5000,
      applyLink: 'https://example.com/apply',
      companyId: '123',
      token: 'token',
    };

    const createdJob = {
      id: '1',
      ...jobData,
    };

    jest.spyOn(service, 'createJob').mockResolvedValue(createdJob);

    const result = await controller.createJob(jobData);

    expect(service.createJob).toHaveBeenCalledWith(jobData);
    expect(result).toEqual(createdJob);
  });

  it('should find a job', async () => {
    const jobData = {
      token: 'token',
      find: 'Software Engineer',
    };

    const foundJob = {
      id: '1',
      title: 'Software Engineer',
      jobLocationType: 'Remote',
      desc: 'Job description',
      desiredResponsibility: 'Responsibilities',
      necessaryKnowledge: 'Requirements',
      benefits: 'Benefits',
      value: 5000,
      applyLink: 'https://example.com/apply',
      companyId: '123',
    };

    jest.spyOn(service, 'findJob').mockResolvedValue(foundJob);

    const result = await controller.findJob(jobData);

    expect(service.findJob).toHaveBeenCalledWith(jobData);
    expect(result).toEqual(foundJob);
  });

  it('should find all jobs', async () => {
    const params = 'param1=value1&param2=value2';

    const allJobs = [
      {
        id: '1',
        title: 'Software Engineer',
        jobLocationType: 'Remote',
        desc: 'Job description',
        desiredResponsibility: 'Responsibilities',
        necessaryKnowledge: 'Requirements',
        benefits: 'Benefits',
        value: 5000,
        applyLink: 'https://example.com/apply',
        companyId: '123',
      },
      {
        id: '2',
        title: 'Frontend Developer',
        jobLocationType: 'Office',
        desc: 'Job description',
        desiredResponsibility: 'Responsibilities',
        necessaryKnowledge: 'Requirements',
        benefits: 'Benefits',
        value: 4000,
        applyLink: 'https://example.com/apply',
        companyId: '456',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(allJobs);

    const result = await controller.findAll(params);

    expect(service.findAll).toHaveBeenCalledWith(params);
    expect(result).toEqual(allJobs);
  });

  it('should find a job by ID', async () => {
    const id = '1';

    const foundJob = {
      id: '1',
      title: 'Software Engineer',
      jobLocationType: 'Remote',
      desc: 'Job description',
      desiredResponsibility: 'Responsibilities',
      necessaryKnowledge: 'Requirements',
      benefits: 'Benefits',
      value: 5000,
      applyLink: 'https://example.com/apply',
      companyId: '123',
    };

    jest.spyOn(service, 'findById').mockResolvedValue(foundJob);

    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(foundJob);
  });

  it('should update a job', async () => {
    const jobData = {
      id: '1',
      title: 'Software Engineer',
      jobLocationType: 'Remote',
      desc: 'Job description',
      desiredResponsibility: 'Responsibilities',
      necessaryKnowledge: 'Requirements',
      benefits: 'Benefits',
      value: 5000,
      applyLink: 'https://example.com/apply',
      companyId: '123',
    };

    jest.spyOn(service, 'updateJob').mockResolvedValue(jobData);

    const result = await controller.updateJob({ jobData });

    expect(service.updateJob).toHaveBeenCalledWith({ jobData });
    expect(result).toEqual(jobData);
  });

  it('should delete a job', async () => {
    const jobId = '1';

    jest.spyOn(service, 'deleteJob').mockResolvedValue(undefined);

    const result = await controller.deleteJob({ jobId });

    expect(service.deleteJob).toHaveBeenCalledWith({ jobId });
    expect(result).toBeUndefined();
  });
});
