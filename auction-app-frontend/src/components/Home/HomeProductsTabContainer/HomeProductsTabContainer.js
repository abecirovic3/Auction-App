import { useState } from 'react';
import { Button, Grid } from '@mui/material';

import Product from 'components/Product/Product';

import productImg1 from 'assets/img/products/productHome1.png';
import productImg2 from 'assets/img/products/productHome2.png';
import productImg3 from 'assets/img/products/productHome3.png';
import productImg4 from 'assets/img/products/productHome4.png';
import productImg5 from 'assets/img/products/productHome5.png';
import productImg6 from 'assets/img/products/productHome6.png';
import productImg7 from 'assets/img/products/productHome7.png';
import productImg8 from 'assets/img/products/productHome8.png';
import productImg9 from 'assets/img/products/productHome9.png';
import productImg10 from 'assets/img/products/productHome10.png';
import productImg11 from 'assets/img/products/productHome11.png';
import productImg12 from 'assets/img/products/productHome12.png';

import 'assets/style/home-page-product-tabs.scss'

const HomeProductsTabContainer = () => {
    const newArrivalsProducts = [
        { id: 1, img: productImg1, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 2, img: productImg2, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 3, img: productImg3, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 4, img: productImg4, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 5, img: productImg5, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 6, img: productImg6, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 7, img: productImg7, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 8, img: productImg8, name: 'Shoes Collection', startPrice: '59.00' },
    ];

    const lastChanceProducts = [
        { id: 1, img: productImg3, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 2, img: productImg10, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 3, img: productImg1, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 4, img: productImg11, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 5, img: productImg5, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 6, img: productImg2, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 7, img: productImg9, name: 'Shoes Collection', startPrice: '59.00' },
        { id: 8, img: productImg12, name: 'Shoes Collection', startPrice: '59.00' },
    ];

    const [products, setProducts] = useState(newArrivalsProducts);
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
                        onClick={() => {setActive('newArrivals'); setProducts(newArrivalsProducts)}}
                        className={activeTab.newArrivals ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        New Arrivals
                    </Button>
                    <Button
                        onClick={() => {setActive('lastChance'); setProducts(lastChanceProducts)}}
                        className={activeTab.lastChance ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        Last Chance
                    </Button>
                </div>
                <Grid container spacing={3}>
                    {
                        products.map(product => (
                            <Grid item xs={3}>
                                <Product img={product.img} name={product.name} startPrice={product.startPrice} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );
};

export default HomeProductsTabContainer;