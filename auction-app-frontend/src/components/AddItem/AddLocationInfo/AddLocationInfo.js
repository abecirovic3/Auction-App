import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Grid, Stack, TextField, ThemeProvider, Autocomplete } from '@mui/material';

import { setAddress, setCity, setZipCode, setCountry } from 'features/addItem/addItemSlice';

import MainTheme from 'themes/MainTheme';

const AddLocationInfo = ({ countries, cancel, back, submit }) => {
    const address = useSelector(state => state.addItem.address);
    const city = useSelector(state => state.addItem.city);
    const zipCode = useSelector(state => state.addItem.zipCode);
    const country = useSelector(state => state.addItem.country);
    const [countrySelect, setCountrySelect] = useState(null);

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

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
            err.country = 'Please enter country name or select existing';
        }

        setErrors(err);

        return Object.keys(err).length === 0;
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
                                    freeSolo
                                    options={countries}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            placeholder='eg. Spain'
                                            error={!!errors.country}
                                            helperText={errors.country}
                                        />}
                                    forcePopupIcon
                                    value={countrySelect}
                                    onChange={(event, newValue) => {
                                        setCountrySelect(newValue)
                                    }}
                                    inputValue={country}
                                    onInputChange={(event, newInputValue) => {
                                        dispatch(setCountry(newInputValue ? newInputValue : ''));
                                    }}
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