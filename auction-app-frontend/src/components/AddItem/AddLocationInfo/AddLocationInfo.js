import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Grid, Stack, TextField, ThemeProvider, Autocomplete } from '@mui/material';

import {
    setAddress,
    setCity,
    setZipCode,
    setCountry,
    setUserCardName,
    setUserCardNumber,
    setUserCardExpirationMonth,
    setUserCardExpirationYear,
    setUserCardCvc, setUserCard
} from 'features/addItem/addItemSlice';

import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import endOfMonth from 'date-fns/endOfMonth';

import useDateSelect from 'hooks/useDateSelect';
import TokenService from 'services/TokenService';
import PaymentService from 'services/PaymentService';

import CreditCardIcon from '@mui/icons-material/CreditCard';

import MainTheme from 'themes/MainTheme';

const AddLocationInfo = ({ countries, cancel, back, submit }) => {
    const address = useSelector(state => state.addItem.address);
    const city = useSelector(state => state.addItem.city);
    const zipCode = useSelector(state => state.addItem.zipCode);
    const country = useSelector(state => state.addItem.country);
    const [countryInput, setCountryInput] = useState('');
    const userCard = useSelector(state => state.addItem.userCard);

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const dateSelect = useDateSelect();

    useEffect(() => {
        const streetData = TokenService.getUserCredentials().street;
        const cardData = TokenService.getUserCredentials().card;
        if (streetData) {
            dispatch(setAddress(streetData.name || ''));
            dispatch(setZipCode(streetData.zipcode || ''));
            dispatch(setCity(streetData.city?.name || ''));
            dispatch(setCountry(streetData.city?.country?.name || ''));
        }
        if (cardData) {
            dispatch(setUserCard({
                name: cardData.name || '',
                number: cardData.number || '',
                expirationMonth: getMonth(new Date(cardData.expirationDate)) + 1,
                expirationYear: getYear(new Date(cardData.expirationDate)),
                cvc: cardData.cvc
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSubmit() {
        if (validate()) {
            submit();
        }
    }

    function validate() {
        let err = {};

        if (!address) {
            err.address = 'Please enter address';
        }

        if (!city) {
            err.city = 'Please enter city';
        }

        if (!zipCode) {
            err.zipCode = 'Please enter zipcode';
        }

        if (!country) {
            err.country = 'Please select country';
        }

        if (!userCard.name) {
            err.userCardName = 'Please enter the name found on your card';
        }

        if (!userCard.number) {
            err.userCardNumber = 'Please enter your card number';
        }

        if (!userCard.expirationMonth) {
            err.userCardExpirationMonth = 'Please select card expiration month';
        }

        if (!userCard.expirationYear) {
            err.userCardExpirationYear = 'Please select card expiration year';
        } else if (userCard.expirationMonth) {
            const lastDayOfCurrentMonthDate = endOfMonth(new Date());
            const lastDayOfSelectedMonthDate = endOfMonth(new Date(userCard.expirationYear, (userCard.expirationMonth - 1)));

            if (lastDayOfSelectedMonthDate < lastDayOfCurrentMonthDate) {
                err.userCardExpirationMonth = 'Expiration month must not be in past';
            }
        }

        if (!userCard.cvc) {
            err.userCardCvc = 'Please enter card cvc/cvv';
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    }

    function handleAddPaymentInfo() {
        PaymentService.addPaymentInfo()
            .then(response => {
                console.log(response.data);
                window.open(response.data.url, '_blank');
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                                    placeholder='eg. 123 Main Street'
                                    value={address}
                                    onChange={event => {dispatch(setAddress(event.target.value))}}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <Stack spacing={2}>
                                    <label htmlFor='city'>City</label>
                                    <TextField
                                        id='city'
                                        variant='outlined'
                                        placeholder='eg. Madrid'
                                        value={city}
                                        onChange={event => {dispatch(setCity(event.target.value))}}
                                        error={!!errors.city}
                                        helperText={errors.city}
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='zipCode'>Zip Code</label>
                                    <TextField
                                        id='zipCode'
                                        variant='outlined'
                                        placeholder='XXXXXXX'
                                        value={zipCode}
                                        onChange={event => {dispatch(setZipCode(event.target.value))}}
                                        error={!!errors.zipCode}
                                        helperText={errors.zipCode}
                                    />
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='country'>Country</label>
                                <Autocomplete
                                    id="country"
                                    options={countries}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            placeholder='eg. Spain'
                                            error={!!errors.country}
                                            helperText={errors.country}
                                        />}
                                    value={country ? country : null}
                                    onChange={(event, newValue) => {
                                        dispatch(setCountry(newValue ? newValue : ''));
                                    }}
                                    inputValue={countryInput}
                                    onInputChange={(event, newInputValue) => {
                                        setCountryInput(newInputValue ? newInputValue : '');
                                    }}
                                />
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            <p style={{borderBottom: '1px solid #D8D8D8', paddingBottom: '5px'}}>Payment</p>
                            <Button
                                variant='contained'
                                className='nav-buttons'
                                startIcon={<CreditCardIcon />}
                                onClick={handleAddPaymentInfo}
                            >
                                Add Payment Info
                            </Button>
                            {/*<Stack spacing={2}>*/}
                            {/*    <label htmlFor='nameOnCard'>Name on Card</label>*/}
                            {/*    <TextField*/}
                            {/*        id='nameOnCard'*/}
                            {/*        variant='outlined'*/}
                            {/*        placeholder='JOHN DOE'*/}
                            {/*        value={userCard.name}*/}
                            {/*        onChange={event => {dispatch(setUserCardName(event.target.value))}}*/}
                            {/*        error={!!errors.userCardName}*/}
                            {/*        helperText={errors.userCardName}*/}
                            {/*    />*/}
                            {/*</Stack>*/}

                            {/*<Stack spacing={2}>*/}
                            {/*    <label htmlFor='cardNumber'>Card Number</label>*/}
                            {/*    <TextField*/}
                            {/*        id='cardNumber'*/}
                            {/*        variant='outlined'*/}
                            {/*        placeholder='XXXX-XXXX-XXXX-XXXX'*/}
                            {/*        value={userCard.number}*/}
                            {/*        onChange={event => {dispatch(setUserCardNumber(event.target.value))}}*/}
                            {/*        error={!!errors.userCardNumber}*/}
                            {/*        helperText={errors.userCardNumber}*/}
                            {/*    />*/}
                            {/*</Stack>*/}

                            {/*<Stack spacing={2} direction='row'>*/}
                            {/*    <Stack spacing={2} width='66%'>*/}
                            {/*        <label htmlFor='expirationMonth'>Expiration Date</label>*/}
                            {/*        <Stack spacing={2} direction='row'>*/}
                            {/*            <TextField*/}
                            {/*                id='expirationMonth'*/}
                            {/*                select*/}
                            {/*                fullWidth*/}
                            {/*                label='MM'*/}
                            {/*                value={userCard.expirationMonth}*/}
                            {/*                onChange={event => {dispatch(setUserCardExpirationMonth(event.target.value))}}*/}
                            {/*                error={!!errors.userCardExpirationMonth}*/}
                            {/*                helperText={errors.userCardExpirationMonth}*/}
                            {/*            >*/}
                            {/*                {dateSelect.getMonthsMenuItems()}*/}
                            {/*            </TextField>*/}

                            {/*            <TextField*/}
                            {/*                id='expirationYear'*/}
                            {/*                select*/}
                            {/*                fullWidth*/}
                            {/*                label='YY'*/}
                            {/*                value={userCard.expirationYear}*/}
                            {/*                onChange={event => {dispatch(setUserCardExpirationYear(event.target.value))}}*/}
                            {/*                error={!!errors.userCardExpirationYear}*/}
                            {/*                helperText={errors.userCardExpirationYear}*/}
                            {/*            >*/}
                            {/*                {dateSelect.getYearsMenuItems(getYear(new Date()), 10)}*/}
                            {/*            </TextField>*/}
                            {/*        </Stack>*/}
                            {/*    </Stack>*/}

                            {/*    <Stack spacing={2} width='33%'>*/}
                            {/*        <label htmlFor='cvv'>CVC/CVV</label>*/}
                            {/*        <TextField*/}
                            {/*            id='cvv'*/}
                            {/*            variant='outlined'*/}
                            {/*            fullWidth*/}
                            {/*            placeholder='***'*/}
                            {/*            value={userCard.cvc}*/}
                            {/*            onChange={event => {dispatch(setUserCardCvc(event.target.value))}}*/}
                            {/*            error={!!errors.userCardCvc}*/}
                            {/*            helperText={errors.userCardCvc}*/}
                            {/*        />*/}
                            {/*    </Stack>*/}
                            {/*</Stack>*/}
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
                                        onClick={handleSubmit}
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