import { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import { setDisableFilters } from 'features/productFilters/productFiltersSlice';
import { setProducts, setPage, setIsLastPage, setGridItemWidth, setErrorAlerts } from 'features/shop/shopSlice';

import ProductService from 'services/ProductService';

import Product from 'components/Product/Product';

import gridGrayIcon from 'assets/img/grid-gray.png';
import gridPurpleIcon from 'assets/img/grid-purple.png';
import listGrayIcon from 'assets/img/list-gray.png';
import listPurpleIcon from 'assets/img/list-purple.png';

import MainTheme from 'themes/MainTheme';
import 'assets/style/shop-product-grid.scss';
import { LoadingButton } from '@mui/lab';

const ShopProductsGrid = () => {
    const pageSize = 3;
    const isInitialMount = useRef(true);
    const dispatch = useDispatch();
    const itemWidth = useSelector(state => state.shop.gridItemWidth);
    const products = useSelector(state => state.shop.products);
    const page = useSelector(state => state.shop.page);
    const isLastPage = useSelector(state => state.shop.isLastPage);
    const filters = useSelector(state => state.productFilters.filters);
    const [loading, setLoading] = useState(false);
    const errorAlerts = useSelector(state => state.shop.errorAlerts);

    useEffect(() => {
        if (!isInitialMount.current || (isInitialMount.current && products.length === 0)) {
            fetchProducts(page, pageSize, filters, null, null, page === 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (page === 0) {
                fetchProducts(page, pageSize, filters, null, null, true);
            } else {
                dispatch(setPage(0));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    function fetchProducts(page, size, filters, sortKey, sortDirection, initFetch) {
        setLoading(true);
        ProductService.getProducts(page, size, filters, sortKey, sortDirection)
            .then(response => {
                if (initFetch) {
                    dispatch(setProducts(response.data.data));
                } else {
                    dispatch(setProducts([...products, ...response.data.data]));
                }
                dispatch(setIsLastPage(response.data.currentPage + 1 === response.data.totalPages));
                dispatch(setDisableFilters(false));
                setLoading(false);
            })
            .catch(err => {
                dispatch(setErrorAlerts([
                    ...errorAlerts,
                    // err.response?.data ||
                    {
                        error: 'Connection Error',
                        message: 'Could not establish connection to server'
                    }
                ]));
                setLoading(false);
            });
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='shop-products-grid-container'>
                <div className='sort-and-layout-selector'>
                    <Select className='sort-select' value={1}>
                        <MenuItem value={1}>Default Sorting</MenuItem>
                        <MenuItem value={2}>Other Sorting</MenuItem>
                        <MenuItem value={3}>Some Other Sorting</MenuItem>
                    </Select>
                    <div>
                        <Button
                            id='grid-layout-btn'
                            startIcon={<img src={itemWidth === 4 ? gridPurpleIcon : gridGrayIcon} alt='grid' />}
                            color={itemWidth === 4 ? 'primary' : 'secondary'}
                            onClick={() => {dispatch(setGridItemWidth(4))}}
                        >
                            Grid
                        </Button>
                        <Button
                            id='list-layout-btn'
                            startIcon={<img src={itemWidth === 12 ? listPurpleIcon : listGrayIcon} alt='list' />}
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
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className='explore-more-container'>
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