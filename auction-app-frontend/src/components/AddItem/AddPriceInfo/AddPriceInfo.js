import { Box, Button, Container, Grid, InputAdornment, Stack, TextField, ThemeProvider } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { useState } from 'react';

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss';
import 'assets/style/add-item-price-info.scss';

const AddPriceInfo = ({ cancel, back, nextStep }) => {
    const [value, setValue] = useState(null);

    const CustomCalendarIcon = () => {
        return (
            <CalendarIcon color='dark' />
        );
    }

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
                                    InputProps={{
                                        startAdornment:
                                            <InputAdornment position='start'>
                                                <div className='dollar-adornment'>
                                                    <h3>$</h3>
                                                </div>
                                            </InputAdornment>
                                    }}
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <Stack width='50%' spacing={2}>
                                    <label htmlFor='startDate'>Start Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField
                                                {...params}
                                            />}
                                            components={{
                                                OpenPickerIcon: CustomCalendarIcon
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack width='50%' spacing={2}>
                                    <label htmlFor='endDate'>End Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField
                                                {...params}
                                            />}
                                            components={{
                                                OpenPickerIcon: CustomCalendarIcon
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                            </Stack>

                            <p className='info-label'>The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
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
                                        onClick={() => {nextStep()}}
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