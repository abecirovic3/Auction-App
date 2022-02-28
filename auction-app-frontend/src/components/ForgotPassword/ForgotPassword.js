import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8367D8"
        }
    }
});

const ForgotPassword = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Container className="form-container" maxWidth="sm">
                    <h5>FORGOT PASSWORD</h5>

                    <Stack width="80%" margin="auto" spacing={5} paddingBottom={5}>
                        <Stack spacing={2}>
                            <p id="lostPasswordMsg">
                                Lost your password? Please enter your username or email address.
                                You will receive a link to create a new password via email.
                            </p>
                            <label htmlFor="email">Enter Email</label>
                            <TextField id="email" variant="outlined" type="email" />
                        </Stack>

                        <Button color={"primary"} variant="contained">Reset Password</Button>
                    </Stack>
                </Container>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ForgotPassword;