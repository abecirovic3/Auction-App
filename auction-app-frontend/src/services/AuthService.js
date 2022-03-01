import api from './Api';
import TokenService from "./TokenService";

const login = (email, password) => {
    return api
        .post(`/auth/login?email=${email}&password=${password}`, {})
        .then(response => {
            if (response.data.access_token) {
                TokenService.setUser(response.data);
            }
            return response.data;
        });
}

const logout = () => {
    TokenService.removeUser();
};

const register = (firstName, lastName, email, password) => {
    return api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password
    });
};

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;