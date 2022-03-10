import { useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';

import 'assets/style/home-page-product-tabs.scss'

const HomeProductsTabContainer = () => {
    const [activeTab, setActiveTab] = useState({ newArrivals: true, lastChance: false });

    function setActive(tab) {
        const tabSelector = {newArrivals: false, lastChance: false};
        tabSelector[tab] = true;
        setActiveTab(tabSelector);
    }

    return (
        <div className="home-product-tabs-container">
            <div className="home-product-tabs-content-container">
                <div className="tab-selector">
                    <Button
                        onClick={() => {setActive('newArrivals')}}
                        className={activeTab.newArrivals ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        New Arrivals
                    </Button>
                    <Button
                        onClick={() => {setActive('lastChance')}}
                        className={activeTab.lastChance ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        Last Chance
                    </Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Item</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default HomeProductsTabContainer;