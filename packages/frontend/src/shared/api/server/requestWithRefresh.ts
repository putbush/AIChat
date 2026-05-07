import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { apiServer } from './axios';
import { getAuthTokensFromCookies } from '@shared/lib/cookies';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { AuthTokensSchema, type AuthTokens } from '@aichat/shared';
import { z } from 'zod';

export type ResultRequest<T> = {
  data: T;
  status: number;
  tokens?: AuthTokens;
};

const isUnauthorizedError = (error: unknown): error is AxiosError => {
  return (
    error instanceof AxiosError &&
    error.response?.status === 401
  );
};

const withAuthorizationHeader = (
  headers: AxiosRequestConfig['headers'],
  accessToken?: string,
) => {
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined;

  return {
    ...headers,
    Authorization,
  };
};

const executeRequest = async (
  config: AxiosRequestConfig,
  accessToken?: string,
) => {
  return apiServer({
    ...config,
    headers: withAuthorizationHeader(config.headers, accessToken),
  });
};

const createInvalidApiResponseError = (
  message: string,
  issues: z.ZodIssue[],
  config: AxiosRequestConfig,
) => {
  const errorConfig = config as InternalAxiosRequestConfig;

  return new AxiosError(
    message,
    AxiosError.ERR_BAD_RESPONSE,
    errorConfig,
    undefined,
    {
      data: {
        message,
        details: issues,
      },
      status: 502,
      statusText: 'Bad Gateway',
      headers: {},
      config: errorConfig,
    },
  );
};

const validateResponseData = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
  config: AxiosRequestConfig,
): z.infer<TSchema> => {
  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    const url = config.url ?? 'unknown url';
    
    throw createInvalidApiResponseError(
      `Invalid API response for ${url}`,
      parsedData.error.issues,
      config,
    );
  }

  return parsedData.data;
};

const buildResult = <TSchema extends z.ZodTypeAny>(
  response: AxiosResponse,
  schema: TSchema,
  tokens?: AuthTokens,
): ResultRequest<z.infer<TSchema>> => {
  return {
    data: validateResponseData(schema, response.data, response.config),
    status: response.status,
    tokens,
  };
};

const refreshAuthTokens = async (refreshToken: string): Promise<AuthTokens> => {
  const response = await apiServer.post(
    BACKEND_API_PATHS.AUTH.REFRESH,
    {},
    {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    },
  );

  return validateResponseData(
    AuthTokensSchema,
    response.data,
    response.config,
  );
};

const retryRequestWithRefresh = async <TSchema extends z.ZodTypeAny>(
  config: AxiosRequestConfig,
  refreshToken: string,
  schema: TSchema,
): Promise<ResultRequest<z.infer<TSchema>>> => {
  const tokens = await refreshAuthTokens(refreshToken);
  const response = await executeRequest(config, tokens.accessToken);

  return buildResult(response, schema, tokens);
};

export const requestWithRefresh = async <TSchema extends z.ZodTypeAny>(
  config: AxiosRequestConfig,
  schema: TSchema,
): Promise<ResultRequest<z.infer<TSchema>>> => {
  const { accessToken, refreshToken } = await getAuthTokensFromCookies();

  try {
    const response = await executeRequest(config, accessToken);
    return buildResult(response, schema);
  } catch (error) {
    if (!isUnauthorizedError(error) || !refreshToken) {
      throw error;
    }

    return retryRequestWithRefresh(config, refreshToken, schema);
  }
};
