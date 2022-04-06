import api from 'services/Api';

function getPriceRange() {
    return api.get('/price-range');
}

const ProductPriceRangeService = {
    getPriceRange
};

export default ProductPriceRangeService;