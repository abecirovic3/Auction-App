import api from 'services/Api';

function getProducts(page, size, filters, sortKey, sortDirection, search, userId) {
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
    if (search) {
        queryArray.push(`search=${search}`);
    }
    if (userId) {
        queryArray.push(`userId=${userId}`);
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

function getProductById(id, userId) {
    const query = userId ? `?userId=${userId}` : '';
    return api.get(`/products/${id}` + query);
}

function postProduct(product) {
    return api.post('/product/add', product);
}

const ProductService = {
    getProducts,
    getProductById,
    postProduct
};

export default ProductService;