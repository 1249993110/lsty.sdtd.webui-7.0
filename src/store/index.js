import { createStore } from 'vuex';
import Router from '../router';

export const accessTokenKey = 'access-token';

const store = createStore({
    state: {
        activePages: [],
        accessToken: sessionStorage.getItem(accessTokenKey),
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
            if (!token) {
                sessionStorage.clear(accessTokenKey);
            } else {
                sessionStorage.setItem(accessTokenKey, token);
            }
        },
        addActivePage(state, name) {
            if (!state.activePages.some((i) => i === name)) {
                state.activePages.push(name);
            }

            Router.push({ name: name });
        },
        removeActivePage(state, name) {
            let pages = state.activePages;
            let current = Router.currentRoute.value.name;
            // 如果当前选中的是将要移除的tab
            if (current === name) {
                pages.forEach((item, index) => {
                    if (item === name) {
                        const next = pages[index + 1] || pages[index - 1];
                        if (next) {
                            current = next;
                        }
                    }
                });

                Router.push({ name: current });
            }

            state.activePages = pages.filter((item) => item !== name);
        },
    },
    actions: {},
    getters: {
        getActivePages(state) {
            return state.activePages;
        },
        getAccessToken(state) {
            return state.accessToken;
        },
    },
    modules: {},
});

export default store;
