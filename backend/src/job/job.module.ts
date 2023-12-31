import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [JobService, PrismaService],
  controllers: [JobController],
  exports: [JobService],
})
export class JobModule {}
