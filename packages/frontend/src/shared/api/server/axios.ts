import 'server-only';

import { API } from '@shared/constants/api';
import axios from 'axios';

const baseURL = process.env.BACKEND_API_URL;

if (!baseURL) {
  throw new Error('BACKEND_API_URL is not defined');
}

export const apiServer = axios.create({
  baseURL: baseURL,
  timeout: API.TIMEOUT,
  proxy: false,
});
