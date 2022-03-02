import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Stack,
    Container
} from "@mui/material";

import { ThemeProvider, StyledEngineProvider  } from "@mui/material/styles";

import "../../assets/style/form.scss"
import MainTheme from "../../Themes/MainTheme";
import AuthService from "../../services/AuthService";
import facebookIcon from "../../assets/img/facebook.svg";
import googleIcon from "../../assets/img/google.svg";
import Alert from "../Alert/Alert";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRegistered } from '../../features/register/registerSlice';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({});

        const userRegistered = useSelector((state) => state.register.userRegistered);
        const dispatch = useDispatch();

    const validate = () => {
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        let err = {};

        if (!email.match(emailRegex))
            err.email = "Please enter a valid email";
        if (password.length < 8)
            err.password = "Please enter a valid password";

        setErrors(err);

        return Object.values(err).every(e => e === "");
    }

    const handleSubmit = () => {
        if (validate()) {
            AuthService.login(email, password, rememberMe)
                .then(
                    response => {
                        dispatch(setRegistered(false));
                        navigate("/");
                    },
                    err => {
                        setErrors({
                            email: "Please check if you entered correct email",
                            password: "Please check if you entered correct password"
                        });
                    }
                );
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                {userRegistered && <Alert type="alert-success" displayText="Register was successful" />}
                <div className="form-style">
                    <Container className="form-container" maxWidth="sm">
                        <h5>Login</h5>

                        <Stack width="80%" margin="auto" spacing={4}>
                            <Stack spacing={2}>
                                <Stack spacing={4}>
                                    <Stack spacing={2}>
                                        <label htmlFor="email">Email</label>
                                        <TextField
                                            id="email"
                                            variant="outlined"
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <label htmlFor="password">Password</label>
                                        <TextField
                                            id="password"
                                            variant="outlined"
                                            type="password"
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
                                    label="Remember me"
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <Button onClick={() => {handleSubmit()}} color={"primary"} variant="contained">Login</Button>

                                <Stack className="social-media-stack" direction="row" spacing={2}>
                                    <Button variant="outlined" startIcon={<img src={facebookIcon} alt="Facebook" />}>
                                        Login With Facebook
                                    </Button>
                                    <Button variant="outlined" startIcon={<img src={googleIcon} alt="Google" />}>
                                        Login With Gmail
                                    </Button>
                                </Stack>
                            </Stack>

                            <Button
                                onClick={() => {navigate("/forgot-password")}}
                                className="standardText"
                                size="small"
                            >
                                Forgot password?
                            </Button>
                        </Stack>
                    </Container>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Login;
