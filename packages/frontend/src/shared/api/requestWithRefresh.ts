import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiServer } from './axios';
import { getAuthTokensFromCookies } from '@shared/lib/cookies';

export type ResultRequest<T> = {
  data: T;
  status: number;
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

export const requestWithRefresh = async <T>(
  config: AxiosRequestConfig
): Promise<ResultRequest<T>> => {
  const { accessToken, refreshToken } = await getAuthTokensFromCookies();

  try {
    const response: AxiosResponse<T> = await apiServer({
      ...config,
      headers: {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401 && refreshToken) {
      const refreshResponse = await apiServer.post(
        '/auth/refresh',
        {},
        {
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
        }
      );

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      const retriedResponse: AxiosResponse<T> = await apiServer({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return {
        data: retriedResponse.data,
        status: retriedResponse.status,
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      };
    }

    throw error;
  }
};