import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedIn } from 'features/login/loginSlice';

import TokenService from 'services/TokenService';

function useLoginService() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function reinitiateLogin() {
        TokenService.removeUser();
        dispatch(setLoggedIn(false));
        navigate('/login', {state: {reinitiateLogin: true}})
    }

    return {
        reinitiateLogin
    }
}

export default useLoginService;