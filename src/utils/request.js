import Axios from 'axios';
import NProgress from '../utils/nprogress';
import { ElMessage } from 'element-plus';
import Router from '../router';
import moment from 'moment';
import Store, { accessTokenKey } from '../store';

Date.prototype.toISOString = function () {
    return moment(this).format('YYYY-MM-DD HH:mm:ss');
};

const service = Axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: import.meta.env.VITE_APP_API_TIMEOUT,
});

service.interceptors.request.use(
    (config) => {
        NProgress.start();
        config.headers[accessTokenKey] = Store.state.accessToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        NProgress.done();
        return response.data.data;
    },
    (error) => {
        NProgress.done();

        if (!error.response) {
            ElMessage.error(error.message);
            return Promise.reject(error);
        }

        const status = error.response.status;
        switch (status) {
            case 401:
                Router.push('/login');
                break;
            case 404:
                ElMessage.error('请求的资源不存在');
                break;
            default:
                const data = error.response.data;
                switch (data.code) {
                    case 400:
                    case 500:
                        ElMessage.error(data.message);
                        break;
                    default:
                        ElMessage.error(error.message);
                }
        }

        return Promise.reject(error);
    }
);

export default service;
