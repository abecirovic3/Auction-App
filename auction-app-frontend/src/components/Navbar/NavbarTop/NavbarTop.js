import { StyledEngineProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TokenService from 'services/TokenService';
import { setLoggedIn } from 'features/login/loginSlice';

import SocialMediaBtnContainer from 'components/SocialMediaBtnContainer/SocialMediaBtnContainer';

import 'assets/style/navbar-top.scss'

const NavbarTop = () => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const dispatch = useDispatch();
    const userCredentials = TokenService.getUserCredentials();
    const navigate = useNavigate();

    function logout() {
        TokenService.removeUser();
        dispatch(setLoggedIn(false));
        navigate('/');
    }

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
                                onClick={() => {logout()}}
                            >
                                Logout
                            </Link>
                        </div>
                        :
                        <div>
                            <Link to='/login'> Login </Link>
                            <p className='gray'> or </p>
                            <Link to='/register'> Create an account </Link>
                        </div>
                    }
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default NavbarTop;