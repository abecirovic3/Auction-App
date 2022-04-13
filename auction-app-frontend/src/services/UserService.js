import api from 'services/Api';
import TokenService from 'services/TokenService';

function getAllProducts() {
    return api.get(`/user/${TokenService.getUserCredentials().id}/products`)
}

const UserService = {
    getAllProducts
};

export default UserService;