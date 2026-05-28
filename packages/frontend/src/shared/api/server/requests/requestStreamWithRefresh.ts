import { type AuthTokens } from '@aichat/shared';
import { getAuthTokensFromCookies } from '@shared/lib/cookies';
import { getBackendUrl } from '../core/getBackendUrl';
import { ERROR_MESSAGES } from '@shared/constants/errors';
import { refreshAuthTokens } from '../auth/refreshAuthTokens';
import { RequestStreamConfig, StreamRequestResult } from '../core/types';

const withAuthorizationHeader = (headers: HeadersInit = {}, accessToken?: string): HeadersInit => ({
  ...headers,
  ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
});

const buildFetchInit = (config: RequestStreamConfig, accessToken?: string): RequestInit => ({
  method: config.method,
  headers: withAuthorizationHeader(
    {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    accessToken,
  ),
  body: config.body === undefined ? undefined : JSON.stringify(config.body),
});

const executeStreamRequest = async (config: RequestStreamConfig, accessToken?: string) => {
  return fetch(getBackendUrl(config.url), buildFetchInit(config, accessToken));
};

const buildStreamResult = (response: Response, tokens?: AuthTokens): StreamRequestResult => {
  if (!response.body) {
    throw new Error(ERROR_MESSAGES.STREAM_REQUEST_NO_BODY);
  }

  return {
    stream: response.body,
    status: response.status,
    tokens,
  };
};

export const requestStreamWithRefresh = async (
  config: RequestStreamConfig,
): Promise<StreamRequestResult> => {
  const { accessToken, refreshToken } = await getAuthTokensFromCookies();

  const response = await executeStreamRequest(config, accessToken);

  if (response.ok) {
    return buildStreamResult(response);
  }

  if (response.status !== 401 || !refreshToken) {
    throw new Error(ERROR_MESSAGES.STREAM_REQUEST_FAILED(response.status));
  }

  const tokens = await refreshAuthTokens(refreshToken);

  const retriedResponse = await executeStreamRequest(config, tokens.accessToken);

  if (!retriedResponse.ok) {
    throw new Error(ERROR_MESSAGES.STREAM_REQUEST_FAILED_AFTER_REFRESH(retriedResponse.status));
  }

  return buildStreamResult(retriedResponse, tokens);
};
