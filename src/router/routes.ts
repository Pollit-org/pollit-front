import { ConnectedUserStore } from 'src/stores/connected-user-store';
import { RouteRecordRaw } from 'vue-router';

export type UserRequirement = (store: ConnectedUserStore) => boolean;

declare module 'vue-router' {
  interface RouteMeta {
    userRequirements?: UserRequirement[];
  }
}

const userSignedIn: UserRequirement = (store) => store.user != null;
const userNotSignedIn: UserRequirement = (store) => store.user == null;
const userHasTemporaryUserName: UserRequirement = (store) =>
  store.user?.claims.HasTemporaryUserName == 'True';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'polls/:pollId',
        name: 'Poll',
        component: () => import('pages/PollPage.vue'),
        props: true,
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: () => import('pages/AccountSettingsPage.vue'),
        meta: {
          userRequirements: [userSignedIn],
        },
      },
      {
        path: 'verify-email',
        name: 'VerifyEmail',
        component: () => import('pages/VerifyEmailPage.vue'),
        props: route => ({ userId: route.query.user, emailVerificationToken: route.query.token }),
      },
    ],
  },
  {
    path: '/',
    component: () => import('src/layouts/OnboardingLayout.vue'),
    children: [
      {
        path: 'signin',
        name: 'Signin',
        component: () => import('pages/SigninPage.vue'),
        meta: {
          userRequirements: [userNotSignedIn],
        },
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('pages/SignupPage.vue'),
        meta: {
          userRequirements: [userNotSignedIn],
        },
      },
      {
        path: 'setUserName',
        name: 'SetPermanentUserName',
        component: () => import('pages/SetPermanentUserNamePage.vue'),
        meta: {
          userRequirements: [userSignedIn, userHasTemporaryUserName],
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
