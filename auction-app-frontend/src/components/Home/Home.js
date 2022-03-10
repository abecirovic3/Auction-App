import HomeMain from 'components/Home/HomeMain/HomeMain';
import HomeProductsTabContainer from 'components/Home/HomeItemsTabContainer/HomeProductsTabContainer';

import 'assets/style/home-page.scss';

const Home = () => {
    return (
        <div className='home-page-container'>
            <HomeMain />
            <HomeProductsTabContainer />
        </div>
    );
};

export default Home;