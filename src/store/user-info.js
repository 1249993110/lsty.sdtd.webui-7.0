import { defineStore } from 'pinia';

export const accessTokenKey = 'access-token';

export const useUserInfoStore = defineStore('user-info', {
    state: () => {
        return {
            accessToken: sessionStorage.getItem(accessTokenKey),
        };
    },
    getters: {
        isLogin() {
            return !!this.accessToken;
        },
    },
    actions: {
        setAccessToken(token) {
            if (!token) {
                sessionStorage.clear(accessTokenKey);
            } else {
                sessionStorage.setItem(accessTokenKey, token);
            }
            this.accessToken = token;
        },
    },
});
