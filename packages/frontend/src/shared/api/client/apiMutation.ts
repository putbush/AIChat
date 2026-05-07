import { ERROR_MESSAGES } from '@shared/constants/errors';
import { apiClient } from './axios';
import { isAxiosError } from 'axios';

type MutationParams = Record<string, string | number | boolean >;

export const apiMutation = async <T>(url: string, params: MutationParams): Promise<T> => {
  try {
    const { data } = await apiClient.post<T>(url, params);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED_RELOGIN);
    }
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }
};
