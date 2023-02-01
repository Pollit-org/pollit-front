import { boot } from 'quasar/wrappers';
import GoogleSignInPlugin from "vue3-google-signin"

export default boot(({ app }) => {
  app.use(GoogleSignInPlugin, {
    clientId: '925046258289-9u4b6he9iej4fl4dstp5e407lhsvnvk4.apps.googleusercontent.com',
  });
});
