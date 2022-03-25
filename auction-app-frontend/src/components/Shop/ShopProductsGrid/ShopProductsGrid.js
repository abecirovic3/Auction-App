import { useState, useEffect } from 'react';
import { Select, MenuItem, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import ProductService from 'services/ProductService';

import Product from 'components/Product/Product';

import gridGrayIcon from 'assets/img/grid-gray.png';
import gridPurpleIcon from 'assets/img/grid-purple.png';
import listGrayIcon from 'assets/img/list-gray.png';
import listPurpleIcon from 'assets/img/list-purple.png';

import MainTheme from 'themes/MainTheme';
import 'assets/style/shop-product-grid.scss';

const ShopProductsGrid = () => {
    const [itemWidth, setItemWidth] = useState(4);
    const [products, setProducts] = useState([]);
    const filters = useSelector(state => state.productFilters.filters);

    useEffect(() => {
        ProductService.getProducts(0, 9, filters, null, null)
            .then(response => {
                console.log(response);
                setProducts(response.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [filters]);

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
                            onClick={() => {setItemWidth(4)}}
                        >
                            Grid
                        </Button>
                        <Button
                            id='list-layout-btn'
                            startIcon={<img src={itemWidth === 12 ? listPurpleIcon : listGrayIcon} alt='list' />}
                            color={itemWidth === 12 ? 'primary' : 'secondary'}
                            onClick={() => {setItemWidth(12)}}
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
            </div>
        </ThemeProvider>
    );
};

export default ShopProductsGrid;