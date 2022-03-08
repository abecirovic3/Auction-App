import { StyledEngineProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TokenService from '../../../services/TokenService';
import { setLoggedIn } from '../../../features/login/loginSlice';

import SocialMediaBtnContainer from '../../SocialMediaBtnContainer/SocialMediaBtnContainer';

import '../../../assets/style/navbar-top.scss'

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
                        <p className='gray'> <Link to='/login'>Login</Link> or <Link to='/register'>Create an account</Link></p>
                    }
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default NavbarTop;