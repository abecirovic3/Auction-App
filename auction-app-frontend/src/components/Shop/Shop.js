import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';

import ShopFilters from 'components/Shop/ShopFilters/ShopFilters';
import ShopProductsGrid from 'components/Shop/ShopProductsGrid/ShopProductsGrid';

import 'assets/style/shop-page.scss';
import CustomAlert from 'components/Alert/CustomAlert';
import { setErrorAlerts } from 'features/shop/shopSlice';

const Shop = () => {
    const errorAlerts = useSelector(state => state.shop.errorAlerts);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setErrorAlerts([]));
        };
    }, [dispatch]);


    return (
        <div className='shop-page-container'>
            {
                errorAlerts.map((alert, i) => (
                    <CustomAlert
                        key={i}
                        color='error'
                        title={alert.error}
                        message={alert.message}
                        showAlertDuration={60000}
                        marginBottom='10px'
                    />
                ))
            }
            <div className='shop-page-content-container'>
                <Grid
                    container
                    columnSpacing={2}
                    justifyContent='space-around'
                >
                    <Grid item xs={2.5}>
                        <ShopFilters />
                    </Grid>
                    <Grid item xs={9.5}>
                        <ShopProductsGrid />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Shop;