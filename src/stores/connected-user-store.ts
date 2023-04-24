import { axiosPollit } from 'src/axios';
import { defineStore, Store, type _GettersTree } from 'pinia';
import jwtDecode from 'jwt-decode';
import { usingLoader, usingLoaderAsync } from 'src/misc/usingLoader';
import { PromiseOrNot } from 'src/misc/promiseOrNot';
import moment from 'moment';

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
  signinWithGoogleAuthCode: (code: string) => PromiseOrNot<void>;
  signinWithGoogleAccessToken: (
    googleAccessToken: string
  ) => PromiseOrNot<void>;
  signinWithRefreshToken: () => PromiseOrNot<void>;
  signinWithRefreshTokenIfAccessTokenExpiresSoon: () => PromiseOrNot<void>;
  setPermanentUserName: (userName: string) => PromiseOrNot<void>;
  setGender: (gender: string) => PromiseOrNot<void>;
  setBirthdate: (
    year: number,
    month: number,
    day: number
  ) => PromiseOrNot<void>;
  fetchPrivateProfile: () => PromiseOrNot<void>;
  signout: () => PromiseOrNot<void>;
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
        this.user = buildUser(accessToken, refreshToken);

        if (this.user.claims.HasTemporaryUserName == 'True')
          this.router.push({ name: 'SetPermanentUserName' });
        else this.router.push({ name: 'Home' });
      });
    },
    async signupWithCredentials(
      email: string,
      userName: string,
      password: string
    ) {
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
        else this.router.push({ name: 'Home' });
      });
    },
    signinWithGoogleAuthCode(code: string) {
      return usingLoaderAsync(async () => {
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin/google/authCode', { code })
        ).data;
        this.user = buildUser(accessToken, refreshToken);

        if (this.user.claims.HasTemporaryUserName == 'True')
          this.router.push({ name: 'SetPermanentUserName' });
        else this.router.push({ name: 'Home' });
      });
    },
    signinWithGoogleAccessToken(googleAccessToken: string) {
      return usingLoaderAsync(async () => {
        const { accessToken, refreshToken } = (
          await axiosPollit.post('auth/signin/google/accessToken', {
            accessToken: googleAccessToken,
          })
        ).data;
        this.user = buildUser(accessToken, refreshToken);

        if (this.user.claims.HasTemporaryUserName == 'True')
          this.router.push({ name: 'SetPermanentUserName' });
        else this.router.push({ name: 'Home' });
      });
    },
    signinWithRefreshToken() {
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
          this.router.push({ name: 'Signin' });
          return;
        }

        if (this.user.claims.HasTemporaryUserName == 'True')
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
    async setPermanentUserName(userName: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/userName`, {
          userName,
        });
        await this.signinWithRefreshToken();
        this.router.push({ name: 'Home' });
      });
    },
    async setGender(gender: string) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/gender`, {
          gender,
        });
        await this.fetchPrivateProfile();
      });
    },
    async setBirthdate(year: number, month: number, day: number) {
      return usingLoaderAsync(async () => {
        await axiosPollit.patch(`users/${this.user?.claims.UserId}/birthdate`, {
          year,
          month,
          day,
        });
        await this.fetchPrivateProfile();
      });
    },
    async fetchPrivateProfile() {
      return usingLoaderAsync(async () => {
        const { data: privateProfileResponse } =
          await axiosPollit.get<PrivateProfile>(
            `users/${this.user?.claims.UserId}/profile/private`
          );
        this.user!.privateProfile = privateProfileResponse;
      });
    },
    signout() {
      return usingLoader(() => {
        this.user = null;
        this.router.push({ name: 'Home' });
      });
    },
  },
  getters: {
    userName() {
      return this.user!.claims.UserName;
    },
  },
});
