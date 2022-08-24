import { createRouter, createWebHashHistory } from 'vue-router';
import nProgress from '../plugins/nprogress';
import Layout from '../layout/Index.vue';
import Home from '../views/Home.vue';
import { useUserInfoStore } from '../store/user-info';
import { usekeepAliveStore } from '../store/keep-alive';

// 有name的即需要keep-alive的, 对应views组件名称
// 将routes拍平以解决缓存层级超过两层失效

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
            },
        ],
    },
    {
        path: '/controls',
        component: Layout,
        children: [
            {
                path: 'live-map',
                name: 'Controls.LiveMap',
                component: () => import('../views/Controls/LiveMap.vue'),
            },
            {
                path: 'online-players',
                name: 'Controls.OnlinePlayers',
                component: () => import('../views/Controls/OnlinePlayers.vue'),
            },
            {
                path: 'history-players',
                name: 'Controls.HistoryPlayers',
                component: () => import('../views/Controls/HistoryPlayers.vue'),
            },
            {
                path: 'live-chat',
                name: 'Controls.LiveChat',
                component: () => import('../views/Controls/LiveChat.vue'),
            },
            {
                path: 'chat-record',
                name: 'Controls.ChatRecord',
                component: () => import('../views/Controls/ChatRecord.vue'),
            },
            {
                path: 'console',
                name: 'Controls.Console',
                component: () => import('../views/Controls/Console.vue'),
            },
            {
                path: 'item-blocks',
                name: 'Controls.ItemBlocks',
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
                name: 'Functions.GlobalSettings',
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
                name: 'Functions.PointsSystem.Settings',
                component: () => import('../views/Functions/PointsSystem/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.PointsSystem.Management',
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
                name: 'Functions.GameStore.Settings',
                component: () => import('../views/Functions/GameStore/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.GameStore.Management',
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
                name: 'Functions.TeleSystem.Friend.Settings',
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
                name: 'Functions.TeleSystem.TeleportCity.Settings',
                component: () => import('../views/Functions/TeleSystem/TeleportCity/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.TeleSystem.TeleportCity.Management',
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
                name: 'Functions.TeleSystem.TeleportHome.Settings',
                component: () => import('../views/Functions/TeleSystem/TeleportHome/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.TeleSystem.TeleportHome.Management',
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

const userInfoStore = useUserInfoStore();

router.beforeEach((to, from, next) => {
    nProgress.start();
    if (to.path === '/login') {
        userInfoStore.setAccessToken('');
        next();
    } else if (!userInfoStore.isLogin) {
        next('/login');
    } else {
        const keepAliveStore = usekeepAliveStore();
        if (keepAliveStore.activePages.length === 0 && to.name) {
            keepAliveStore.addPage(to.path);
        }
        next();
    }
});

router.afterEach((to, from) => {
    nProgress.done();
});

export default router;
