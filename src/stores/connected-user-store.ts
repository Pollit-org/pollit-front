import { axiosPollit } from 'src/axios';
import { defineStore, Store, type _GettersTree } from 'pinia';
import jwtDecode from 'jwt-decode';
import { usingLoader, usingLoaderAsync } from 'src/misc/usingLoader';
import { PromiseOrNot } from 'src/misc/promiseOrNot';
import moment from 'moment';
import { closeSigninPopup } from 'src/misc/ShowSigninPopupIfNotConnected';

interface ConnectedUserActions {
  signinWithCredentials: (
    emailOrUserName: string,
    password: string
  ) => PromiseOrNot<void>;
  signupWithCredentials: (
    email: string,
    userName: string,
    password: string
  ) => PromiseOrNot<void>;
  verifyEmailFromLink: (
    userId: string,
    emailVerificationToken: string
  ) => PromiseOrNot<boolean>;
  signinWithGoogleAuthCode: (code: string) => PromiseOrNot<void>;
  signinWithGoogleAccessToken: (
    googleAccessToken: string
  ) => PromiseOrNot<void>;
  signinWithRefreshToken: (preventRouteChange?: boolean) => PromiseOrNot<void>;
  signinWithRefreshTokenIfAccessTokenExpiresSoon: () => PromiseOrNot<void>;
  setPermanentUserName: (userName: string) => PromiseOrNot<void>;
  setGender: (gender: string) => PromiseOrNot<void>;
  setBirthdate: (
    year: number,
    month: number,
    day: number
  ) => PromiseOrNot<void>;
  fetchPrivateProfile: () => PromiseOrNot<void>;
  signout: (preventRouteChange?: boolean) => PromiseOrNot<void>;
  requestResetPassword: (email?: string) => PromiseOrNot<void>;
  canResetPassword: (
    userId: string,
    resetPasswordToken: string
  ) => PromiseOrNot<boolean>;
  resetPassword: (
    userId: string,
    resetPasswordToken: string,
    newPassword: string
  ) => Promise<void>;
}

interface ConnectedUserState {
  user: null | User;
}

interface ConnectedUserGetters extends _GettersTree<ConnectedUserState> {
  userName: () => string;
}

interface User {
  claims: UserClaims;
  accessToken: string;
  refreshToken: string;
  privateProfile?: PrivateProfile;
}

interface PrivateProfile {
  userId: string;
  email: string;
  userName: string;
  birthdate: string;
  gender: string;
  avatarUrl: string;
}

interface UserClaims {
  UserId: string;
  UserName: string;
  Email: string;
  IsEmailVerified: string;
  HasTemporaryUserName: string;
  Exp: number;
}

function buildUser(accessToken: string, refreshToken: string): User {
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    claims: jwtDecode<UserClaims>(accessToken),
  };
}

async function handleSuccessfulSignIn(
  this: any,
  accessToken: string,
  refreshToken: string
) {
  this.user = buildUser(accessToken, refreshToken);
  closeSigninPopup()
  if (this.user.claims.HasTemporaryUserName == 'True') {
    this.router.push({ name: 'SetPermanentUserName' });
  } else {
    this.router.go(0);
  }
}


export type ConnectedUserStore = Store<
  string,
  ConnectedUserState,
  ConnectedUserGetters,
  ConnectedUserActions
>;

export const useConnectedUserStore = defineStore<
  string,
  ConnectedUserState,
  ConnectedUserGetters,
  ConnectedUserActions
