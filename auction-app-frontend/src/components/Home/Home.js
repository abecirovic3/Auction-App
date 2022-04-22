import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useLoginService from 'hooks/useLoginService';

import HomeMain from 'components/Home/HomeMain/HomeMain';
import HomeProductsTabContainer from 'components/Home/HomeProductsTabContainer/HomeProductsTabContainer';
import CustomAlert from 'components/Alert/CustomAlert';

import 'assets/style/home-page.scss';

const Home = () => {
    const { state } = useLocation()
    const loginService = useLoginService();

    useEffect(() => {
        if (state?.deactivateAccount) {
            loginService.setUserLoggedOut();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='home-page-container'>
            {state?.deactivateAccount &&
                <CustomAlert
                    color='success'
                    title='Account deactivated successfully'
                />
            }
            <HomeMain />
            <HomeProductsTabContainer />
        </div>
    );
};

export default Home;