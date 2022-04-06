import { Box, Button, Container, Grid, Paper, Stack, TextField, ThemeProvider } from '@mui/material';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss';
import 'assets/style/add-item-price-info.scss';
import * as React from 'react';

const AddPriceInfo = () => {
    return (
        <ThemeProvider theme={MainTheme}>
            <div className='form-style add-item-price-info'>
                <Container className='form-container' maxWidth='sm'>
                    <h5>SET PRICES</h5>

                    <Stack width='80%' margin='auto' spacing={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <label htmlFor='price'>Your start Price</label>
                                <TextField
                                    id='price'
                                    variant='outlined'
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <Stack spacing={2}>
                                    <label htmlFor='startDate'>Start Date</label>
                                    <TextField
                                        id='startDate'
                                        variant='outlined'
                                        type='date'
                                    />
                                </Stack>
                                <Stack spacing={2}>
                                    <label htmlFor='endDate'>End Date</label>
                                    <TextField
                                        id='endDate'
                                        variant='outlined'
                                        type='date'
                                    />
                                </Stack>
                            </Stack>

                            <p>The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
                        </Stack>

                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button
                                        variant='outlined'
                                        className='nav-buttons'
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
                                        className='nav-buttons'
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        variant='contained'
                                        className='nav-buttons'
                                    >
                                        Next
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

export default AddPriceInfo;