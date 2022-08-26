import http from '../libs/request';

/**
 * 获取好友传送配置
 * @returns
 */
export const getTeleportFriendSettings = () => {
    return http.get('/TeleportFriend/Settings');
};

/**
 * 更新好友传送配置
 * @returns
 */
 export const updateTeleportFriendSettings = (params) => {
    return http.put('/TeleportFriend/Settings', params);
};

/**
 * 获取好友传送可用变量
 * @returns
 */
 export const getVariables = () => {
    return http.get('/TeleportFriend/Variables');
};