import { API } from '@shared/constants/api';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API.CLIENT_BASE_URL,
  timeout: API.TIMEOUT,
  withCredentials: true,
});
