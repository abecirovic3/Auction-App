import api from 'services/Api';
import TokenService from 'services/TokenService';

function getAllProducts() {
    return api.get(`/user/${TokenService.getUserCredentials().id}/products`);
}

function getUserInfo() {
    return api.get(`/user/${TokenService.getUserCredentials().id}`);
}

function updateUserInfo(data) {
    return api.put(`/user/${TokenService.getUserCredentials().id}`, data);
}

function deleteAccount() {
    return api.delete(`/user/${TokenService.getUserCredentials().id}`);
}

function getAllBids() {
    return api.get(`/user/${TokenService.getUserCredentials().id}/bids`);
}

const UserService = {
    getAllProducts,
    getUserInfo,
    updateUserInfo,
    deleteAccount,
    getAllBids
};

export default UserService;