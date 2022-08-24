import { defineStore } from 'pinia';
import router from '../router';

const getRouteNameByPath = (path) => {
    const routes = router.getRoutes();
    const name = routes.find((item) => item.path === path)?.name;
    return name;
};

export const useKeepAliveStore = defineStore('keep-alive', {
    state: () => {
        return {
            activePages: [], // { name: '', path: '' }
        };
    },
    getters: {
        includes() {
            return this.activePages.map((item) => item.name);
        },
        paths() {
            return this.activePages.map((item) => item.path);
        },
    },
    actions: {
        addPage(path) {
            if (!this.activePages.some((item) => item.path === path)) {
                const routeName = getRouteNameByPath(path);
                this.activePages.push({
                    name: routeName,
                    path: path,
                });
            }

            router.push(path);
        },
        removePage(path) {
            let pages = this.activePages;
            let current = router.currentRoute.value.path;
            // 如果当前选中的是将要移除的tab
            if (current === path) {
                let newActivePage;
                pages.forEach((item, index) => {
                    if (item.path === path) {
                        newActivePage = pages[index + 1] || pages[index - 1];
                    }
                });

                router.push(newActivePage.path);
            }

            this.activePages = pages.filter((item) => item.path !== path);
        },
    },
});
