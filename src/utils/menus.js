// 菜单名称对应视图组件名称
export const menus = [
    {
        name: 'controls',
        label: '控制面板',
        icon: 'control',
        children: [
            {
                name: 'live-map',
                label: 'GPS地图',
                icon: 'map-location',
                parentName: 'controls',
            },
            {
                name: 'online-players',
                label: '在线玩家',
                icon: 'user',
                parentName: 'controls',
            },
            {
                name: 'history-players',
                label: '历史玩家',
                icon: 'user-solid',
                parentName: 'controls',
            },
            {
                name: 'live-chat',
                label: '实时聊天',
                icon: 'chat-dot-square',
                parentName: 'controls',
            },
            {
                name: 'chat-record',
                label: '聊天记录',
                icon: 'chat-line-square',
                parentName: 'controls',
            },
            {
                name: 'console',
                label: '控制台',
                icon: 'console',
                parentName: 'controls',
            },
            {
                name: 'item-blocks',
                label: '物品方块',
                icon: 'list',
                parentName: 'controls',
            },
        ],
    },
    {
        name: 'functions',
        label: '功能面板',
        icon: 'menu',
        children: [
            {
                name: 'global-settings',
                label: '全局配置',
                icon: 'settings',
                parentName: 'functions',
            },
            {
                name: 'points-system',
                label: '积分系统',
                icon: 'coin',
                parentName: 'functions',
                children: [
                    {
                        name: 'points-system-settings',
                        label: '配置',
                        icon: 'settings',
                        parentName: 'points-system',
                    },
                    {
                        name: 'points-system-management',
                        label: '管理',
                        icon: 's-management',
                        parentName: 'points-system',
                    },
                ],
            },
            {
                name: 'game-store',
                label: '游戏商店',
                icon: 'goods',
                parentName: 'functions',
                children: [
                    {
                        name: 'game-store-settings',
                        label: '配置',
                        icon: 'settings',
                        parentName: 'game-store',
                    },
                    {
                        name: 'game-store-management',
                        label: '管理',
                        icon: 's-management',
                        parentName: 'game-store',
                    },
                ],
            },
            {
                name: 'tele-system',
                label: '传送系统',
                icon: 'position',
                parentName: 'functions',
                children: [
                    {
                        name: 'tele-system-friend-settings',
                        label: '好友传送',
                        icon: 'friend',
                        parentName: 'tele-system',
                    },
                    {
                        name: 'tele-system-city',
                        label: '城市传送',
                        icon: 'city',
                        parentName: 'tele-system',
                        children: [
                            {
                                name: 'tele-system-city-settings',
                                label: '配置',
                                icon: 'settings',
                                parentName: 'tele-system-city',
                            },
                            {
                                name: 'tele-system-city-management',
                                label: '管理',
                                icon: 's-management',
                                parentName: 'tele-system-city',
                            },
                        ],
                    },
                    {
                        name: 'tele-system-home',
                        label: '私人传送',
                        icon: 'home',
                        parentName: 'tele-system',
                        children: [
                            {
                                name: 'tele-system-home-settings',
                                label: '配置',
                                icon: 'settings',
                                parentName: 'tele-system-home',
                            },
                            {
                                name: 'tele-system-home-management',
                                label: '管理',
                                icon: 's-management',
                                parentName: 'tele-system-home',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'api-document',
        label: '接口文档',
        url: import.meta.env.VITE_APP_SWAGGER_URL,
        icon: 'document',
        isExternalLink: true,
    },
];

const menuDict = {};
const foreach = (menus) => {
    for (let i = 0, len = menus.length; i < len; i++) {
        const menu = menus[i];
        menuDict[menu.name] = menu;
        if (menu.children && menu.children.length) {
            foreach(menu.children);
        }
    }
};
foreach(menus);

export const getMenuByName = (name) => {
    return menuDict[name];
};
