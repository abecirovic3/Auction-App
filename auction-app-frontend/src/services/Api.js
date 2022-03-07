import axios from 'axios';
import TokenService from './TokenService';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        // TODO implement some whitelist routes logic
        if (!originalConfig.url.includes('/auth/login') && err.response) {
            // Access Token was expired
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const headers = {
                        'Authorization': `Bearer ${TokenService.getLocalRefreshToken()}`
                    }
                    const rs = await instance.post('/auth/token/refresh', {}, {
                        headers: headers
                    });
                    const { access_token, refresh_token } = rs.data;
                    TokenService.updateLocalAccessToken(access_token);
                    TokenService.updateLocalRefreshToken(refresh_token);
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instance;