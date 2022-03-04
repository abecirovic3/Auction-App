import api from './Api';
import TokenService from './TokenService';

function login(email, password, rememberMe) {
    return api
        .post(`/auth/login?email=${email}&password=${password}`, {})
        .then(response => {
            if (response.data.access_token) {
                TokenService.setUser(response.data, rememberMe);
            }
            return response.data;
        });
}

function logout() {
    TokenService.removeUser();
}

function register(firstName, lastName, email, password) {
    return api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password
    });
}

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;