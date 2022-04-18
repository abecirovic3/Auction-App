import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, InputAdornment, Stack, TextField, ThemeProvider } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import set from 'date-fns/set'

import { setStartPrice, setStartDate, setEndDate } from 'features/addItem/addItemSlice';

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss';
import 'assets/style/add-item-price-info.scss';

const AddPriceInfo = ({ cancel, back, nextStep }) => {
    const startTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
    };

    const endTime = {
        hours: 23,
        minutes: 59,
        seconds: 59
    }

    const CustomCalendarIcon = () => {
        return (
            <CalendarIcon color='dark' />
        );
    }

    const startPrice = useSelector(state => state.addItem.startPrice);
    const startDate = useSelector(state => state.addItem.startDate);
    const endDate = useSelector(state => state.addItem.endDate);

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    function validate() {
        let err = {};

        if (isNaN(parseFloat(startPrice)) || parseFloat(startPrice) < 0) {
            err.startPrice = 'Please enter valid start price';
        }
        const sd = new Date(startDate);
        const ed = new Date(endDate);
        const ref = set(new Date(), startTime);

        if (!startDate) {
            err.startDate = 'Please choose a start date for the auction';
        } else if (sd < ref) {
            err.startDate = 'Auction start cannot be in the past';
        }

        if (!endDate) {
            err.endDate = 'Please choose an end date for the auction';
        } else if (ed < ref) {
            err.endDate = 'Auction end cannot be in the past'
        } else if (ed < sd) {
            err.endDate = 'Auction end must be after auction start';
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    }

    function handleNextStep() {
        if (validate()) {
            nextStep();
        }
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
                                    value={startPrice}
                                    onChange={event => {dispatch(setStartPrice(event.target.value))}}
                                    error={!!errors.startPrice}
                                    helperText={errors.startPrice}
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <Stack width='50%' spacing={2}>
                                    <label htmlFor='startDate'>Start Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={startDate ? new Date(startDate) : null}
                                            onChange={(newValue) => {
                                                const newDate = set(newValue, startTime);
                                                dispatch(setStartDate(newDate?.toString() || null));
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={!!errors.startDate}
                                                    helperText={errors.startDate}
                                                />}
                                            components={{
                                                OpenPickerIcon: CustomCalendarIcon
                                            }}
                                            minDate={new Date()}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack width='50%' spacing={2}>
                                    <label htmlFor='endDate'>End Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={endDate ? new Date(endDate) : null}
                                            onChange={(newValue) => {
                                                const newDate = set(newValue, endTime);
                                                dispatch(setEndDate(newDate?.toString() || null))
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={!!errors.endDate}
                                                    helperText={errors.endDate}
                                                />}
                                            components={{
                                                OpenPickerIcon: CustomCalendarIcon
                                            }}
                                            minDate={new Date()}
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
                                        onClick={handleNextStep}
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