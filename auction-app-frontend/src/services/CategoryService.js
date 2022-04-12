import api from 'services/Api';

function getAllCategories() {
    return api.get('/categories');
}

function getAllCategoriesPure() {
    return api.get('/categories/all');
}

const CategoryService = {
    getAllCategories,
    getAllCategoriesPure
};

export default CategoryService;