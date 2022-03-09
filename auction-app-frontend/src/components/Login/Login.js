import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Stack,
    Container
} from '@mui/material';
import { ThemeProvider, StyledEngineProvider  } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setRegistered } from 'features/register/registerSlice';
import { setLoggedIn } from 'features/login/loginSlice';
import AuthService from 'services/AuthService';

import CustomAlert from 'components/Alert/CustomAlert';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({});

    const userRegistered = useSelector((state) => state.register.userRegistered);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRegistered(false));
        }
    })

    function handleSubmit() {
        AuthService.login(email, password, rememberMe)
            .then(
                response => {
                    dispatch(setLoggedIn(true));
                    navigate('/');
                },
                err => {
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
                {userRegistered && <CustomAlert
                                        color='success'
                                        title='Registration successful!'
                                        message='You may now login.'
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
                                <Button onClick={() => {handleSubmit()}} color='primary' variant='contained'>Login</Button>
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
