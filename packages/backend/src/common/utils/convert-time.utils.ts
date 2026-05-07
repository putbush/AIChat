import { ERROR_MESSAGES } from '@common/constants';

export const convertTimeToMilliSeconds = (time: string) => {
  const timePattern = /^(\d+)([smhd])$/;
  const match = time.match(timePattern);

  if (!match) {
    throw new Error(ERROR_MESSAGES.TIME_INVALID_FORMAT);
  }

  const [, value, unit] = match;
  const numValue = parseInt(value, 10);

  switch (unit) {
    case 's':
      return numValue * 1000;
    case 'm':
      return numValue * 60 * 1000;
    case 'h':
      return numValue * 3600 * 1000;
    case 'd':
      return numValue * 86400 * 1000;
    default:
      throw new Error(ERROR_MESSAGES.TIME_INVALID_UNIT);
  }
};