>('ConnectedUserStore', {
  state: () => {
    return {
      user: null,
    };
  },
  persist: {
    paths: ['user.accessToken', 'user.refreshToken'],
    afterRestore: (ctx) => {
      if (ctx.store.user?.accessToken == null) {
        ctx.store.user = null;
        return;
      }
      ctx.store.user = buildUser(
        ctx.store.user.accessToken,
        ctx.store.user.refreshToken
      );
    },
    storage: localStorage,
  },
  actions: {
    async signinWithCredentials(emailOrUserName: string, password: string) {
      return usingLoaderAsync(async () => {
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin', { emailOrUserName, password })
        ).data;
        await handleSuccessfulSignIn.call(this, accessToken, refreshToken);
      });
    },
    signupWithCredentials(email: string, userName: string, password: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.post('auth/signup', { email, userName, password });
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin', {
            emailOrUserName: email,
            password,
          })
        ).data;
        this.user = buildUser(accessToken, refreshToken);

        if (this.user.claims.HasTemporaryUserName == 'True')
          this.router.push({ name: 'SetPermanentUserName' });
        else this.router.push({ name: 'PromptPersonalInfo' });
      });
    },
    verifyEmailFromLink(userId, emailVerificationToken) {
      return usingLoaderAsync(async () => {
        try {
          const response = await axiosPollit.post(
            `users/${userId}/verify-email`,
            { emailVerificationToken }
          );
          if (response.status < 200 || response.status >= 300) return false;

          if (this.user?.claims.UserId !== userId) this.user = null;
          else await this.signinWithRefreshToken(true);
          return true;
        } catch {
          return false;
        }
      });
    },
    signinWithGoogleAuthCode(code: string) {
      return usingLoaderAsync(async () => {
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin/google/authCode', { code })
        ).data;
        await handleSuccessfulSignIn.call(this, accessToken, refreshToken);
      });
    },
    signinWithGoogleAccessToken(googleAccessToken: string) {
      return usingLoaderAsync(async () => {
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin/google/accessToken', {
            accessToken: googleAccessToken,
          })
        ).data;
        await handleSuccessfulSignIn.call(this, accessToken, refreshToken);
      });
    },
    signinWithRefreshToken(preventRouteChange = false) {
      return usingLoaderAsync(async () => {
        try {
          const { accessToken, refreshToken } = (
            await axiosPollit.post('auth/signin/refreshToken', {
              expiredAccessToken: this.user?.accessToken,
              refreshToken: this.user?.refreshToken,
            })
          ).data;
          this.user = buildUser(accessToken, refreshToken);
        } catch (e) {
          this.user = null;
          if (!preventRouteChange) this.router.push({ name: 'Signin' });
          return;
        }

        if (
          this.user.claims.HasTemporaryUserName == 'True' &&
          !preventRouteChange
        )
          this.router.push({ name: 'SetPermanentUserName' });
      });
    },
    async signinWithRefreshTokenIfAccessTokenExpiresSoon() {
      const utcNow = moment.utc();
      const accessTokenExpiresAtUtc = moment(
        (this.user?.claims.Exp ?? 0) * 1000
      );

      const minutesUntilAccessTokenExpires = accessTokenExpiresAtUtc.diff(
        utcNow,
        'minutes'
      );
      if (minutesUntilAccessTokenExpires < 5) {
        await this.signinWithRefreshToken();
      }
    },
    setPermanentUserName(userName: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/userName`, {
          userName,
        });
        await this.signinWithRefreshToken();
        this.router.push({ name: 'PromptPersonalInfo' });
      });
    },
    setGender(gender: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/gender`, {
          gender,
        });
        await this.fetchPrivateProfile();
      });
    },
    setBirthdate(year: number, month: number, day: number) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/birthdate`, {
          year,
          month,
          day,
        });
        await this.fetchPrivateProfile();
      });
    },
    fetchPrivateProfile() {
      return usingLoaderAsync(async () => {
        const { data: privateProfileResponse } =
          await axiosPollit.get<PrivateProfile>(
            `users/${this.user?.claims.UserId}/profile/private`
          );
        if (this.user) this.user.privateProfile = privateProfileResponse;
      });
    },
    signout(preventRouteChange?: boolean) {
      return usingLoader(() => {
        this.user = null;
        if (preventRouteChange) return;
        this.router.go(0);
      });
    },
    requestResetPassword(email?: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.post('auth/requestResetPasswordLink', {
          email: email,
        });
      });
    },
    canResetPassword(userId: string, resetPasswordToken: string) {
      return usingLoaderAsync(async () => {
        const response = await axiosPollit.get(
          `auth/resetPassword/fromResetPasswordToken/verifyValidity?userId=${userId}&resetPasswordToken=${resetPasswordToken}`
        );

        return response.data.isValid;
      });
    },
    resetPassword(
      userId: string,
      resetPasswordToken: string,
      newPassword: string
    ) {
      return usingLoaderAsync(async () => {
        await axiosPollit.post('auth/resetPassword/fromResetPasswordToken', {
          userId: userId,
          resetPasswordToken: resetPasswordToken,
          newPassword: newPassword,
        });
      });
    },
  },
  getters: {
    userName() {
      return this.user?.claims.UserName ?? '';
    },
  },
});
