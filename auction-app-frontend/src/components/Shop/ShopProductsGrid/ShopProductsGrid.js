import { useState } from 'react';
import { Select, MenuItem, Grid, Button } from '@mui/material';

import gridGrayIcon from 'assets/img/grid-gray.png';
import gridPurpleIcon from 'assets/img/grid-purple.png';
import listGrayIcon from 'assets/img/list-gray.png';
import listPurpleIcon from 'assets/img/list-purple.png';

const ShopProductsGrid = () => {
    const [itemWidth, setItemWidth] = useState(4);

    return (
        <div className='shop-products-grid-container'>
            <div>
                <Select value={1}>
                    <MenuItem value={1}>Default Sorting</MenuItem>
                    <MenuItem value={2}>Other Sorting</MenuItem>
                    <MenuItem value={3}>Some Other Sorting</MenuItem>
                </Select>
                <Button startIcon={<img src={gridPurpleIcon} alt='grid' />} onClick={() => {setItemWidth(4)}}>Grid</Button>
                <Button startIcon={<img src={listGrayIcon} alt='list' />} onClick={() => {setItemWidth(12)}}>List</Button>
            </div>
            <Grid container spacing={4}>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
                <Grid item xs={itemWidth}>
                    <h2 style={{border: '1px solid black'}}>Item</h2>
                </Grid>
            </Grid>
        </div>
    );
};

export default ShopProductsGrid;