import http from '../libs/request';

/**
 * 获取私人传送配置
 * @returns
 */
export const getTeleportHomeSettings = () => {
    return http.get('/TeleportHome/Settings');
};

/**
 * 修改私人传送配置
 * @returns
 */
 export const editTeleportHomeSettings = (params) => {
    return http.put('/TeleportHome/Settings', params);
};

/**
 * 获取私人传送可用变量
 * @returns
 */
 export const getVariables = () => {
    return http.get('/TeleportHome/Variables');
};


/**
 * 通过分页参数获取私人
 * @returns
 */
 export const getHomePositionPaged = (params) => {
    return http.get('/TeleportHome/HomePosition', { params: params });
};

/**
 * 通过Id获取私人
 * @returns
 */
export const getHomePositionById = (id) => {
    return http.get('/TeleportHome/HomePosition/' + id);
};

/**
 * 新增私人
 * @returns
 */
export const addHomePosition = (params) => {
    return http.post('/TeleportHome/HomePosition', params);
};

/**
 * 通过Id删除私人
 * @returns
 */
export const deleteHomePositionById = (id) => {
    return http.delete('/TeleportHome/HomePosition/' + id);
};

/**
 * 通过Id集合删除私人
 * @returns
 */
export const deleteHomePositionByIds = (ids) => {
    return http.delete('/TeleportHome/HomePosition', { data: ids });
};

/**
 * 修改私人
 * @returns
 */
 export const editHomePosition = (params) => {
    return http.put('/TeleportHome/HomePosition', params);
};