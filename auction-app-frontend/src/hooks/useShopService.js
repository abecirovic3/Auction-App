import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setPage, setIsLastPage, setGridItemWidth } from 'features/shop/shopSlice';
import { setCategories } from 'features/category/categorySlice';
import {
    setFilters, setMaxPrice,
    setMinPrice,
    setSubCategories,
    setTopLevelCategories
} from 'features/productFilters/productFiltersSlice';
import CategoryService from 'services/CategoryService';

function useShopService() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const filters = useSelector(state => state.productFilters.filters);
    const topLevelCategories = useSelector(state => state.productFilters.topLevelCategories);

    function setInitialShopProductsState() {
        dispatch(setProducts([]));
        dispatch(setPage(0));
        dispatch(setIsLastPage(false));
        dispatch(setGridItemWidth(4));
    }

    function setInitialProductFilters() {
        CategoryService.getAllCategories()
            .then(response => {
                dispatch(setCategories(response.data));
                const categoryFilters = getTopLevelAndSubCategories(response.data, null);
                dispatch(setFilters({
                    minPrice: null,
                    maxPrice: null,
                    subCategories: categoryFilters.subCategories,
                    search: null
                }));
                dispatch(setTopLevelCategories(categoryFilters.topLevelCategories));
            })
            .catch(err => {
                console.log(err);
            })
    }

    function setInitialCategoryFilters(categoryId) {
        if (categories.length > 0) {
            const categoryFilters = getTopLevelAndSubCategories(categories, categoryId);
            dispatch(setTopLevelCategories(categoryFilters.topLevelCategories));
            dispatch(setSubCategories(categoryFilters.subCategories));
        } else {
            CategoryService.getAllCategories()
                .then(response => {
                    dispatch(setCategories(response.data));
                    const categoryFilters = getTopLevelAndSubCategories(response.data);
                    dispatch(setTopLevelCategories(categoryFilters.topLevelCategories));
                    dispatch(setSubCategories(categoryFilters.subCategories));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    function getTopLevelAndSubCategories(categories, categoryId) {
        const tlc = {};
        const sc = {};
        for (let category of categories) {
            if (categoryId != null && category.id === categoryId) {
                tlc[categoryId.toString()] = true;
            } else {
                tlc[category.id.toString()] = false;
            }
            for (let subCategory of category.subCategories) {
                sc[subCategory.id.toString()] = {
                    name: subCategory.name,
                    parentCategoryName: category.name,
                    selected: categoryId != null && category.id === categoryId
                };
            }
        }
        return {
            topLevelCategories: tlc,
            subCategories: sc
        };
    }

    function removePriceFilters() {
        setMinPrice(null);
        setMaxPrice(null);
    }

    function setMinPriceFilter(value) {
        dispatch(setMinPrice(value));
    }

    function setMaxPriceFilter(value) {
        dispatch(setMaxPrice(value));
    }

    function setSubCategoryFilter(subCategoryId, value) {
        dispatch(setSubCategories({
            ...filters.subCategories,
            [subCategoryId.toString()]: {
                ...filters.subCategories[subCategoryId],
                selected: value
            }
        }));
    }

    function flipTopLevelCategoryFilterValue(categoryId) {
        dispatch(setTopLevelCategories({
            ...topLevelCategories,
            [categoryId.toString()]: !topLevelCategories[categoryId.toString()]
        }));
    }

    return {
        setInitialShopProductsState,
        setInitialProductFilters,
        setInitialCategoryFilters,
        removePriceFilters,
        setMinPriceFilter,
        setMaxPriceFilter,
        setSubCategoryFilter,
        flipTopLevelCategoryFilterValue
    }
}

export default useShopService;