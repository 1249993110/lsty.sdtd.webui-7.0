import http from '../utils/request';

/**
 * 获取城市传送配置
 * @returns
 */
export const getTeleportCitySettings = () => {
    return http.get('/TeleportCity/Settings');
};

/**
 * 修改城市传送配置
 * @returns
 */
 export const editTeleportCitySettings = (params) => {
    return http.put('/TeleportCity/Settings', params);
};

/**
 * 获取城市传送可用变量
 * @returns
 */
 export const getVariables = () => {
    return http.get('/TeleportCity/Variables');
};


/**
 * 通过分页参数获取城市
 * @returns
 */
 export const getCityPositionPaged = (params) => {
    return http.get('/TeleportCity/CityPosition', { params: params });
};

/**
 * 通过Id获取城市
 * @returns
 */
export const getCityPositionById = (id) => {
    return http.get('/TeleportCity/CityPosition/' + id);
};

/**
 * 新增城市
 * @returns
 */
export const addCityPosition = (params) => {
    return http.post('/TeleportCity/CityPosition', params);
};

/**
 * 通过Id删除城市
 * @returns
 */
export const deleteCityPositionById = (id) => {
    return http.delete('/TeleportCity/CityPosition/' + id);
};

/**
 * 通过Id集合删除城市
 * @returns
 */
export const deleteCityPositionByIds = (ids) => {
    return http.delete('/TeleportCity/CityPosition', { data: ids });
};

/**
 * 修改城市
 * @returns
 */
 export const editCityPosition = (params) => {
    return http.put('/TeleportCity/CityPosition', params);
};