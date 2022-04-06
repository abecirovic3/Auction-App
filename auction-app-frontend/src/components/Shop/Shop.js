import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import { setErrorAlerts } from 'features/shop/shopSlice';

import ShopFilters from 'components/Shop/ShopFilters/ShopFilters';
import ShopProductsGrid from 'components/Shop/ShopProductsGrid/ShopProductsGrid';
import CustomAlert from 'components/Alert/CustomAlert';
import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import 'assets/style/shop-page.scss';

const Shop = () => {
    const errorAlerts = useSelector(state => state.shop.errorAlerts);
    const dispatch = useDispatch();
    const location = useLocation();

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
            {location.pathname.includes('/search') &&
                <BreadCrumbsBar />
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