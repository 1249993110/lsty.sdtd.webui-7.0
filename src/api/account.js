import http from '../libs/request';

/**
 * 登录
 * @returns 
 */
export const signIn = () => {
    return http.post('/Account/SignIn');
};