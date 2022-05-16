import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedIn } from 'features/login/loginSlice';

import TokenService from 'services/TokenService';
import AuthService from 'services/AuthService';

function useLoginService() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function reinitiateLogin() {
        TokenService.removeUser();
        dispatch(setLoggedIn(false));
        navigate('/login', {state: {reinitiateLogin: true}})
    }

    function isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            if (!TokenService.getUserCredentials()) {
                reject();
            } else {
                AuthService.validateToken()
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        TokenService.removeUser();
                        reject();
                    });
            }
        });
    }

    function setUserLoggedOut() {
        TokenService.removeUser();
        dispatch(setLoggedIn(false));
    }

    return {
        reinitiateLogin,
        isUserLoggedIn,
        setUserLoggedOut
    }
}

export default useLoginService;