import { InternalServerErrorException } from '@nestjs/common/exceptions';

import { ApiConfig } from './config.interface';

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key];
  if (value !== undefined) return value;

  if (fallback !== undefined) {
    return fallback;
  }

  throw new InternalServerErrorException(
    'Missing environment variable: ' + key,
  );
};

export default (): ApiConfig => ({
  nest: {
    port: parseInt(getEnv('PORT', '3100'), 10),
  },
  cors: {
    enabled: true,
  },
  security: {
    expiresIn: '2d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET'),
    jwtAccessSecret: getEnv('JWT_ACCESS_SECRET'),
  },
});
