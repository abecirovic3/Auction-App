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
            if (filters[filterKey] && filterKey !== "topLevelCategories" && filterKey !== "subCategories") {
                queryArray.push(`${filterKey}=${filters[filterKey]}`);
            }
            if (filterKey === "subCategories" && Object.keys(filters[filterKey]).length > 0) {
                const categoriesQuery = getCategoriesQuery(filters[filterKey]);
                if (categoriesQuery) {
                    queryArray.push(categoriesQuery);
                }
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

function getCategoriesQuery(categoriesMap) {
    let categories = [];
    for (let keyId of Object.keys(categoriesMap)) {
        if (categoriesMap[keyId].selected) {
            categories.push(keyId);
        }
    }
    if (categories.length > 0) {
        return `categories=${categories.join(',')}`;
    }
    return '';
}

function getProductById(id) {
    return api.get(`/products/${id}`);
}

const ProductService = {
    getProducts,
    getProductById
};

export default ProductService;