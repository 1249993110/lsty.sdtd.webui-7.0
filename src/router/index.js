import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/Index.vue';
import LiveMap from '../views/Controls//LiveMap.vue';
import NProgress from '../utils/nprogress';
import Store from '../store';

const routes = [
    {
        path: '/',
        redirect: '/controls/live-map',
    },
    {
        path: '/controls',
        component: Layout,
        children: [
            {
                path: 'live-map',
                name: 'live-map',
                component: LiveMap,
            },
            {
                path: 'online-players',
                name: 'online-players',
                component: () => import('../views/Controls/OnlinePlayers.vue'),
            },
            {
                path: 'history-players',
                name: 'history-players',
                component: () => import('../views/Controls/HistoryPlayers.vue'),
            },
            {
                path: 'live-chat',
                name: 'live-chat',
                component: () => import('../views/Controls/LiveChat.vue'),
            },
            {
                path: 'chat-record',
                name: 'chat-record',
                component: () => import('../views/Controls/ChatRecord.vue'),
            },
            {
                path: 'console',
                name: 'console',
                component: () => import('../views/Controls/Console.vue'),
            },
            {
                path: 'item-blocks',
                name: 'item-blocks',
                component: () => import('../views/Controls/ItemBlocks.vue'),
            },
        ],
    },
    {
        path: '/functions',
        component: Layout,
        children: [
            {
                path: 'global-settings',
                name: 'global-settings',
                component: () => import('../views/Functions/GlobalSettings.vue'),
            },
        ],
    },
    {
        path: '/functions/points-system',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'points-system-settings',
                component: () => import('../views/Functions/PointsSystem/Settings.vue'),
            },
            {
                path: 'management',
                name: 'points-system-management',
                component: () => import('../views/Functions/PointsSystem/Management.vue'),
            },
        ],
    },
    {
        path: '/functions/game-store',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'game-store-settings',
                component: () => import('../views/Functions/GameStore/Settings.vue'),
            },
            {
                path: 'management',
                name: 'game-store-management',
                component: () => import('../views/Functions/GameStore/Management.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/friend',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'tele-system-friend-settings',
                component: () => import('../views/Functions/TeleSystem/TeleportFriend/Settings.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/city',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'tele-system-city-settings',
                component: () => import('../views/Functions/TeleSystem/TeleportCity/Settings.vue'),
            },
            {
                path: 'management',
                name: 'tele-system-city-management',
                component: () => import('../views/Functions/TeleSystem/TeleportCity/Management.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/home',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'tele-system-home-settings',
                component: () => import('../views/Functions/TeleSystem/TeleportHome/Settings.vue'),
            },
            {
                path: 'management',
                name: 'tele-system-home-management',
                component: () => import('../views/Functions/TeleSystem/TeleportHome/Management.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        Store.commit('setAccessToken');
        next();
    } else if (!Store.getters['getAccessToken']) {
        next('/login');
    } else {
        if(Store.getters['getActivePages'].length === 0){
            Store.commit('addActivePage', to.name);
        }
        next();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router;
