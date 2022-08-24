import http from '../libs/request';

/**
 * 获取积分系统配置
 * @returns
 */
export const getPointsSystemSettings = () => {
    return http.get('/PointsSystem/Settings');
};

/**
 * 修改积分系统配置
 * @returns
 */
export const editPointsSystemSettings = (params) => {
    return http.put('/PointsSystem/Settings', params);
};

/**
 * 获取积分系统可用变量
 * @returns
 */
export const getVariables = () => {
    return http.get('/PointsSystem/Variables');
};

/**
 * 通过分页参数获取积分
 * @returns
 */
export const getPointsPaged = (params) => {
    return http.get('/PointsSystem/Points', { params: params });
};

/**
 * 通过实体Id获取积分
 * @returns
 */
export const getPointsByEntityId = (entityId) => {
    return http.get('/PointsSystem/Points/' + entityId);
};

/**
 * 新增积分
 * @returns
 */
export const addPoints = (params) => {
    return http.post('/PointsSystem/Points', params);
};

/**
 * 通过实体Id删除积分
 * @returns
 */
export const deletePointsByEntityId = (entityId) => {
    return http.delete('/PointsSystem/Points/' + entityId);
};

/**
 * 通过实体Id集合删除积分
 * @returns
 */
export const deletePointsByEntityIds = (entityIds) => {
    return http.delete('/PointsSystem/Points', { data: entityIds });
};

/**
 * 修改积分
 * @returns
 */
 export const editPoints = (params) => {
    return http.put('/PointsSystem/Points', params);
};