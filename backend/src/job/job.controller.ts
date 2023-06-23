import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from '@prisma/client';
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('createJob')
  async createJob(
    @Body()
    jobData: {
      title: string;
      jobLocationType: string;
      desc: string;
      desiredResponsibility: string;
      necessaryKnowledge: string;
      benefits: string;
      value: number;
      companyId: string;
      token: string;
    },
  ) {
    const createdJob = await this.jobService.createJob(jobData);

    return createdJob;
  }

  @Post('find')
  async findJob(
    @Body()
    jobData: {
      token: string;
      find: string;
    },
  ) {
    return await this.jobService.findJob(jobData);
  }

  @Post('update')
  async updateJob(@Body() data: { jobData: Job }) {
    return await this.jobService.updateJob(data);
  }

  @Post('delete')
  async deleteJob(@Body() data: { jobId: string }) {
    return await this.jobService.deleteJob(data);
  }
}
