import http from '../libs/request';

/**
 * 获取全局配置
 * @returns
 */
export const getGlobalSettings = () => {
    return http.get('/GlobalSettings/Settings');
};

/**
 * 更新全局配置
 * @returns
 */
 export const updateGlobalSettings = (params) => {
    return http.put('/GlobalSettings/Settings', params);
};
