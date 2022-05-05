import { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setDisableFilters, setSort } from 'features/productFilters/productFiltersSlice';
import { setProducts, setPage, setIsLastPage, setGridItemWidth, setSearchSuggestion } from 'features/shop/shopSlice';

import ProductService from 'services/ProductService';
import useShopService from 'hooks/useShopService';

import Product from 'components/Product/Product';
import ActiveFiltersBar from 'components/Shop/ShopFilters/ActiveFiltersBar';

import GridIcon from '@mui/icons-material/GridOn';
import ListIcon from '@mui/icons-material/Dehaze';

import MainTheme from 'themes/MainTheme';
import 'assets/style/shop-product-grid.scss';


const ShopProductsGrid = () => {
    const pageSize = 9;
    const isInitialMount = useRef(true);
    const dispatch = useDispatch();
    const itemWidth = useSelector(state => state.shop.gridItemWidth);
    const products = useSelector(state => state.shop.products);
    const page = useSelector(state => state.shop.page);
    const isLastPage = useSelector(state => state.shop.isLastPage);
    const filters = useSelector(state => state.productFilters.filters);
    const sort = useSelector(state => state.productFilters.sort);
    const [loading, setLoading] = useState(false);
    const shopService = useShopService();
    const location = useLocation();
    const { state } = useLocation();
    const [sortSelect, setSortSelect] = useState('name-asc');

    useEffect(() => {
        if (Object.keys(filters.subCategories).length === 0) {
            shopService.setInitialCategoryFilters(null);
        } else if (!isInitialMount.current || state?.localSearch || (isInitialMount.current && products.length === 0)) {
            dispatch(setDisableFilters(true));
            fetchProducts(
                page,
                pageSize,
                filters,
                sort.sortKey,
                sort.sortDirection,
                getSearchParameter(location.pathname),
                page === 0
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (page === 0) {
                dispatch(setDisableFilters(true));
                fetchProducts(
                    page,
                    pageSize,
                    filters,
                    sort.sortKey,
                    sort.sortDirection,
                    getSearchParameter(location.pathname),
                    true
                );
            } else {
                dispatch(setPage(0));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, sort, location.pathname]);

    function getSearchParameter(path) {
        if (!path || !path.includes('search')) {
            return null;
        }
        const routeElements = path.split('/');
        return decodeURI(routeElements[routeElements.length - 1]);
    }

    function fetchProducts(page, size, filters, sortKey, sortDirection, search, initFetch) {
        setLoading(true);
        ProductService.getProducts(page, size, filters, sortKey, sortDirection, search)
            .then(response => {
                if (initFetch) {
                    dispatch(setProducts(response.data.paginatedData.data));
                } else {
                    dispatch(setProducts([...products, ...response.data.paginatedData.data]));
                }
                dispatch(setIsLastPage(response.data.paginatedData.currentPage + 1 >= response.data.paginatedData.totalPages));
                dispatch(setDisableFilters(false));
                dispatch(setSearchSuggestion(response.data.searchSuggestion));
                setLoading(false);
            })
            .catch(err => {
                shopService.handleError(err);
                setLoading(false);
            });
    }

    function showActiveFiltersBar() {
        if (filters.minPrice != null) {
            return true;
        } else {
            for (const subCategoryId in filters.subCategories) {
                if (filters.subCategories[subCategoryId].selected) {
                    return true
                }
            }
        }
        return false;
    }

    function handleSelectChange(e) {
        dispatch(setSort(extractSortObject(e.target.value)));
    }

    useEffect(() => {
        const sortKey = sort.sortKey;
        const sortDirection = sort.sortDirection;
        if (sortKey != null && sortDirection != null) {
            setSortSelect(sortKey + '-' + sortDirection);
        } else {
            setSortSelect('name-asc');
        }
    }, [sort]);

    function extractSortObject(sortString) {
        const fields = sortString.split('-');
        return {
            sortKey: fields[0],
            sortDirection: fields[1]
        };
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='shop-products-grid-container'>
                {showActiveFiltersBar() &&
                    <ActiveFiltersBar />
                }
                <div className='sort-and-layout-selector'>
                    <Select
                        className='sort-select'
                        value={sortSelect || ''}
                        onChange={handleSelectChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root.Mui-selected, .MuiMenuItem-root.Mui-selected:focus': {
                                        backgroundColor: '#8367D8',
                                        color: 'white'
                                    },
                                    '& .MuiMenuItem-root.Mui-selected:hover': {
                                        backgroundColor: 'rgba(131,103,216,0.5)',
                                        color: 'white'
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value='name-asc'>
                            Default Sorting
                        </MenuItem>
                        <MenuItem value='startDate-desc'>
                            Added: New to Old
                        </MenuItem>
                        <MenuItem value='endDate-asc'>
                            Time left
                        </MenuItem>
                        <MenuItem value='price-asc'>
                            Price: Low to High
                        </MenuItem>
                        <MenuItem value='price-desc'>
                            Price: High to Low
                        </MenuItem>
                    </Select>
                    <div>
                        <Button
                            id='grid-layout-btn'
                            startIcon={<GridIcon />}
                            color={itemWidth === 4 ? 'primary' : 'secondary'}
                            onClick={() => {dispatch(setGridItemWidth(4))}}
                        >
                            Grid
                        </Button>
                        <Button
                            id='list-layout-btn'
                            startIcon={<ListIcon />}
                            color={itemWidth === 12 ? 'primary' : 'secondary'}
                            onClick={() => {dispatch(setGridItemWidth(12))}}
                        >
                            List
                        </Button>
                    </div>
                </div>
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid key={product.id} item xs={itemWidth}>
                            <Product
                                product={product}
                                layoutStyle={itemWidth === 4 ? 'vertical-container' : 'horizontal-container'}
                                imageStyle='shop-cover-img'
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className='explore-more-container'>
                    {products.length === 0 &&
                        <h3>No products match desired filters</h3>
                    }
                    {!isLastPage &&
                        <LoadingButton
                            loading={loading}
                            loadingPosition='end'
                            endIcon={<div/>}
                            onClick={() => {dispatch(setPage(page + 1))}}
                            variant='contained'
                        >
                            Explore More
                        </LoadingButton>
                    }
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ShopProductsGrid;