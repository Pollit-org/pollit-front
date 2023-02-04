import { useConnectedUserStore } from 'src/stores/connected-user-store';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const connectedUserStore = useConnectedUserStore();

    for (const req of to.meta.userRequirements ?? []) {
      if (!req(connectedUserStore))
        next ({ name: 'Home'})
    }
    
    if (connectedUserStore.user?.claims?.HasTemporaryUserName === 'False' && to.name == 'SetPermanentUserName')
      next(from)
    else if (connectedUserStore.user?.claims?.HasTemporaryUserName === 'True' && to.name != 'SetPermanentUserName')
      next({ name: 'SetPermanentUserName' });
    else
      next();
  })
  

  export default Router;