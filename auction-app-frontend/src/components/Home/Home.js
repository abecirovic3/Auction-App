import { useDispatch } from 'react-redux';

import { setProducts, setPage, setIsLastPage, setGridItemWidth } from 'features/shop/shopSlice';

import HomeMain from 'components/Home/HomeMain/HomeMain';
import HomeProductsTabContainer from 'components/Home/HomeProductsTabContainer/HomeProductsTabContainer';

import 'assets/style/home-page.scss';
import { useEffect } from 'react';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO Implement custom hook for hanlding shop state
        dispatch(setProducts([]));
        dispatch(setPage(0));
        dispatch(setIsLastPage(false));
        dispatch(setGridItemWidth(4));
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