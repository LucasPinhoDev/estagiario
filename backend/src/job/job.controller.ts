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
      nececessaryKnowledge: string;
      benefits: string;
      value: number;
    },
  ) {
    const createdJob = await this.jobService.createJob(jobData);

    return createdJob;
  }
}
