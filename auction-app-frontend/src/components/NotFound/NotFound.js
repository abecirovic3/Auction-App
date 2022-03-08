import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { setNotFoundError } from 'features/notFounHandler/notFoundSlice'

import appLogo from 'assets/img/appLogo.svg';
import 'assets/style/not-found.scss';

const NotFound = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNotFoundError(true));
        return () => {dispatch(setNotFoundError(false))};
    }, [dispatch]);

    return (
        <div className='not-found-container'>
            <img src={appLogo} alt='logo' />
            <h1 className='status-code'>404</h1>
            <h2 className='message'>Ooops! Looks like the page is Not Found</h2>
            <Button
                variant='outlined'
                className='back-button'
                onClick={() => navigate(-1)}
            >
                Go Back
            </Button>
        </div>
    );
};

export default NotFound;