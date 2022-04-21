import { useState, useEffect, useRef } from 'react';
import { Autocomplete, Button, CircularProgress, Collapse, IconButton, Stack, TextField } from '@mui/material';

import getYear from 'date-fns/getYear';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import endOfMonth from 'date-fns/endOfMonth';
import add from 'date-fns/add';

import CustomAlert from 'components/Alert/CustomAlert';

import UserService from 'services/UserService';
import CountryService from 'services/CountryService';
import TokenService from 'services/TokenService';
import ImgurService from 'services/ImgurService';
import useDateSelect from 'hooks/useDateSelect';
import useLoginService from 'hooks/useLoginService';


import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import profilePlaceholder from 'assets/img/profile-placeholder.png';

import 'assets/style/account-profile.scss';

const AccountProfile = () => {
    const isInitialMount = useRef(true);
    const dateSelect = useDateSelect();
    const loginService = useLoginService();

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

    const initialPersonalInfo = useRef({});
    const initialCardInfo = useRef({});
    const initialLocationInfo = useRef({});
    const [errors, setErrors] = useState({
        personalInfo: {},
        cardInfo: {},
        locationInfo: {}
    });

    const [countryInput, setCountryInput] = useState('');
    const [daysSelectItems, setDaysSelectItems] = useState([]);
    const [countries, setCountries] = useState([]);

    const [processingRequest, setProcessingRequest] = useState(false);

    const [errorAlerts, setErrorAlerts] = useState([]);

    useEffect(() => {
        loginService.isUserLoggedIn()
            .then(() => {
                CountryService.getAllCountries()
                    .then(response => {
                        setCountries(response.data.map(c => c.name));
                    })
                    .catch(err => {
                        setErrorAlerts([...errorAlerts, err.response.data]);
                    });
            })
            .catch(() => {
                loginService.setUserLoggedOut();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setProcessingRequest(true);
            UserService.getUserInfo()
                .then(response => {
                    const data = response.data;

                    const dob = data.dateOfBirth ? new Date(data.dateOfBirth) : null;

                    initialPersonalInfo.current = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        day: dob ? getDate(dob) : '',
                        month: dob ? getMonth(dob) + 1 : '',
                        year: dob ? getYear(dob) : '',
                        phoneNumber: data.phoneNumber || '',
                        photoUrl: data.photoUrl
                    };
                    setPersonalInfo(initialPersonalInfo.current);

                    const ced = data.card ? new Date(data.card.expirationDate) : null;

                    initialCardInfo.current = {
                        name: data.card?.name || '',
                        number: data.card?.number || '',
                        expirationMonth: ced ? getMonth(ced) + 1 : '',
                        expirationYear: ced ? getYear(ced) : '',
                        cvc: data.card?.cvc || ''
                    };
                    setCardInfo(initialCardInfo.current);

                    initialLocationInfo.current = {
                        street: data.street?.name || '',
                        city: data.street?.city.name || '',
                        zipcode: data.street?.zipcode || '',
                        state: data.street?.city?.state?.name || '',
                        country: data.street?.city.country.name || ''
                    };
                    setLocationInfo(initialLocationInfo.current);

                    setProcessingRequest(false);
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        loginService.setUserLoggedOut();
                    } else {
                        setErrorAlerts([...errorAlerts, err.response.data]);
                    }
                    setProcessingRequest(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries]);

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

    function handleSave() {
        if ((isDataChanged() || isErrorsPresent()) && validate()) {
            setProcessingRequest(true);
            UserService.updateUserInfo(getUserData())
                .then(response => {
                    TokenService.updateUserCredentials(response.data);
                    setProcessingRequest(false);
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        loginService.setUserLoggedOut();
                    } else {
                        setErrorAlerts([...errorAlerts, err.response.data]);
                    }
                    setProcessingRequest(false);
                });
        }
    }

    function getUserData() {
        return {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            dateOfBirth: getUserDoB(),
            phoneNumber: personalInfo.phoneNumber || null,
            card: getUserCard(),
            street: getUserStreet()
        }
    }

    function getUserStreet() {
        if (isInfoEntered(locationInfo)) {
            return {
                name: locationInfo.street,
                zipcode: locationInfo.zipcode,
                city: {
                    name: locationInfo.city,
                    country: {
                        name: locationInfo.country
                    },
                    state: !locationInfo.state ? null : {
                        name: locationInfo.state
                    }
                }
            }
        }
        return null;
    }

    function getUserCard() {
        if (isInfoEntered(cardInfo)) {
            return {
                name: cardInfo.name,
                number: cardInfo.number,
                expirationDate: endOfMonth(new Date(cardInfo.expirationYear, (cardInfo.expirationMonth - 1))),
                cvc: cardInfo.cvc
            }
        }
        return null;
    }

    function getUserDoB() {
        if (personalInfo.day && personalInfo.month && personalInfo.year) {
            return add(
                new Date(personalInfo.year, (personalInfo.month - 1), personalInfo.day),
                {
                    hours: 2
                }
            );
        }
        return null;
    }

    function isErrorsPresent() {
        return Object.keys(errors.personalInfo).length || Object.keys(errors.cardInfo).length;
    }

    function isDataChanged() {
        for (const key in initialPersonalInfo.current) {
            if (initialPersonalInfo.current[key] !== personalInfo[key]) {
                return true;
            }
        }

        for (const key in initialCardInfo.current) {
            if (initialCardInfo.current[key] !== cardInfo[key]) {
                return true;
            }
        }

        for (const key in initialLocationInfo.current) {
            if (initialLocationInfo.current[key] !== locationInfo[key]) {
                return true;
            }
        }

        return false;
    }

    function validate() {
        let err = {
            personalInfo: {},
            cardInfo: {},
            locationInfo: {}
        };
        const phoneRegex = /^(\+\d+\s)?(\(\d+\))?[\s\d.-]*$/;

        if (!personalInfo.firstName) {
            err.personalInfo.firstName = 'Please enter first name';
        }

        if (!personalInfo.lastName) {
            err.personalInfo.lastName = 'Please enter last name';
        }

        if (personalInfo.phoneNumber && !personalInfo.phoneNumber.match(phoneRegex)) {
            err.personalInfo.phoneNumber
                = 'Phone number must be formatted as +x (y) z where x y z represent a number sequence and +x and (y) are optional';
        }

        if (!personalInfo.day && (personalInfo.month || personalInfo.year)) {
            err.personalInfo.day = 'Either select a birth day or clear all Date of Birth fields';
        }

        if (!personalInfo.month && (personalInfo.day || personalInfo.year)) {
            err.personalInfo.month = 'Either select a birth month or clear all Date of Birth fields';
        }

        if (!personalInfo.year && (personalInfo.day || personalInfo.month)) {
            err.personalInfo.year = 'Either select a birth year or clear all Date of Birth fields';
        }

        if (isInfoEntered(cardInfo)) {
            if (!cardInfo.name) {
                err.cardInfo.name = 'Please enter the name found on your card';
            }

            if (!cardInfo.number) {
                err.cardInfo.number = 'Please enter your card number';
            }

            if (!cardInfo.expirationMonth) {
                err.cardInfo.expirationMonth = 'Please select card expiration month';
            }

            if (!cardInfo.expirationYear) {
                err.cardInfo.expirationYear = 'Please select card expiration year';
            } else if (cardInfo.expirationMonth) {
                const lastDayOfCurrentMonthDate = endOfMonth(new Date());
                const lastDayOfSelectedMonthDate = endOfMonth(new Date(cardInfo.expirationYear, (cardInfo.expirationMonth - 1)));

                if (lastDayOfSelectedMonthDate < lastDayOfCurrentMonthDate) {
                    err.cardInfo.expirationMonth = 'Expiration month must noz be in past';
                }
            }

            if (!cardInfo.cvc) {
                err.cardInfo.cvc = 'Please enter card cvc/cvv';
            }
        }

        if (isInfoEntered(locationInfo)) {
            if (!locationInfo.street) {
                err.locationInfo.street = "Please enter your street";
            }

            if (!locationInfo.city) {
                err.locationInfo.city = "Please enter your city";
            }

            if (!locationInfo.zipcode) {
                err.locationInfo.zipcode = "Please enter valid zipcode";
            }

            if (!locationInfo.country) {
                err.locationInfo.country = "Please select country";
            }
        }

        setErrors(err);

        return Object.keys(err.personalInfo).length === 0 && Object.keys(err.cardInfo).length === 0;
    }

    function isInfoEntered(dataObj) {
        for (const key in dataObj) {
            if (dataObj[key]) {
                return true;
            }
        }
        return false;
    }

    function changePhoto(event) {
        if (event.target.files[0].type.startsWith('image')) {
            setProcessingRequest(true);
            ImgurService.uploadImage(event.target.files[0])
                .then(response => {
                    updatePersonalInfoState('photoUrl', response.data.data.link);
                    setProcessingRequest(false);
                })
                .catch(err => {
                    setErrorAlerts([...errorAlerts, err.response.data.data]);
                    setProcessingRequest(false);
                });
        }
    }

    return (
        <div className='account-profile-container'>
            {
                errorAlerts.map((err, i) =>
                    <CustomAlert
                        key={i} color='error'
                        error={err}
                        showAlertDuration={60000}
                        marginBottom='10px'
                    />
                )
            }
            <div className='personal-info-container'>
                <div className='container-heading'>
                    <h3>Personal Information</h3>
                </div>
                <div className='content-container'>
                    <div className='change-photo-container'>
                        <div className='photo'>
                            {processingRequest ?
                                <CircularProgress style={{margin: '165px'}} size={60} /> :
                                <img
                                    width='100%'
                                    height='100%'
                                    src={personalInfo.photoUrl || profilePlaceholder}
                                    alt='Profile'
                                />
                            }
                        </div>
                        <Button
                            className='change-photo-btn profile-btn'
                            variant='outlined'
                            component='label'
                            disabled={processingRequest}
                        >
                            Change photo
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                onChange={(event) => {changePhoto(event)}}
                            />
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
                                    error={!!errors.personalInfo?.firstName}
                                    helperText={errors.personalInfo?.firstName}
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='lastName'>Last Name</label>
                                <TextField
                                    id='lastName'
                                    variant='outlined'
                                    value={personalInfo.lastName}
                                    onChange={event => {updatePersonalInfoState('lastName', event.target.value)}}
                                    error={!!errors.personalInfo?.lastName}
                                    helperText={errors.personalInfo?.lastName}
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='email'>Email</label>
                                <TextField
                                    id='email'
                                    variant='outlined'
                                    disabled={true}
                                    value={personalInfo.email}
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
                                        error={!!errors.personalInfo?.day}
                                        helperText={errors.personalInfo?.day}
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
                                        error={!!errors.personalInfo?.month}
                                        helperText={errors.personalInfo?.month}
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
                                        error={!!errors.personalInfo?.year}
                                        helperText={errors.personalInfo?.year}
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
                                    error={!!errors.personalInfo?.phoneNumber}
                                    helperText={errors.personalInfo?.phoneNumber}
                                />
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </div>

            <div className='card-info-container'>
                <div
                    className='container-heading'
                    style={Object.keys(errors.cardInfo).length ? {borderBottom: '1px solid red'} : {}}
                >
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
                                        error={!!errors.cardInfo?.name}
                                        helperText={errors.cardInfo?.name}
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='cardNumber'>Card Number</label>
                                    <TextField
                                        id='cardNumber'
                                        variant='outlined'
                                        value={cardInfo.number}
                                        onChange={event => {updateCardInfoState('number', event.target.value)}}
                                        error={!!errors.cardInfo?.number}
                                        helperText={errors.cardInfo?.number}
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
                                                error={!!errors.cardInfo?.expirationMonth}
                                                helperText={errors.cardInfo?.expirationMonth}
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
                                                error={!!errors.cardInfo?.expirationYear}
                                                helperText={errors.cardInfo?.expirationYear}
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
                                            placeholder='***'
                                            value={cardInfo.cvc}
                                            onChange={event => {updateCardInfoState('cvc', event.target.value)}}
                                            error={!!errors.cardInfo?.cvc}
                                            helperText={errors.cardInfo?.cvc}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div className='location-info-container'>
                <div
                    className='container-heading'
                    style={Object.keys(errors.locationInfo).length ? {borderBottom: '1px solid red'} : {}}
                >
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
                                        error={!!errors.locationInfo?.street}
                                        helperText={errors.locationInfo?.street}
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
                                            error={!!errors.locationInfo?.city}
                                            helperText={errors.locationInfo?.city}
                                        />
                                    </Stack>

                                    <Stack spacing={2} width='50%'>
                                        <label htmlFor='zipCode'>Zip Code</label>
                                        <TextField
                                            id='zipCode'
                                            variant='outlined'
                                            value={locationInfo.zipcode}
                                            onChange={event => {updateLocationInfoState('zipcode', event.target.value)}}
                                            error={!!errors.locationInfo?.zipcode}
                                            helperText={errors.locationInfo?.zipcode}
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
                                                error={!!errors.locationInfo?.country}
                                                helperText={errors.locationInfo?.country}
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
                onClick={handleSave}
                disabled={processingRequest}
            >
                Save Info
            </Button>
        </div>
    );
};

export default AccountProfile;