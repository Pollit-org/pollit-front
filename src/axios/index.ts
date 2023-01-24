import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import router from '@/router';
import { useConnectedUserStore } from '@/stores/ConnectedUserStore';

const axiosPollit = axios.create({
  //baseURL: 'https://dev.api.pollit.me',
  baseURL: 'https://localhost:7019',
});

const authorizationHeaderInterceptor = async (request: AxiosRequestConfig) => {
    const connectedAccountStore = useConnectedUserStore();

    const accessToken = connectedAccountStore.user?.accessToken;

    if (accessToken === null)
      return request;

    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
};

const unauthorizedResponseInterceptor = (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        router.go(0);
    }

    return Promise.reject(error);
};

axiosPollit.interceptors.request.use(authorizationHeaderInterceptor);
axiosPollit.interceptors.response.use(response => response, unauthorizedResponseInterceptor);

export { axiosPollit };