import { useDispatch } from 'react-redux';

import { setProducts, setPage, setIsLastPage } from 'features/shop/shopSlice';

import HomeMain from 'components/Home/HomeMain/HomeMain';
import HomeProductsTabContainer from 'components/Home/HomeProductsTabContainer/HomeProductsTabContainer';

import 'assets/style/home-page.scss';
import { useEffect } from 'react';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProducts([]));
        dispatch(setPage(0));
        dispatch(setIsLastPage(false));
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