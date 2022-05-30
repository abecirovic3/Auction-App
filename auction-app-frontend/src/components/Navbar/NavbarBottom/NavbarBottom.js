import { useState, useEffect } from 'react';
import { Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

import appLogo from 'assets/img/appLogo.svg';
import searchIcon from 'assets/img/search.svg';

import MainTheme from 'themes/MainTheme';
import 'assets/style/navbar-bottom.scss';
import useShopService from 'hooks/useShopService';

const NavbarBottom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const { state } = useLocation();
    const shopService = useShopService();

    const hideSearchAndNavigationPaths = [
        'login',
        'register',
        'forgot-password',
        'stripe',
    ];

    useEffect(() => {
        if (location.pathname.includes('/search')) {
            const pathElements = location.pathname.split('/');
            setSearchValue(decodeURI(pathElements[pathElements.length - 1]));
        } else {
            setSearchValue('');
        }

        if (!location.pathname.includes('/shop')) {
            shopService.setInitialShopProductsState();
            shopService.setInitialProductFilters();
            shopService.setSortInitial();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    function showSearchAndNavigation() {
        const path = location.pathname;
        for (const p of hideSearchAndNavigationPaths) {
            if (path.includes(p)) {
                return false;
            }
        }
        return true;
    }

    function isActive(path) {
        const locationPath = location.pathname
        if (path === '/') {
            return !locationPath.startsWith('/shop') && !locationPath.startsWith('/account');
        }
        return locationPath.startsWith(path);
    }

    function handleSearchSubmit() {
        if (searchValue) {
            if (location.pathname.includes('/shop')) {
                navigate(`/shop/search/${encodeURI(searchValue)}`, { state: {localSearch: true} });
            } else {
                navigate(`/shop/search/${encodeURI(searchValue)}`);
            }
        } else if (searchValue === '') {
            navigate(`/shop`);
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                <div
                    className="navbar-bottom-container"
                    style={!showSearchAndNavigation() ? {borderBottom: '1px solid #D8D8D8'} : {}}
                >
                    <div className='navbar-bottom-content-container'>
                        <Grid
                            container
                            columnSpacing={2}
                            justifyContent='space-around'
                            paddingTop={2}
                            paddingBottom={2}
                        >
                            <Grid
                                item
                                xs={2.5}
                                textAlign={showSearchAndNavigation() ? '' : 'center'}
                            >
                                <img src={appLogo} alt='Logo' onClick={() => {navigate('/')}} />
                            </Grid>
                            {showSearchAndNavigation() &&
                                <Grid item xs={9.5}>
                                    <div className='search-navigation-container'>
                                        <OutlinedInput
                                            onChange={e => {setSearchValue(e.target.value)}}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    handleSearchSubmit();
                                                }
                                            }}
                                            value={searchValue}
                                            placeholder='Try enter: Shoes'
                                            className='search-bar'
                                            endAdornment={
                                                <InputAdornment position='end' >
                                                    <IconButton onClick={() => {handleSearchSubmit()}}>
                                                        <img src={searchIcon} alt='Search' />
                                                    </IconButton>
                                                </InputAdornment>

                                            }
                                        />
                                        <NavLink
                                            to='/'
                                            className={`${isActive('/') ? 'link-active' : ''} nav-link`}
                                        >
                                            HOME
                                        </NavLink>
                                        <NavLink
                                            to={state?.fromShopPage ? - 1 : '/shop'}
                                            className={`${isActive('/shop') ? 'link-active' : ''} nav-link`}
                                        >
                                            SHOP
                                        </NavLink>
                                        <div className='my-acc-dropdown-container'>
                                            <NavLink
                                                to='/account/profile'
                                                className={`${isActive('/account') ? 'link-active' : ''} nav-link`}
                                            >
                                                MY ACCOUNT
                                            </NavLink>
                                            <div className='my-acc-sub-links-container'>
                                                <div className='my-acc-sub-links-content-container'>
                                                    <NavLink
                                                        to='/account'
                                                        className={`${isActive('/account/profile') ? 'link-active' : ''} nav-link`}
                                                    >
                                                        Profile
                                                    </NavLink>
                                                    <NavLink
                                                        to='/account/seller'
                                                        className={`${isActive('/account/seller') ? 'link-active' : ''} nav-link`}
                                                    >
                                                        Become Seller
                                                    </NavLink>
                                                    <NavLink
                                                        to='/account/bids'
                                                        className={`${isActive('/account/bids') ? 'link-active' : ''} nav-link`}
                                                    >
                                                        Your Bids
                                                    </NavLink>
                                                    <NavLink
                                                        to='/account/wishlist'
                                                        className={`${isActive('/account/wishlist') ? 'link-active' : ''} nav-link`}
                                                    >
                                                        Wishlist
                                                    </NavLink>
                                                    <NavLink
                                                        to='/account/settings'
                                                        className={`${isActive('/account/settings') ? 'link-active' : ''} nav-link`}
                                                    >
                                                        Settings
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            }
                        </Grid>
                    </div>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default NavbarBottom;