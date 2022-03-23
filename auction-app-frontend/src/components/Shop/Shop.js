import { Grid } from '@mui/material';

import ShopFilters from 'components/Shop/ShopFilters/ShopFilters';
import ShopProductsGrid from 'components/Shop/ShopProductsGrid/ShopProductsGrid';

import 'assets/style/shop-page.scss';

const Shop = () => {
    return (
        <div className='shop-page-container'>
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