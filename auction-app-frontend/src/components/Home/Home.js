import { useEffect } from 'react';

import HomeMain from 'components/Home/HomeMain/HomeMain';
import HomeProductsTabContainer from 'components/Home/HomeProductsTabContainer/HomeProductsTabContainer';

import useShopService from 'hooks/useShopService';

import 'assets/style/home-page.scss';

const Home = () => {
    const shopService = useShopService();

    useEffect(() => {
        shopService.setInitialShopProductsState();
        shopService.setInitialProductFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='home-page-container'>
            <HomeMain />
            <HomeProductsTabContainer />
        </div>
    );
};

export default Home;