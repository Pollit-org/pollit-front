import { axiosPollit } from 'src/axios';
import { defineStore, Store, type _GettersTree } from 'pinia';
import jwtDecode from 'jwt-decode';

interface ConnectedUserActions {
    signinWithCredentials: (emailOrUserName: string, password: string) => Promise<void> | void
    signupWithCredentials: (email: string, userName: string, password: string) => Promise<void> | void
    signinWithGoogle: (code: string) => Promise<void> | void,
    setPermanentUserName: (userName: string) => Promise<void> | void,
    signout: () => Promise<void> | void
}

interface ConnectedUserState {
  user: null | User
}

interface ConnectedUserGetters extends _GettersTree<ConnectedUserState> {
    userName: () => string
}

interface User {
    claims: UserClaims,
    accessToken: string,
    refreshToken: string
}

interface UserClaims {
    UserId: string,
    UserName: string,
    Email: string,
    IsEmailVerified: string,
    HasTemporaryUserName: string,
}

function buildUser (accessToken: string, refreshToken: string): User {
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        claims: jwtDecode<UserClaims>(accessToken)
    }
}

export type ConnectedUserStore = Store<string, ConnectedUserState, ConnectedUserGetters, ConnectedUserActions>;

export const useConnectedUserStore = defineStore<string, ConnectedUserState, ConnectedUserGetters, ConnectedUserActions>('ConnectedUserStore', {
    state: () => {
        return {
            user: null
        }
    },
    persist: {
        paths: ['user.accessToken', 'user.refreshToken'],
        afterRestore: (ctx) => {            
            if (ctx.store.user?.accessToken == null) {
                ctx.store.user = null;
                return;
            }
            ctx.store.user = buildUser(ctx.store.user.accessToken, ctx.store.user.refreshToken);
        },
        storage: localStorage
    },
    actions: {
        async signinWithCredentials(emailOrUserName: string, password: string) {
            const {accessToken, refreshToken} = (await axiosPollit.post('auth/signin', { emailOrUserName, password })).data;
            this.user = buildUser(accessToken, refreshToken);

            if (this.user.claims.HasTemporaryUserName == 'True')
                this.router.push({ name: 'SetPermanentUserName' })
            else
                this.router.push({ name: 'Home' })
        },
        async signupWithCredentials(email: string, userName: string, password: string) {
            await axiosPollit.post('auth/signup', { email, userName, password });
            const {accessToken, refreshToken} = (await axiosPollit.post('auth/signin', { emailOrUserName: email, password })).data;
            this.user = buildUser(accessToken, refreshToken);

            if (this.user.claims.HasTemporaryUserName == 'True')
                this.router.push({ name: 'SetPermanentUserName' })
            else
                this.router.push({ name: 'Home' })
        },
        async signinWithGoogle(code: string) {
            const {accessToken, refreshToken} = (await axiosPollit.post('auth/signin/google', { code })).data;
            this.user = buildUser(accessToken, refreshToken);
            
            if (this.user.claims.HasTemporaryUserName == 'True')
                this.router.push({ name: 'SetPermanentUserName' })
            else
                this.router.push({ name: 'Home' })
        },
        async setPermanentUserName(userName: string) {            
            await axiosPollit.patch(`users/${this.user?.claims.UserId}/userName`, {userName});
            this.user!.claims.HasTemporaryUserName == 'False'; // todo: signin again with refresh token instead of this dirty trixx
            this.router.push({ name: 'Home' })
        },
        async signout() {
            this.user = null;
            this.router.push({ name: 'Home' })
        }
    },
    getters: {
        userName() {
            return this.user!.claims.UserName;
        }
    },

})