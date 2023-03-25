import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import router from 'src/router';
import { useConnectedUserStore } from 'stores/connected-user-store';
import { Notify } from 'quasar'
import { i18n } from 'src/boot/i18n';
import { ApiError } from 'src/api/api-errors';

const axiosPollit = axios.create({
  baseURL: 'https://dev.api.pollit.me',
  //baseURL: 'https://localhost:7019',
});

const authorizationHeaderInterceptor = async (request: AxiosRequestConfig) => {
    const connectedAccountStore = useConnectedUserStore();

    const accessToken = connectedAccountStore.user?.accessToken;

    if (accessToken === null)
      return request;

    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
};

const unauthorizedResponseInterceptor = (error: AxiosError) => {
  Notify.create({
    message: i18n.global.t(error.response?.data.detail as ApiError ?? 'POLLIT:UNKOWN_ERROR'),
      color: 'negative',
      icon: 'report_problem',
      position: 'top',
      iconSize: '64px'
    })

    if (error.response?.status === 401 && router.currentRoute.value.name !== 'Signin') {
        localStorage.removeItem('accessToken');
        router.go(0);
        return;
    }

    return Promise.reject(error);
};

axiosPollit.interceptors.request.use(authorizationHeaderInterceptor);
axiosPollit.interceptors.response.use(response => response, unauthorizedResponseInterceptor);

export { axiosPollit };