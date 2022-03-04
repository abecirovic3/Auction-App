import {Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

import appLogo from '../../../assets/img/appLogo.svg';
import searchIcon from '../../../assets/img/search.svg';

import MainTheme from '../../../Themes/MainTheme';
import '../../../assets/style/navbar-bottom.scss';

const NavbarBottom = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const activeLinkStyle = {
        color: '#8367D8',
        fontWeight: '500'
    }

    function showSearchAndNavigation() {
        const path = location.pathname;
        return !path.includes('login') && !path.includes('register') && !path.includes('forgot-password');
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                <div className='navbar-bottom-container'>
                    <Grid
                        container
                        columnSpacing={2}
                        justifyContent='space-around'
                        paddingTop={2}
                        paddingBottom={2}
                    >
                        <Grid
                            item
                            xs={2}
                            textAlign={showSearchAndNavigation() ? '' : 'center'}
                        >
                            <img src={appLogo} alt='Logo' onClick={() => {navigate('/')}} />
                        </Grid>
                        {showSearchAndNavigation() &&
                            <Grid item xs={10}>
                                <div className='search-navigation-container'>
                                    <OutlinedInput
                                        placeholder='Try enter: Shoes'
                                        className='search-bar'
                                        endAdornment={
                                            <InputAdornment position='end' >
                                                <IconButton onClick={() => console.log('CLICK')}>
                                                    <img src={searchIcon} alt='Search' />
                                                </IconButton>
                                            </InputAdornment>

                                        }
                                    />
                                    <NavLink
                                        to='/'
                                        style={({ isActive }) => { return isActive ? activeLinkStyle : {} }}
                                    >
                                        HOME
                                    </NavLink>
                                    <NavLink
                                        to='/shop'
                                        style={({ isActive }) => { return isActive ? activeLinkStyle : {} }}
                                    >
                                        SHOP
                                    </NavLink>
                                    <NavLink
                                        to='/account'
                                        style={({ isActive }) => { return isActive ? activeLinkStyle : {} }}
                                    >
                                        MY ACCOUNT
                                    </NavLink>
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default NavbarBottom;