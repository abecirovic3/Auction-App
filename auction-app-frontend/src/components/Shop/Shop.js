import { Grid } from '@mui/material';

import 'assets/style/shop-page.scss';
import ShopFilters from 'components/Shop/ShopFilters/ShopFilters';

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
                        <h1>Products</h1>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Shop;