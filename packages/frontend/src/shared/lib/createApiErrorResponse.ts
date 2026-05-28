import { ERROR_MESSAGES } from '@shared/constants/errors';
import { AxiosError } from 'axios';

export const getErrorResponse = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      body: {
        message: error.response?.data?.message ?? ERROR_MESSAGES.INTERNAL_SERVER,
        details: error.response?.data?.details,
      },
      status: error.response?.status ?? 500,
    };
  }

  if (error instanceof Error) {
    return {
      body: {
        message: error.message || ERROR_MESSAGES.INTERNAL_SERVER,
      },
      status: 500,
    };
  }

  return {
    body: {
      message: ERROR_MESSAGES.INTERNAL_SERVER,
    },
    status: 500,
  };
};
