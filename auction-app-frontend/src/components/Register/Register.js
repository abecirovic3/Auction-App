import {
    TextField,
    FormControlLabel,
    Button,
    Stack,
    Container
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ThemeProvider, StyledEngineProvider  } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setRegistered } from 'features/register/registerSlice';
import AuthService from 'services/AuthService';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss'

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    function validate() {
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        let err = {};

        if (!firstName) {
            err.firstName = 'Please enter your first name';
        }

        if (!lastName) {
            err.lastName = 'Please enter your last name';
        }

        if (!email.match(emailRegex)) {
            err.email = 'Please enter a valid email';
        }

        if (password.length < 8) {
            err.password = 'Password must contain at least 8 characters';
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    }

    function handleSubmit() {
        if (validate()) {
            setLoading(true);
            AuthService.register(firstName, lastName, email, password)
                .then(response => {
                    setLoading(false);
                    dispatch(setRegistered(true));
                    navigate('/login', { state: {loginAfterRegister: true} });

                }, err => {
                    setLoading(false);
                    if (err.response.data.hasOwnProperty('message')) {
                        setErrors({
                            email: err.response.data.message
                        });
                    } else {
                        setErrors(err.response.data);
                    }
                });
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                <div className='form-style'>
                    <Container className='form-container' maxWidth='sm'>
                        <h5>Register</h5>

                        <Stack width='80%' margin='auto' spacing={5}>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <label htmlFor='firstName'>First Name</label>
                                    <TextField
                                        id='firstName'
                                        variant='outlined'
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <TextField
                                        id='lastName'
                                        variant='outlined'
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='email'>Enter Email</label>
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

                            <Stack spacing={2}>
                                <LoadingButton
                                    loading={loading}
                                    loadingPosition='end'
                                    endIcon={<div/>}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => {handleSubmit()}}
                                >
                                    Register
                                </LoadingButton>
                                {/*Social Media Register*/}
                            </Stack>

                            <FormControlLabel
                                className='form-label-info'
                                control={
                                    <Button
                                        onClick={() => {navigate('/login')}}
                                        className='standardText'
                                    >
                                        Login
                                    </Button>
                                }
                                label='Already have an account?'
                                labelPlacement='start'
                            />
                        </Stack>
                    </Container>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Register;
