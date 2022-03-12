import api from 'services/Api';

function getNewArrivalsProducts(page, size) {
    return api.get(`/products/all-products/last-added?page=${page}&size=${size}`);
}

function getLastChanceProducts(page, size) {
    return api.get(`products/all-products/first-done?page=${page}&size=${size}`);
}

const ProductService = {
    getNewArrivalsProducts,
    getLastChanceProducts
};

export default ProductService;