import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar as opções de CORS
  const corsOptions = {
    origin: process.env.BASE_URL_FRONT, // Permitir solicitações apenas do domínio http://localhost:3000
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir os cabeçalhos Content-Type e Authorization
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir os métodos GET, POST, PUT e DELETE
  };

  // Usar o middleware de CORS com as opções configuradas
  app.use(cors(corsOptions));

  await app.listen(3100);
}
bootstrap();
