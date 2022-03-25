import api from 'services/Api';

function getProducts(page, size, filters, sortKey, sortDirection) {
    let queryArray = [];
    if (page || page === 0) {
        queryArray.push(`page=${page}`);
    }
    if (size) {
        queryArray.push(`size=${size}`);
    }
    if (filters) {
        for (const filterKey in filters) {
            if (filters[filterKey]) {
                queryArray.push(`${filterKey}=${filters[filterKey]}`);
            }
        }
    }
    if (sortKey) {
        queryArray.push(`sortKey=${sortKey}`);
    }
    if (sortDirection) {
        queryArray.push(`sortDirection=${sortDirection}`);
    }
    return api.get('/products' + (queryArray.length > 0 ? `?${queryArray.join('&')}` : ''));
}

function getProductById(id) {
    return api.get(`/products/${id}`);
}

const ProductService = {
    getProducts,
    getProductById
};

export default ProductService;