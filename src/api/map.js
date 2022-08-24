import http from '../libs/request';

/**
 * 获取完整地图
 * @returns
 */
export const getFullMap = () => {
    return http.get('/FullMap');
};

/**
 * 获取地图信息
 * @returns 
 */
export const getMapInfo = () => {
    return http.get('/MapInfo');
};

/**
 * 渲染完整地图
 * @returns 
 */
export const renderFullMap = () => {
    return http.post('/RenderFullMap');
};

/**
 * 获取切片
 * @param {Number} z zoom
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
export const getTileMap = (z, x, y) => {
    return http.get(`/getTileMap/${z}/${x}/${y}`);
};
