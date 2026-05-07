import { convertTimeToMilliSeconds } from '@common/utils';

export default () => ({
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/links',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret',
    accessTokenTtl: convertTimeToMilliSeconds(
      process.env.JWT_ACCESS_TOKEN_TTL || '2h',
    ),
    refreshTokenTtl: convertTimeToMilliSeconds(
      process.env.JWT_REFRESH_TOKEN_TTL || '7d',
    ),
    algorithm: 'HS256' as const,
  },
});
