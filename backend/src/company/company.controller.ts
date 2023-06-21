import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('createCompany')
  async createCompany(
    @Body()
    companyData: {
      name: string;
      website: string;
      logo: string;
      location: string;
      instagram: string;
      desc: string;
      linkedin: string;
      description: string;
      token: string;
    },
  ) {
    console.log(companyData);

    const createdJob = await this.companyService.createCompany(companyData);

    return createdJob;
  }

  @Post('find')
  async findCompany(
    @Body()
    companyData: {
      token: string;
      find: string;
    },
  ) {
    return await this.companyService.findCompany(companyData);
  }
}
