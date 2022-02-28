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

const Login = () => {

    const navigate = useNavigate();

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
                                        <TextField id="email" variant="outlined" type="email" />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <label htmlFor="password">Password</label>
                                        <TextField id="password" variant="outlined" type="password" />
                                    </Stack>
                                </Stack>

                                <FormControlLabel control={<Checkbox />} label="Remember me" />
                            </Stack>

                            <Stack spacing={2}>
                                <Button color={"primary"} variant="contained">Login</Button>

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
