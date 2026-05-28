import { ERROR_MESSAGES } from '@shared/constants/errors';
import { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { z } from 'zod';

const createInvalidApiResponseError = (
  message: string,
  issues: z.ZodIssue[],
  config: AxiosRequestConfig,
) => {
  const errorConfig = config as InternalAxiosRequestConfig;

  return new AxiosError(message, AxiosError.ERR_BAD_RESPONSE, errorConfig, undefined, {
    data: {
      message,
      details: issues,
    },
    status: 502,
    statusText: 'Bad Gateway',
    headers: {},
    config: errorConfig,
  });
};

export const validateResponseData = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
  config: AxiosRequestConfig,
): z.infer<TSchema> => {
  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    const url = config.url ?? ERROR_MESSAGES.UNKNOWN_URL;

    throw createInvalidApiResponseError(
      ERROR_MESSAGES.INVALID_API_RESPONSE(url),
      parsedData.error.issues,
      config,
    );
  }

  return parsedData.data;
};
