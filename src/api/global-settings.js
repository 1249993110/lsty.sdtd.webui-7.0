import http from '../libs/request';

/**
 * 获取全局配置
 * @returns
 */
export const getGlobalSettings = () => {
    return http.get('/GlobalSettings/Settings');
};

/**
 * 修改全局配置
 * @returns
 */
 export const editGlobalSettings = (params) => {
    return http.put('/GlobalSettings/Settings', params);
};
