import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service';
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
    },
  ) {
    const createdJob = await this.jobService.createJob(jobData);

    return createdJob;
  }
}
