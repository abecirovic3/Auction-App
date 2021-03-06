import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, Stack } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import useShopService from 'hooks/useShopService';

import highlightedProduct from 'assets/img/home-main-product.png';
import RightArrow from '@mui/icons-material/ArrowForwardIosOutlined';

import 'assets/style/home-page-main.scss';

const HomeMain = () => {
    const categories = useSelector(state => state.category.categories);
    const navigate = useNavigate();
    const shopService = useShopService();

    function handleSelectCategory(categoryId) {
        shopService.setInitialCategoryFilters(parseInt(categoryId));
        navigate('/shop');
    }

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
                                            <Paper
                                                id={category.id}
                                                key={category.id}
                                                className='category'
                                                onClick={e => {handleSelectCategory(e.target.id)}}
                                            >
                                                {category.name}
                                            </Paper>
                                        ))
                                    }
                                    {categories.length > 0 &&
                                        <Paper
                                            className='category'
                                            onClick={() => {handleSelectCategory(null)}}
                                        >
                                            All Categories
                                        </Paper>
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
                                        endIcon={<RightArrow />}
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