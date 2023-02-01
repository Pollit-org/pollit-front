import { axiosPollit } from "src/axios";
import { defineStore, type _GettersTree } from "pinia";
import jwtDecode from 'jwt-decode';

interface ConnectedUserActions {
    signinWithCredentials: (emailOrUserName: string, password: string) => Promise<void> | void
    signinWithGoogle: (code: string) => Promise<void> | void,
    setPermanentUserName: (userName: string) => Promise<void> | void
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

export const useConnectedUserStore = defineStore<string, ConnectedUserState, ConnectedUserGetters, ConnectedUserActions>("ConnectedUserStore", {
    state: () => {
        return {
            user: null
        }
    },
    persist: {
        paths: ["user.accessToken", "user.refreshToken"],
        afterRestore: (ctx: any) => {            
            if (ctx.store.user?.accessToken == null) {
                return;
            }
            ctx.store.user = buildUser(ctx.store.user.accessToken, ctx.store.user.refreshToken);
        },
        storage: localStorage
    },
    actions: {
        async signinWithCredentials(emailOrUserName: string, password: string) {
            const {accessToken, refreshToken} = (await axiosPollit.post("auth/signin", { emailOrUserName, password })).data;
            this.user = buildUser(accessToken, refreshToken);
            if (this.user.claims.HasTemporaryUserName == "True")
                this.router.push({ name: "SetPermanentUserName" })
        },
        async signinWithGoogle(code: string) {
            const {accessToken, refreshToken} = (await axiosPollit.post("auth/signin/google", { code })).data;
            this.user = buildUser(accessToken, refreshToken);
            console.log(JSON.stringify(this.user));
            
            if (this.user.claims.HasTemporaryUserName == "True")
                this.router.push({ name: "SetPermanentUserName" })
        },
        async setPermanentUserName(userName: string) {            
            await axiosPollit.patch(`users/${this.user?.claims.UserId}/userName`, {userName});
            this.router.push({ name: "Home" })
        }
    },
    getters: {
        userName() {
            return this.user!.claims.UserName;
        }
    },

})