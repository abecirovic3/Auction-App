import { Box, Button, Container, Grid, Stack, TextField, ThemeProvider } from '@mui/material';
import MainTheme from 'themes/MainTheme';
import { Autocomplete } from '@mui/material';

const AddLocationInfo = ({ cancel, back, submit }) => {
    const countries = [
        'Bosina & Herzegowina',
        'Germany',
        'France'
    ];
    return (
        <ThemeProvider theme={MainTheme}>
            <div className='form-style add-item-price-info'>
                <Container className='form-container' maxWidth='sm'>
                    <h5>LOCATION & SHIPPING</h5>

                    <Stack width='80%' margin='auto' spacing={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <label htmlFor='address'>Address</label>
                                <TextField
                                    id='address'
                                    variant='outlined'
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='email'>Enter Email</label>
                                <TextField
                                    id='email'
                                    type='email'
                                    variant='outlined'
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <Stack spacing={2}>
                                    <label htmlFor='city'>City</label>
                                    <TextField
                                        id='city'
                                        variant='outlined'
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='zipCode'>Zip Code</label>
                                    <TextField
                                        id='zipCode'
                                        variant='outlined'
                                    />
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='country'>Country</label>
                                <Autocomplete
                                    id="country"
                                    // disablePortal
                                    freeSolo
                                    options={countries}
                                    renderInput={(params) => <TextField {...params} />}
                                    forcePopupIcon
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <TextField
                                    id='phoneNumber'
                                    variant='outlined'
                                />
                            </Stack>
                        </Stack>

                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button
                                        variant='outlined'
                                        className='nav-buttons cancel-btn'
                                        onClick={() => {cancel()}}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <span />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        variant='outlined'
                                        className='nav-buttons back-btn'
                                        onClick={() => {back()}}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        variant='contained'
                                        className='nav-buttons'
                                        onClick={() => {submit()}}
                                    >
                                        Done
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default AddLocationInfo;