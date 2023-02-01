import { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'signin',
        name: 'Signin',
        component: () => import('pages/SigninPage.vue'),
      },
      {
        path: 'setUserName',
        name: 'SetPermanentUserName',
        component: () => import('pages/SetPermanentUserNamePage.vue')
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes;
