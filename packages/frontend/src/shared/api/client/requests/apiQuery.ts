import { isAxiosError } from "axios";
import { apiClient } from "../core/axios";
import { ERROR_MESSAGES } from "@shared/constants/errors";

type QueryParams = Record<string, string | number | boolean | undefined>;

export const apiQuery = async <T>(url: string, params?: QueryParams): Promise<T> => {
  try {
    const { data } = await apiClient.get<T>(url, {
      params,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED_RELOGIN);
    }
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }
};
