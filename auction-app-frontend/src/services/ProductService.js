import api from 'services/Api';

function getProducts(page, size, sortKey, sortDirection) {
    return api.get(`/products?page=${page}&size=${size}&sortKey=${sortKey}&sortDirection=${sortDirection}`);
}

const ProductService = {
    getProducts,
};

export default ProductService;