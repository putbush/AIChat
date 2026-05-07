import { CONFIG_KEYS } from '@common/constants';
import type { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (config: ConfigService): JwtModuleOptions => ({
  secret: config.getOrThrow(CONFIG_KEYS.JWT.SECRET),
  signOptions: { algorithm: config.getOrThrow(CONFIG_KEYS.JWT.ALGORITHM) },
  verifyOptions: {
    algorithms: [config.getOrThrow(CONFIG_KEYS.JWT.ALGORITHM)],
    ignoreExpiration: false,
  },
});
