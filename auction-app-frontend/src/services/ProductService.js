import api from 'services/Api';

function getProducts(page, size, sortKey, sortDirection) {
    return api.get(`/product/get-all?page=${page}&size=${size}&sortKey=${sortKey}&sortDirection=${sortDirection}`);
}

function getProductById(id) {
    return api.get(`/product/get-one/${id}`);
}

const ProductService = {
    getProducts,
    getProductById
};

export default ProductService;