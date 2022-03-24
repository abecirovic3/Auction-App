import api from 'services/Api';

function getAllCategories() {
    return api.get('/categories');
}

const CategoryService = {
    getAllCategories
};

export default CategoryService;