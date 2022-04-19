import api from 'services/Api';
import TokenService from 'services/TokenService';

function getAllProducts() {
    return api.get(`/user/${TokenService.getUserCredentials().id}/products`)
}

function getUserInfo() {
    return api.get(`/user/${TokenService.getUserCredentials().id}`);
}

const UserService = {
    getAllProducts,
    getUserInfo
};

export default UserService;