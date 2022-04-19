import { useState, useEffect } from 'react';
import { Autocomplete, Button, Collapse, IconButton, Stack, TextField } from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import getYear from 'date-fns/getYear';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';

import profilePlaceholder from 'assets/img/profile-placeholder.png';

import 'assets/style/account-profile.scss';
import useDateSelect from 'hooks/useDateSelect';
import UserService from 'services/UserService';

const AccountProfile = () => {
    const dateSelect = useDateSelect();

    const [cardInfoExpand, setCardInfoExpand] = useState(false);
    const [locationInfoExpand, setLocationInfoExpand] = useState(false);

    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        day: '',
        month: '',
        year: '',
        phoneNumber: '',
        photoUrl: ''
    });

    const [cardInfo, setCardInfo] = useState({
        name: '',
        number: '',
        expirationMonth: '',
        expirationYear: '',
        cvc: ''
    });

    const [locationInfo, setLocationInfo] = useState({
        street: '',
        city: '',
        zipcode: '',
        state: '',
        country: ''
    });

    const [countryInput, setCountryInput] = useState('');
    const [daysSelectItems, setDaysSelectItems] = useState([]);

    useEffect(() => {
        UserService.getUserInfo()
            .then(response => {
                const data = response.data;

                const dob = data.dateOfBirth ? new Date(data.dateOfBirth) : null;

                setPersonalInfo({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    day: dob ? getDate(dob) : '',
                    month: dob ? getMonth(dob) + 1 : '',
                    year: dob ? getYear(dob) : '',
                    phoneNumber: data.phoneNumber || '',
                    photoUrl: data.photoUrl
                });

                const ced = data.card ? new Date(data.card.expirationDate) : null;

                setCardInfo({
                    name: data.card?.name || '',
                    number: data.card?.number || '',
                    expirationMonth: ced ? getMonth(ced) + 1 : '',
                    expirationYear: ced ? getYear(ced) : '',
                    cvc: data.card?.cvc || ''
                });

                setLocationInfo({
                    street: data.street?.name || '',
                    city: data.street?.city.name || '',
                    zipcode: data.street?.zipcode || '',
                    state: data.street?.city?.state?.name || '',
                    country: data.street?.city.country.name || ''
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const daysInMonth
            = dateSelect.getDaysInMonth(personalInfo.month ? personalInfo.month : 1, personalInfo.year);
        if (daysInMonth !== daysSelectItems.length) {
            setDaysSelectItems(
                dateSelect.getDaysInMonthMenuItems(personalInfo.month ? personalInfo.month : 1, personalInfo.year)
            );
            if (daysInMonth < personalInfo.day) {
                setPersonalInfo({
                    ...personalInfo,
                    day: ''
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personalInfo.month, personalInfo.year]);

    function updatePersonalInfoState(key, value) {
        setPersonalInfo({
            ...personalInfo,
            [key]: value
        });
    }

    function updateCardInfoState(key, value) {
        setCardInfo({
            ...cardInfo,
            [key]: value
        });
    }

    function updateLocationInfoState(key, value) {
        setLocationInfo({
            ...locationInfo,
            [key]: value
        });
    }

    return (
        <div className='account-profile-container'>
            <div className='personal-info-container'>
                <div className='container-heading'>
                    <h3>Personal Information</h3>
                </div>
                <div className='content-container'>
                    <div className='change-photo-container'>
                        <div className='photo'>
                            <img
                                width='100%'
                                height='100%'
                                src={personalInfo.photoUrl || profilePlaceholder}
                                alt='Profile'
                            />
                        </div>
                        <Button
                            className='change-photo-btn profile-btn'
                            variant='outlined'
                        >
                            Change photo
                        </Button>
                    </div>

                    <div className='data-container form-style'>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <label htmlFor='firstName'>First Name</label>
                                <TextField
                                    id='firstName'
                                    variant='outlined'
                                    value={personalInfo.firstName}
                                    onChange={event => {updatePersonalInfoState('firstName', event.target.value)}}
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='lastName'>Last Name</label>
                                <TextField
                                    id='lastName'
                                    variant='outlined'
                                    value={personalInfo.lastName}
                                    onChange={event => {updatePersonalInfoState('lastName', event.target.value)}}
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='email'>Email</label>
                                <TextField
                                    id='email'
                                    variant='outlined'
                                    disabled={true}
                                    value={personalInfo.email}
                                    onChange={event => {updatePersonalInfoState('email', event.target.value)}}
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='daySelect'>Date of Birth</label>
                                <Stack spacing={2} direction='row'>
                                    <TextField
                                        id='daySelect'
                                        select
                                        fullWidth
                                        label='DD'
                                        value={personalInfo.day}
                                        onChange={event => {updatePersonalInfoState('day', event.target.value)}}
                                    >
                                        {daysSelectItems}
                                    </TextField>

                                    <TextField
                                        id='monthSelect'
                                        select
                                        fullWidth
                                        label='MM'
                                        value={personalInfo.month}
                                        onChange={event => {updatePersonalInfoState('month', event.target.value)}}
                                    >
                                        {dateSelect.getMonthsMenuItems()}
                                    </TextField>

                                    <TextField
                                        id='yearSelect'
                                        select
                                        fullWidth
                                        label='YYYY'
                                        value={personalInfo.year}
                                        onChange={event => {updatePersonalInfoState('year', event.target.value)}}
                                    >
                                        {dateSelect.getYearsMenuItems(1900, getYear(new Date()) - 1900 - 18)}
                                    </TextField>
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <TextField
                                    id='phoneNumber'
                                    variant='outlined'
                                    value={personalInfo.phoneNumber}
                                    onChange={event => {updatePersonalInfoState('phoneNumber', event.target.value)}}
                                />
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </div>

            <div className='card-info-container'>
                <div className='container-heading'>
                    <IconButton onClick={() => {setCardInfoExpand(!cardInfoExpand)}}>
                        {cardInfoExpand ?
                            <ExpandLessIcon /> :
                            <ExpandMoreIcon />
                        }
                    </IconButton>
                    <h3>Card Information (Optional)</h3>
                </div>
                <Collapse in={cardInfoExpand}>
                    <div className='content-container'>
                        <div className='spacer' />

                        <div className='data-container form-style'>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <label htmlFor='nameOnCard'>Name on Card</label>
                                    <TextField
                                        id='nameOnCard'
                                        variant='outlined'
                                        value={cardInfo.name}
                                        onChange={event => {updateCardInfoState('name', event.target.value)}}
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='cardNumber'>Card Number</label>
                                    <TextField
                                        id='cardNumber'
                                        variant='outlined'
                                        value={cardInfo.number}
                                        onChange={event => {updateCardInfoState('number', event.target.value)}}
                                    />
                                </Stack>

                                <Stack spacing={2} direction='row'>
                                    <Stack spacing={2} width='66%'>
                                        <label htmlFor='expirationMonth'>Expiration Date</label>
                                        <Stack spacing={2} direction='row'>
                                            <TextField
                                                id='expirationMonth'
                                                select
                                                fullWidth
                                                value={cardInfo.expirationMonth}
                                                onChange={event => {updateCardInfoState('expirationMonth', event.target.value)}}
                                                label='MM'
                                            >
                                                {dateSelect.getMonthsMenuItems()}
                                            </TextField>

                                            <TextField
                                                id='expirationYear'
                                                select
                                                fullWidth
                                                value={cardInfo.expirationYear}
                                                onChange={event => {updateCardInfoState('expirationYear', event.target.value)}}
                                                label='YY'
                                            >
                                                {dateSelect.getYearsMenuItems(getYear(new Date()), 10)}
                                            </TextField>
                                        </Stack>
                                    </Stack>

                                    <Stack spacing={2} width='33%'>
                                        <label htmlFor='cvv'>CVC/CVV</label>
                                        <TextField
                                            id='cvv'
                                            variant='outlined'
                                            fullWidth
                                            value={cardInfo.cvc}
                                            onChange={event => {updateCardInfoState('cvc', event.target.value)}}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div className='location-info-container'>
                <div className='container-heading'>
                    <IconButton onClick={() => {setLocationInfoExpand(!locationInfoExpand)}}>
                        {locationInfoExpand ?
                            <ExpandLessIcon /> :
                            <ExpandMoreIcon />
                        }
                    </IconButton>
                    <h3>Shipping Address (Optional)</h3>
                </div>
                <Collapse in={locationInfoExpand}>
                    <div className='content-container'>
                        <div className='spacer' />

                        <div className='data-container form-style'>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <label htmlFor='street'>Street</label>
                                    <TextField
                                        id='street'
                                        variant='outlined'
                                        value={locationInfo.street}
                                        onChange={event => {updateLocationInfoState('street', event.target.value)}}
                                    />
                                </Stack>

                                <Stack spacing={2} direction='row'>
                                    <Stack spacing={2} width='50%'>
                                        <label htmlFor='city'>City</label>
                                        <TextField
                                            id='city'
                                            variant='outlined'
                                            value={locationInfo.city}
                                            onChange={event => {updateLocationInfoState('city', event.target.value)}}
                                        />
                                    </Stack>

                                    <Stack spacing={2} width='50%'>
                                        <label htmlFor='zipCode'>Zip Code</label>
                                        <TextField
                                            id='zipCode'
                                            variant='outlined'
                                            value={locationInfo.zipcode}
                                            onChange={event => {updateLocationInfoState('zipcode', event.target.value)}}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='state'>State</label>
                                    <TextField
                                        id='state'
                                        variant='outlined'
                                        value={locationInfo.state}
                                        onChange={event => {updateLocationInfoState('state', event.target.value)}}
                                    />
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
                                            />}
                                        value={locationInfo.country || null}
                                        onChange={(event, newValue) => {
                                            updateLocationInfoState('country', newValue || '');
                                        }}
                                        inputValue={countryInput}
                                        onInputChange={(event, newInputValue) => {
                                            setCountryInput(newInputValue || '');
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Collapse>
            </div>
            <Button
                className='save-btn profile-btn'
                variant='outlined'
            >
                Save Info
            </Button>
        </div>
    );
};

const countries = [
    'Bosina & Herzegovina',
    'Germany',
    'Spain'
];

export default AccountProfile;