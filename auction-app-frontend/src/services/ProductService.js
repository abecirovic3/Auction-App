import api from 'services/Api';

function getProducts(page, size, sortKey, sortDirection) {
    return api.get(`/products?page=${page}&size=${size}&sortKey=${sortKey}&sortDirection=${sortDirection}`);
}

function getProductById(id) {
    return api.get(`/products/${id}`);
}

const ProductService = {
    getProducts,
    getProductById
};

export default ProductService;