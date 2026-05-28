import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { apiServer } from '../core/axios';
import { getAuthTokensFromCookies } from '@shared/lib/cookies';
import { type AuthTokens } from '@aichat/shared';
import { z } from 'zod';
import { validateResponseData } from '../core/validateResponseData';
import { refreshAuthTokens } from '../auth/refreshAuthTokens';
import { ResultRequest } from '../core/types';

const isUnauthorizedError = (error: unknown): error is AxiosError => {
  return error instanceof AxiosError && error.response?.status === 401;
};

const withAuthorizationHeader = (headers: AxiosRequestConfig['headers'], accessToken?: string) => {
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined;

  return {
    ...headers,
    Authorization,
  };
};

const executeRequest = async (config: AxiosRequestConfig, accessToken?: string) => {
  return apiServer({
    ...config,
    headers: withAuthorizationHeader(config.headers, accessToken),
  });
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
