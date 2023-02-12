import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import { OptionalTranslationsDictionary } from 'src/i18n/types';

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends OptionalTranslationsDictionary {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export const i18n = createI18n({
  locale: (navigator.languages?.at(0) ?? navigator.language).split('-')[0],
  fallbackLocale: 'en',
  legacy: false,
  messages
});

export default boot(({ app }) => {
  app.use(i18n);
});
