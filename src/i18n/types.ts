import { ApiError } from 'src/api/api-errors';

export type PollitAppMessage =
  | 'auth.signin.cta'
  | 'auth.signup.cta'
  | 'auth.resetPassword.newPasswordInputLabel'
  | 'auth.resetPassword.confirmNewPasswordInputLabel'
  | 'auth.resetPassword.passwordsMismatchErrorLabel'
  | 'auth.resetPassword.cta';

export type MandatoryTranslationsDictionary = {
  [key in ApiError | PollitAppMessage]: string;
};

export type OptionalTranslationsDictionary = {
  [key in ApiError | PollitAppMessage]?: string;
};
