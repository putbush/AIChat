import axios from 'axios';

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/',
  timeout: 15000,
});

export const apiClient = axios.create({
  baseURL: '/api/',
  timeout: 15000,
  withCredentials: true,
});

// apiServer.interceptors.request.use(async (config) => {
//   const token = await getAccessTokenFromCookies();
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiServer.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await apiServer.post<AuthResponse>('/auth/refresh');
//         setAccessToken(data.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return apiServer(originalRequest);
//       } catch {
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
