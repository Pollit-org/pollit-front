import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import GoogleSignInPlugin from "vue3-google-signin"
import type { App } from 'vue'
import { pinia } from './pinia'


export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .use(GoogleSignInPlugin, {
      clientId: '925046258289-9u4b6he9iej4fl4dstp5e407lhsvnvk4.apps.googleusercontent.com',
    });
}
