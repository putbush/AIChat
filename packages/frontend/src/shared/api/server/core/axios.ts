import 'server-only';

import { API } from '@shared/constants/api';
import axios from 'axios';
import { getBackendBaseUrl } from './getBackendUrl';


export const apiServer = axios.create({
  baseURL: getBackendBaseUrl(),
  timeout: API.TIMEOUT,
  proxy: false,
});
