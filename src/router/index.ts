// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useConnectedUserStore } from '@/stores/ConnectedUserStore';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
      {
        path: 'chart',
        name: 'Chart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "toto" */ '@/components/plots/BarPlot.vue'),
      },
      {
        path: 'signin',
        name: 'Signin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "toto" */ '@/views/Signin.vue'),
      },
      {
        path: 'setUserName',
        name: 'SetPermanentUserName',
        component: () => import('@/views/SetPermanentUserName.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const connectedUserStore = useConnectedUserStore();

  if (connectedUserStore.user?.claims?.HasTemporaryUserName === "False" && to.name == 'SetPermanentUserName')
    next({ name: "Home"})
  else if (connectedUserStore.user?.claims?.HasTemporaryUserName === "True" && to.name != 'SetPermanentUserName')
    next({ name: 'SetPermanentUserName' });
  else
    next();
})

export default router