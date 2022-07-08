import http from '../utils/request';

/**
 * 获取统计数据
 * @returns
 */
export const getPlayerInventory = (entityId) => {
    return http.get('/PlayerInventory/' + entityId);
};

/**
 * 获取所有在线玩家
 * @returns
 */
export const getOnlinePlayers = () => {
    return http.get('/OnlinePlayers/');
};

/**
 * 获取所有历史玩家
 * @returns
 */
export const getHistoryPlayers = (params) => {
    return http.get('/HistoryPlayers/', { params: params });
};
