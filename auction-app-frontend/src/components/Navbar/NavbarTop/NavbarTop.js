import { StyledEngineProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import SocialMediaBtnContainer from '../../SocialMediaBtnContainer/SocialMediaBtnContainer';

import '../../../assets/style/navbar-top.scss'

const NavbarTop = () => {
    return (
        <StyledEngineProvider injectFirst>
            <div className='navbar-top-container'>
                <SocialMediaBtnContainer />
                {/*TODO this will need to be dynamic depending on user login*/}
                <p> <Link to='/login'>Login</Link> or <Link to='/register'>Create an account</Link></p>
            </div>
        </StyledEngineProvider>
    );
};

export default NavbarTop;