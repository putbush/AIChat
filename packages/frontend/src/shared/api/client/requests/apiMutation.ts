import { ERROR_MESSAGES } from '@shared/constants/errors';
import { apiClient } from '../core/axios';
import { AxiosRequestConfig, isAxiosError, Method } from 'axios';

type ApiMutationOptions = {
  method?: Extract<Method, 'post' | 'put' | 'patch' | 'delete'>;
  config?: AxiosRequestConfig;
};

export const apiMutation = async <TResponse, TPayload = unknown>(
  url: string,
  params?: TPayload,
  options: ApiMutationOptions = {},
): Promise<TResponse> => {
  const { method = 'post', config } = options;

  try {
    const { data } = await apiClient.request<TResponse>({ url, method, data: params, ...config });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED_RELOGIN);
    }
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }
};
