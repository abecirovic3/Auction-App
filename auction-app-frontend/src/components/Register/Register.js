import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme, StyledEngineProvider  } from "@mui/material/styles";

import "../../css/form-style.css";

import facebookIcon from "../../img/facebook.svg";
import googleIcon from "../../img/google.svg";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8367D8"
        }
    }
})

const Register = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Container className="form-container" maxWidth="sm">
                    <h5>Register</h5>

                    <Stack width="80%" margin="auto" spacing={5}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <label htmlFor="firstName">First Name</label>
                                <TextField id="firstName" variant="outlined" />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor="lastName">Last Name</label>
                                <TextField id="Last Name" variant="outlined" />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor="email">Enter Email</label>
                                <TextField id="Last Name" variant="outlined" type="email" />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor="password">Password</label>
                                <TextField id="Last Name" variant="outlined" type="password" />
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            <Button color={"primary"} variant="contained">Register</Button>

                            <Stack className="social-media-stack" direction="row" spacing={2} >
                                <Button variant="outlined" startIcon={<img src={facebookIcon} alt="Facebook" />}>
                                    Signup With Facebook
                                </Button>
                                <Button variant="outlined" startIcon={<img src={googleIcon} alt="Google" />}>
                                    Signup With Gmail
                                </Button>
                            </Stack>
                        </Stack>
                        <FormControlLabel
                            id="registerInfoLabel"
                            control={<Button className="standardText" >Login</Button>}
                            label="Already have an account?"
                            labelPlacement="start"
                        />
                    </Stack>
                </Container>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Register;
