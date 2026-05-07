import { CONFIG_KEYS } from '@common/constants';
import { ConfigService } from '@nestjs/config';

const DEV_ENV = 'development';

export const isDev = (configService: ConfigService) =>
  configService.getOrThrow<string>(CONFIG_KEYS.APP.NODE_ENV) === DEV_ENV;
