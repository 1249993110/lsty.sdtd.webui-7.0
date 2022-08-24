import http from '../libs/request';

/**
 * 获取游戏商店配置
 * @returns
 */
export const getGameStoreSettings = () => {
    return http.get('/GameStore/Settings');
};

/**
 * 修改游戏商店配置
 * @returns
 */
export const editGameStoreSettings = (params) => {
    return http.put('/GameStore/Settings', params);
};

/**
 * 获取游戏商店可用变量
 * @returns
 */
export const getVariables = () => {
    return http.get('/GameStore/Variables');
};

/**
 * 通过分页参数获取商品
 * @returns
 */
export const getGoodsPaged = (params) => {
    return http.get('/GameStore/Goods', { params: params });
};

/**
 * 通过Id获取商品
 * @returns
 */
export const getGoodsById = (id) => {
    return http.get('/GameStore/Goods/' + id);
};

/**
 * 新增商品
 * @returns
 */
export const addGoods = (params) => {
    return http.post('/GameStore/Goods', params);
};

/**
 * 通过Id删除商品
 * @returns
 */
export const deleteGoodsById = (id) => {
    return http.delete('/GameStore/Goods/' + id);
};

/**
 * 通过Id集合删除商品
 * @returns
 */
export const deleteGoodsByIds = (ids) => {
    return http.delete('/GameStore/Goods', { data: ids });
};

/**
 * 修改商品
 * @returns
 */
 export const editGoods = (params) => {
    return http.put('/GameStore/Goods', params);
};