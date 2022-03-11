import { Button, Grid, Paper, Stack } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import highlightedProduct from 'assets/img/home-main-product.png';
import bidNowIcon from 'assets/img/bid-now.svg';

import 'assets/style/home-page-main.scss';

const HomeMain = () => {
    const categories = [
        { id: 1, name: 'Fashion'},
        { id: 2, name: 'Accesories'},
        { id: 3, name: 'Jewlery'},
        { id: 4, name: 'Shoes'},
        { id: 5, name: 'Sportware'},
        { id: 6, name: 'Home'},
        { id: 7, name: 'Electronics'},
        { id: 8, name: 'Mobile'},
        { id: 9, name: 'Computer'},
        { id: 10, name: 'All Categories'},
    ]

    return (
        <StyledEngineProvider injectFirst>
            <div className='home-page-main-container'>
                <div className='home-page-main-content-container'>
                    <Grid
                        container
                        columnSpacing={2}
                        justifyContent='space-around'
                        alignItems={'center'}
                    >
                        <Grid item xs={2.5} >
                            <div className='category-selector'>
                                <h3>CATEGORIES</h3>
                                <Stack spacing={1}>
                                    {
                                        categories.map(category => (
                                            <Paper key={category.id} className='category'>{category.name}</Paper>
                                        ))
                                    }
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item xs={9.5}>
                            <div className='highlighted-product-container'>
                                <div className='product-details-container'>
                                    <h3 className='product-name'>Running Shoes</h3>
                                    <h3 className='product-start-price'>Start From $59.00</h3>
                                    <p className='product-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst. </p>
                                    <Button
                                        disabled={true}
                                        variant='outlined'
                                        className='bid-now-btn'
                                        endIcon={<img src={bidNowIcon} alt='Bid Now' />}
                                    >
                                        Bid now
                                    </Button>
                                </div>
                                <img src={highlightedProduct} alt='Highlighted Product'/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default HomeMain;