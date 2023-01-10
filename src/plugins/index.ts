/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import vue3GoogleLogin from 'vue3-google-login'


// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(vue3GoogleLogin, { clientId: '925046258289-9u4b6he9iej4fl4dstp5e407lhsvnvk4.apps.googleusercontent.com'})
}
