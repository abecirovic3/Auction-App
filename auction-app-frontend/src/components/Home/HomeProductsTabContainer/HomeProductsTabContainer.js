import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProductService from 'services/ProductService';

import Product from 'components/Product/Product';
import CustomAlert from 'components/Alert/CustomAlert';

import 'assets/style/home-page-product-tabs.scss';
import 'assets/style/infinite-scroll-grid.scss';

const HomeProductsTabContainer = () => {
    const pageSize = 4;

    const isInitialMount = useRef(true);
    const [products, setProducts] = useState([]);
    const [loadedInitialProducts, setLoadedInitialProducts] = useState(false);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [activeTab, setActiveTab] = useState({ newArrivals: true, lastChance: false });
    const [tabLoading, setTabLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setTabLoading(false);
        if (!isInitialMount.current && !loadedInitialProducts) {
            setLoadedInitialProducts(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(() => {
        if (page === 0) {
            fetchProductsForTab(activeTab, page, pageSize, true);
        } else {
            fetchProductsForTab(activeTab, page, pageSize, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setTabLoading(true);
            if (page === 0) {
                fetchProductsForTab(activeTab, 0, pageSize, true);
            } else {
                setPage(0);
                setIsLastPage(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    function setTabToActive(tab) {
        const tabSelector = {
            newArrivals: false,
            lastChance: false
        };
        tabSelector[tab] = true;
        setActiveTab(tabSelector);
    }

    function fetchProductsForTab(tab, page, size, tabChanged) {
        if (isLastPage) return;

        let sortKey = tab.newArrivals ? 'startDate' : 'endDate';
        let sortDirection = tab.newArrivals ? 'desc' : 'asc';

        ProductService.getProducts(page, size, sortKey, sortDirection)
            .then(response => {
                setIsLastPage(response.data.currentPage + 1 === response.data.totalPages);
                if (tabChanged) {
                    setProducts(response.data.data);
                } else {
                    setProducts([...products, ...response.data.data]);
                }
            })
            .catch(err => {
                setAlert(
                    err.response?.data ||
                    { error: 'Connection Error', message: 'Could not establish connection to server' }
                );
            });
    }

    function handleTabChange(tab) {
        if (!activeTab[tab]) {
            setTabToActive(tab);
        }
    }

    function handleProductsScroll() {
        if (loadedInitialProducts === true) {
            setPage(page + 1);
        }
    }

    return (
        <div className='home-product-tabs-container'>
            <div className='home-product-tabs-content-container'>
                <div className='tab-selector'>
                    <Button
                        onClick={() => {handleTabChange('newArrivals')}}
                        className={activeTab.newArrivals ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        New Arrivals
                    </Button>
                    <Button
                        onClick={() => {handleTabChange('lastChance')}}
                        className={activeTab.lastChance ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                    >
                        Last Chance
                    </Button>
                </div>

                {
                    alert &&
                    <CustomAlert
                        color='error'
                        title={alert.error}
                        message={alert.message}
                        showAlertDuration={60000}
                    />
                }

                {tabLoading ?
                    <p className='loading-label'>Loading...</p>
                    :
                    <InfiniteScroll
                        className='infinite-scroll-grid'
                        next={handleProductsScroll}
                        hasMore={!isLastPage}
                        loader={<p className='loading-label'>Loading...</p>}
                        dataLength={products.length}
                    >
                        {
                            products.map(product => (
                                <div key={product.id} className='grid-item'>
                                    <Product product={product} />
                                </div>
                            ))
                        }
                    </InfiniteScroll>
                }
            </div>
        </div>
    );
};

export default HomeProductsTabContainer;