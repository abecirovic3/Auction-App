import { useState } from 'react';
import { Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSearch } from 'features/productFilters/productFiltersSlice';

import appLogo from 'assets/img/appLogo.svg';
import searchIcon from 'assets/img/search.svg';

import MainTheme from 'themes/MainTheme';
import 'assets/style/navbar-bottom.scss';

const NavbarBottom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const hideSearchAndNavigationPaths = [
        'login',
        'register',
        'forgot-password',
    ];

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
            dispatch(setSearch(searchValue));
            navigate('/shop');
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
                                            className={isActive('/') ? 'nav-link-active' : 'nav-link'}
                                        >
                                            HOME
                                        </NavLink>
                                        <NavLink
                                            to='/shop'
                                            className={isActive('/shop') ? 'nav-link-active' : 'nav-link'}
                                        >
                                            SHOP
                                        </NavLink>
                                        <NavLink
                                            to='/account'
                                            className={isActive('/account') ? 'nav-link-active' : 'nav-link'}
                                        >
                                            MY ACCOUNT
                                        </NavLink>
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