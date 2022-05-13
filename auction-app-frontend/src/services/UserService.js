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

function addProductToWishlist(productId) {
    if (!productId) {
        return new Promise((resolve, reject) => {
            reject({
                    response: {
                        data: "Product id must be provided"
                    }
                }
            );
        });
    } else {
        return api.post(`/user/${TokenService.getUserCredentials().id}/wishlist?productId=${productId}`);
    }
}

function getAllWishlistedProducts() {
    return api.get(`/user/${TokenService.getUserCredentials().id}/wishlist`);
}

function removeProductFromWishlist(productId) {
    if (!productId) {
        return new Promise((resolve, reject) => {
            reject({
                    response: {
                        data: "Product id must be provided"
                    }
                }
            );
        });
    } else {
        return api.delete(`/user/${TokenService.getUserCredentials().id}/wishlist?productId=${productId}`);
    }
}

const UserService = {
    getAllProducts,
    getUserInfo,
    updateUserInfo,
    deleteAccount,
    getAllBids,
    addProductToWishlist,
    getAllWishlistedProducts,
    removeProductFromWishlist
};

export default UserService;