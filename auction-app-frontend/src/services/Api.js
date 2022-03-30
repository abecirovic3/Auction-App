import axios from 'axios';
import TokenService from 'services/TokenService';

const whitelistRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/token/refresh",
    "/products",
];

function isWhitelistRoute(route) {
    for (let i = 0; i < whitelistRoutes.length; i++) {
        if (route.includes(whitelistRoutes[i])) {
            return true;
        }
    }
    return false;
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api/v1',
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
        if (!isWhitelistRoute(originalConfig.url) && err.response) {
            // Access Token was expired
            if (err.response.status === 403) {
                try {
                    // set refresh_token temporarily to be access_token, to fetch the new access_token
                    TokenService.updateLocalAccessToken(TokenService.getLocalRefreshToken());
                    const rs = await instance.get('/auth/token/refresh');
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