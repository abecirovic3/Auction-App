import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ListIcon from '@mui/icons-material/ListOutlined';
import BidIcon from '@mui/icons-material/MonetizationOnOutlined';
import WishlistIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddItemIcon from '@mui/icons-material/AddOutlined';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import { setLoggedIn } from 'features/login/loginSlice';
import useLoginService from 'hooks/useLoginService';

import MainTheme from 'themes/MainTheme';
import 'assets/style/user-account.scss';

const UserAccount = () => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const [activeTab, setActiveTab] = useState({
        profile: true,
        seller: false,
        bids: false,
        wishlist: false,
        settings: false
    });
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginService = useLoginService();

    useEffect(() => {
        setActiveTab({
            profile: location.pathname === '/account/profile',
            seller: location.pathname === '/account/seller',
            bids: location.pathname === '/account/bids',
            wishlist: location.pathname === '/account/wishlist',
            settings: location.pathname === '/account/settings',
        });
    }, [location.pathname]);

    function getBreadcrumbsBarTitle() {
        const title = location.pathname.split('/')[2];
        return title?.charAt(0).toUpperCase() + title?.substring(1) || 'Profile';
    }

    function handleAddItem() {
        loginService.isUserLoggedIn()
            .then(() => {
                dispatch(setLoggedIn(true));
                navigate('/account/add-item');
            })
            .catch(() => {
                loginService.setUserLoggedOut();
            });
    }

    if (!userLoggedIn) {
        return <Navigate to='/login' state={ { beforeMyAccount: true } } />
    }

    if (location.pathname === '/account') {
        return <Navigate to='/account/profile' />
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='user-account-container'>
                <BreadCrumbsBar title={getBreadcrumbsBarTitle()} />
                <div className='user-account-content-container'>
                    <div className='tab-selector'>
                        <div>
                            <Button
                                className='tab-btn'
                                color={activeTab.profile ? 'primary' : 'dark'}
                                startIcon={<PersonIcon />}
                                variant={activeTab.profile ? 'contained' : 'text'}
                                onClick={() => {navigate('/account/profile')}}
                            >
                                Profile
                            </Button>
                            <Button
                                className='tab-btn'
                                color={activeTab.seller ? 'primary' : 'dark'}
                                startIcon={<ListIcon />}
                                variant={activeTab.seller ? 'contained' : 'text'}
                                onClick={() => {navigate('/account/seller')}}
                            >
                                Seller
                            </Button>
                            <Button
                                className='tab-btn'
                                color={activeTab.bids ? 'primary' : 'dark'}
                                startIcon={<BidIcon />}
                                variant={activeTab.bids ? 'contained' : 'text'}
                                onClick={() => {navigate('/account/bids')}}
                            >
                                Bids
                            </Button>
                            <Button
                                className='tab-btn'
                                color={activeTab.wishlist ? 'primary' : 'dark'}
                                startIcon={<WishlistIcon />}
                                variant={activeTab.wishlist ? 'contained' : 'text'}
                                onClick={() => {navigate('/account/wishlist')}}
                            >
                                Wishlist
                            </Button>
                            <Button
                                className='tab-btn'
                                color={activeTab.settings ? 'primary' : 'dark'}
                                startIcon={<SettingsIcon />}
                                variant={activeTab.settings ? 'contained' : 'text'}
                                onClick={() => {navigate('/account/settings')}}
                            >
                                Settings
                            </Button>
                        </div>
                        <Button
                            className='add-item-btn'
                            color='primary'
                            startIcon={<AddItemIcon />}
                            variant={'contained'}
                            onClick={handleAddItem}
                        >
                            ADD ITEM
                        </Button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default UserAccount;