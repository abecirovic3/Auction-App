import api from 'services/Api';

function getNewArrivalsProducts(page, size) {
    return api.get(`/products?page=${page}&size=${size}&sort=startDate,desc`);
}

function getLastChanceProducts(page, size) {
    return api.get(`/products?page=${page}&size=${size}&sort=endDate,asc`);
}

const ProductService = {
    getNewArrivalsProducts,
    getLastChanceProducts
};

export default ProductService;