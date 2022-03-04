import { IconButton } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import facebookIcon from '../../../assets/img/navbarFacebook.svg';
import instagramIcon from '../../../assets/img/navbarInstagram.svg';
import twitterIcon from '../../../assets/img/navbarTwitter.svg';

import '../../../assets/style/navbar-top.scss'

const NavbarTop = () => {
    return (
        <StyledEngineProvider injectFirst>
            <div className='navbar-top-container'>
                <div>
                    <IconButton onClick={() => {window.open('https://www.facebook.com/AtlantBH'); }}>
                        <img src={facebookIcon} alt='Facebook' />
                    </IconButton>
                    <IconButton onClick={() => {window.open('https://www.instagram.com/atlantbh/?hl=en')}}>
                        <img src={instagramIcon} alt='Instagram' />
                    </IconButton>
                    <IconButton onClick={() => {window.open('https://twitter.com/atlantbh?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor')}}>
                        <img src={twitterIcon} alt='Twitter' />
                    </IconButton>
                </div>
                <p> <Link to='/login'>Login</Link> or <Link to='/register'>Create an account</Link></p>
            </div>
        </StyledEngineProvider>
    );
};

export default NavbarTop;