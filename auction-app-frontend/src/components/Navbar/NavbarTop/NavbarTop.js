import { StyledEngineProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TokenService from '../../../services/TokenService';

import SocialMediaBtnContainer from '../../SocialMediaBtnContainer/SocialMediaBtnContainer';
import '../../../assets/style/navbar-top.scss'
import {setLoggedIn} from '../../../features/login/loginSlice';

const NavbarTop = () => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const dispatch = useDispatch();
    const userCredentials = TokenService.getUserCredentials();

    return (
        <StyledEngineProvider injectFirst>
            <div className='navbar-top-container'>
                <div className='navbar-top-content-container'>
                    <SocialMediaBtnContainer />
                    {userLoggedIn ?
                        <div>
                            <p className='white'>Hi, {userCredentials?.firstName} {userCredentials?.lastName}</p>
                            <p className='gray'> | </p>
                            <Link
                                to='/'
                                onClick={() => {
                                    TokenService.removeUser();
                                    dispatch(setLoggedIn(false));
                                }}
                            >
                                Logout
                            </Link>
                        </div>
                        :
                        <p className='gray'> <Link to='/login'>Login</Link> or <Link to='/register'>Create an account</Link></p>
                    }
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default NavbarTop;