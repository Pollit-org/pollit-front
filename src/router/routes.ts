import { ConnectedUserStore } from 'src/stores/connected-user-store';
import { RouteRecordRaw } from 'vue-router';

export type UserRequirement = (store: ConnectedUserStore) => boolean;

declare module 'vue-router' {
  interface RouteMeta {
    userRequirements?: UserRequirement[];
  }
}

const post_data = {
  user: {
    username: 'didou',
    profileLink: '/u/didou',
  },
  title: 'What do you drink for breakfast ?',
  timeSincePost: '2 days ago',
  votingOptions: [
    {
      name: 'coffee',
      numVotes: 45,
    },
    {
      name: 'tea',
      numVotes: 35,
    },
  ],
  tags: [
    {
      name: 'breakfast',
      link: 'breakfast',
    },
  ],
  comments: [
    {
      user: {
        username: 'didou',
        profileLink: '/u/didou',
      },
      timeSincePost: '38 mins ago',
      upvotes: 18,
      downvotes: 8,
      commentText: 'Gigachads drink tea',
      replies: [
        {
          user: {
            username: 'flow',
            profileLink: '/u/flow',
          },
          timeSincePost: '33 mins ago',
          upvotes: 12,
          downvotes: 3,
          commentText: 'Better be a gigachad then',
          replies: [],
        },
        {
          user: {
            username: 'flow',
            profileLink: '/u/flow',
          },
          timeSincePost: '33 mins ago',
          upvotes: 0,
          downvotes: 0,
          commentText: 'are you a gigachad ?',
          replies: [
            {
              user: {
                username: 'didou',
                profileLink: '/u/didou',
              },
              timeSincePost: '31 mins ago',
              upvotes: 10,
              downvotes: 0,
              commentText: 'ask your mom',
              replies: [],
            },
          ],
        },
      ],
    },
    {
      user: {
        username: 'didou',
        profileLink: '/u/didou',
      },
      timeSincePost: '38 mins ago',
      upvotes: 18,
      downvotes: 8,
      commentText: 'Gigachads drink tea',
      replies: [
        {
          user: {
            username: 'flow',
            profileLink: '/u/flow',
          },
          timeSincePost: '33 mins ago',
          upvotes: 12,
          downvotes: 3,
          commentText: 'Better be a gigachad then',
          replies: [],
        },
        {
          user: {
            username: 'flow',
            profileLink: '/u/flow',
          },
          timeSincePost: '33 mins ago',
          upvotes: 0,
          downvotes: 0,
          commentText: 'are you a gigachad ?',
          replies: [
            {
              user: {
                username: 'didou',
                profileLink: '/u/didou',
              },
              timeSincePost: '31 mins ago',
              upvotes: 10,
              downvotes: 0,
              commentText: 'ask your mom',
              replies: [],
            },
          ],
        },
      ],
    },
  ],
};

const getPostById = (title: string) => post_data;

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
        props: true
        // props: route => ({ post: getPostById(route.params.title as string) })
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: () => import('pages/AccountSettingsPage.vue'),
        meta: {
          userRequirements: [userSignedIn],
        },
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
