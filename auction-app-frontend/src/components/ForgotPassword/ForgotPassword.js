import {
    Container,
    Stack,
    TextField,
    Button
} from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import MainTheme from "../../Themes/MainTheme";
import "../../assets/style/form.scss"

const ForgotPassword = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                <div className="form-style">
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
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ForgotPassword;