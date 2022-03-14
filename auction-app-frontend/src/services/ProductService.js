import api from 'services/Api';

function getNewArrivalsProducts(page, size) {
    return api.get(`/products?page=${page}&size=${size}&sortKey=startDate&sortDirection=desc`);
}

function getLastChanceProducts(page, size) {
    return api.get(`/products?page=${page}&size=${size}&sortKey=endDate&sortDirection=asc`);
}

const ProductService = {
    getNewArrivalsProducts,
    getLastChanceProducts
};

export default ProductService;