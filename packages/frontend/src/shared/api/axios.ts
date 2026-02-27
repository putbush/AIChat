'use server';

import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/',
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
