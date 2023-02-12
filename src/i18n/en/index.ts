import { MandatoryTranslationsDictionary } from '../types';

const englishTranslations : MandatoryTranslationsDictionary = {
  // API Errors
  'POLLIT:AUTH:CREDENTIALS_SIGNIN_FAILED': "Sorry mate, you can't get in. Double check your credentials.",
  'POLLIT:AUTH:EMAIL_ALREADY_EXISTS': 'I am afraid there is alread an account registered under that email.',
  'POLLIT:AUTH:FORBIDDEN_ACCESS': "Sorry you can't get in there. It's nothing personal, but you just don't have the rights to do so !",
  'POLLIT:AUTH:GOOGLE_SIGNIN_FAILED': 'Looks like we have a misunderstanding with Google right now, please try another way to sign in.',
  'POLLIT:AUTH:INVALID_EMAIL': 'This email looks weird to me.',
  'POLLIT:AUTH:INVALID_USER_NAME': "Sorry this ain't a valid user name",
  'POLLIT:AUTH:PASSWORD_DOES_NOT_MEET_REQUIREMENTS': 'This password is weak af buddy. It gotta have ten charcaters and must include one uppercase letter, one lower case letter and one special character',
  'POLLIT:AUTH:USER_NAME_ALREADY_EXISTS': 'I am sorry to announce to you that this user name is already taken ;(',
  'POLLIT:UNKOWN_ERROR': "Let's be honest, something fucked up at some point but I can't tell you what. Can you try again maybe ?",
  'POLLIT:USERS:USER_NAME_IS_ALREADY_PERMANENT': 'You already set you user name.',
  'POLLIT:USERS:USER_NOT_FOUND': "I can't seem to be able to find the guy you're looking for.",

  // Normal messages
  'auth.signin.cta': 'Sign in',
  'auth.signup.cta': 'Sign Up'
}

export default englishTranslations;
