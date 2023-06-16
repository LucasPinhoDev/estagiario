import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async addSoftDelete() {
    this.$use(async (params, next) => {
      if (
        [
          'findUnique',
          'findMany',
          'findFirst',
          'update',
          'updateMany',
          'updsert',
          'delete',
          'deleteMany',
          'count',
        ].includes(params.action)
      ) {
        params.args.where = {
          deletedAt: null,
          ...params.args.where,
        };
      }

      if (['delete', 'deleteMany'].includes(params.action)) {
        if (params.action === 'delete') params.action = 'update';
        if (params.action === 'deleteMany') params.action = 'updateMany';

        params.args.data = {
          deletedAt: new Date(),
        };
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
