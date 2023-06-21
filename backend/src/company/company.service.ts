import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  //throw new BadRequestException('E-mail já existente');

  async createCompany(companyData: {
    name: string;
    website: string;
    logo: string;
    location: string;
    instagram: string;
    desc: string;
    linkedin: string;
    description: string;
    token: string;
  }): Promise<Company> {
    const {
      name,
      website,
      logo,
      location,

      instagram,
      desc,
      linkedin,
      description,
      token,
    } = companyData;

    const secretKey = 'minhaChavePrivadaSuperSecreta';

    console.log(token);

    const decodedToken = jwt.verify(token, secretKey) as {
      userId: string;
      userType: string;
    };

    try {
      return await this.prisma.company.create({
        data: {
          name,
          website,
          logo,
          location,

          instagram,
          desc,
          linkedin,
          description,
          UserId: decodedToken.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar uma empresa.' + error);
    }
  }

  async findCompany(companyData: {
    token: string;
    find: string;
  }): Promise<{ id: string; name: string }[]> {
    const { token, find } = companyData;

    const secretKey = 'minhaChavePrivadaSuperSecreta';

    const decodedToken = jwt.verify(token, secretKey) as {
      userId: string;
      userType: string;
    };

    if (find === 'byId') {
      try {
        const companies = await this.prisma.company.findMany({
          where: {
            UserId: decodedToken.userId,
          },
          select: {
            id: true,
            name: true,
          },
        });

        if (companies.length > 0) {
          console.log(companies);
          return companies;
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
}
