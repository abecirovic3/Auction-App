import api from 'services/Api';

function getAllCategories() {
    return api.get('/category/get-all');
}

const CategoryService = {
    getAllCategories
};

export default CategoryService;