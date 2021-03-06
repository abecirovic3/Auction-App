import {
    TextField,
    Checkbox,
    FormControlLabel,
    Stack,
    Container
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ThemeProvider, StyledEngineProvider  } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setLoggedIn } from 'features/login/loginSlice';
import AuthService from 'services/AuthService';

import CustomAlert from 'components/Alert/CustomAlert';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss'

const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const routeHistory = useSelector(state => state.routeHistory.routes);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

    useEffect(() => {
        if (userLoggedIn) {
            if (routeHistory[0] === '/register') {
                navigate('/');
            } else if (state?.beforeMyAccount) {
                navigate('/account');
            } else {
                navigate(-1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoggedIn]);

    function handleSubmit() {
        setLoading(true);
        AuthService.login(email, password, rememberMe)
            .then(
                response => {
                    setLoading(false);
                    dispatch(setLoggedIn(true));
                },
                err => {
                    setLoading(false);
                    setErrors({
                        email: 'Please check if you entered correct email',
                        password: 'Please check if you entered correct password'
                    });
                }
            );
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                {state?.loginAfterRegister &&
                    <CustomAlert
                        color='success'
                        title='Registration successful!'
                        message='You may now login.'
                    />
                }
                {state?.reinitiateLogin &&
                    <CustomAlert
                        color='warning'
                        title='You have been logged out!'
                        message='Please login again to proceed'
                        showAlertDuration={7000}
                    />
                }
                {state?.beforeMyAccount &&
                    <CustomAlert
                        color='info'
                        title='Login required'
                        message='Please login to proceed'
                        showAlertDuration={7000}
                    />
                }
                <div className='form-style'>
                    <Container className='form-container' maxWidth='sm'>
                        <h5>Login</h5>

                        <Stack width='80%' margin='auto' spacing={4}>
                            <Stack spacing={2}>
                                <Stack spacing={4}>
                                    <Stack spacing={2}>
                                        <label htmlFor='email'>Email</label>
                                        <TextField
                                            id='email'
                                            variant='outlined'
                                            type='email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <label htmlFor='password'>Password</label>
                                        <TextField
                                            id='password'
                                            variant='outlined'
                                            type='password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                        />
                                    </Stack>
                                </Stack>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={rememberMe}
                                            onChange={e => setRememberMe(e.currentTarget.checked)}
                                        />
                                    }
                                    label='Remember me'
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <LoadingButton
                                    className='MuiButton-standard-height'
                                    loading={loading}
                                    loadingPosition='end'
                                    endIcon={<div/>}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => {handleSubmit()}}
                                >
                                    Login
                                </LoadingButton>
                                {/*Social Media Login*/}
                            </Stack>

                            {/*Forgot Password Btn*/}
                        </Stack>
                    </Container>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Login;
