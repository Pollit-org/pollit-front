import axios, { AxiosError } from 'axios';
import router from '@/router';

const axiosPollit = axios.create({
  baseURL: 'https://dev.api.pollit.me',
  // baseURL: 'https://localhost:7019',
});

  const unauthorizedResponseInterceptor = (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      router.go(0);
    }

    return Promise.reject(error);
  };

  axiosPollit.interceptors.response.use(response => response, unauthorizedResponseInterceptor);

export { axiosPollit };