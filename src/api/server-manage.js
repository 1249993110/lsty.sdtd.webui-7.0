import http from '../utils/request';

/**
 * 获取统计数据
 * @returns
 */
export const getGameStats = () => {
    return http.get('/ServerManage/GameStats');
};

/**
 * 获取领地石
 * @returns
 */
export const getLandClaims = () => {
    return http.get('/ServerManage/LandClaims');
};

/**
 * 获取僵尸位置
 * @returns
 */
export const getHostilesLocation = () => {
    return http.get('/ServerManage/HostilesLocation');
};

/**
 * 获取动物位置
 * @returns
 */
export const getAnimalsLocation = () => {
    return http.get('/ServerManage/AnimalsLocation');
};

/**
 * 获取玩家位置
 * @returns
 */
export const getPlayersLocation = (status = 'all') => {
    return http.get(`/ServerManage/PlayersLocation?status=${status}`);
};

/**
 * 发送全局消息
 * @returns
 */
export const sendGlobalMessage = (message) => {
    return http.post('/ServerManage/SendGlobalMessage', { message, senderName: 'Server' });
};

/**
 * 执行控制台命令
 * @returns
 */
export const executeConsoleCommand = (command, inMainThread = true) => {
    return http.get('/ServerManage/ExecuteConsoleCommand', {
        params: {
            command,
            inMainThread,
        },
    });
};

/**
 * 获取物品方块
 * @returns
 */
export const getItemBlocks = (params) => {
    return http.get('/ServerManage/ItemBlocks', { params: params });
};
