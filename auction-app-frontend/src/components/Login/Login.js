import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { ThemeProvider, StyledEngineProvider  } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import "../../css/form.scss"
import MainTheme from "../../Themes/MainTheme";
import facebookIcon from "../../img/facebook.svg";
import googleIcon from "../../img/google.svg";

import AuthService from "../../services/AuthService";
import {useState} from "react";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

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
            AuthService.login(email, password)
                .then(
                    response => {
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

                                <FormControlLabel control={<Checkbox />} label="Remember me" />
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
                                onClick={() => {navigate("/forgotpassword")}}
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
