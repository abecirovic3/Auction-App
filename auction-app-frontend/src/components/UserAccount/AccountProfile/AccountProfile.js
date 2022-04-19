import { useState } from 'react';
import { Autocomplete, Button, Collapse, IconButton, MenuItem, Stack, TextField } from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import profilePlaceholder from 'assets/img/profile-placeholder.png';

import 'assets/style/account-profile.scss';

const AccountProfile = () => {
    const [cardInfoExpand, setCardInfoExpand] = useState(false);
    const [locationInfoExpand, setLocationInfoExpand] = useState(false);

    return (
        <div className='account-profile-container'>
            <div className='personal-info-container'>
                <div className='container-heading'>
                    <h3>Personal Information</h3>
                </div>
                <div className='content-container'>
                    <div className='change-photo-container'>
                        <div className='photo'>
                            <img width='100%' height='100%' src={profilePlaceholder} alt='Profile'/>
                        </div>
                        <Button
                            className='change-photo-btn'
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
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='lastName'>Last Name</label>
                                <TextField
                                    id='lastName'
                                    variant='outlined'
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='email'>Email</label>
                                <TextField
                                    id='email'
                                    variant='outlined'
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='daySelect'>Date of Birth</label>
                                <Stack spacing={2} direction='row'>
                                    <TextField
                                        id='daySelect'
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value={1}>
                                            1
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        id='monthSelect'
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value={1}>
                                            1
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        id='yearSelect'
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value={1}>
                                            1
                                        </MenuItem>
                                    </TextField>
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <TextField
                                    id='phoneNumber'
                                    variant='outlined'
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
                                    />
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='cardNumber'>Card Number</label>
                                    <TextField
                                        id='cardNumber'
                                        variant='outlined'
                                    />
                                </Stack>

                                <Stack spacing={2} direction='row'>
                                    <Stack spacing={2} width='66%'>
                                        <label htmlFor='expirationDay'>Expiration Date</label>
                                        <Stack spacing={2} direction='row'>
                                            <TextField
                                                id='expirationDay'
                                                select
                                                fullWidth
                                            >
                                                <MenuItem value={1}>
                                                    1
                                                </MenuItem>
                                            </TextField>

                                            <TextField
                                                id='expirationMonth'
                                                select
                                                fullWidth
                                            >
                                                <MenuItem value={1}>
                                                    1
                                                </MenuItem>
                                            </TextField>
                                        </Stack>
                                    </Stack>

                                    <Stack spacing={2} width='33%'>
                                        <label htmlFor='cvv'>CVC/CVV</label>
                                        <TextField
                                            id='cvv'
                                            variant='outlined'
                                            fullWidth
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
                                    />
                                </Stack>

                                <Stack spacing={2} direction='row'>
                                    <Stack spacing={2} width='50%'>
                                        <label htmlFor='city'>City</label>
                                        <TextField
                                            id='city'
                                            variant='outlined'
                                        />
                                    </Stack>

                                    <Stack spacing={2} width='50%'>
                                        <label htmlFor='zipCode'>Zip Code</label>
                                        <TextField
                                            id='zipCode'
                                            variant='outlined'
                                        />
                                    </Stack>
                                </Stack>

                                <Stack spacing={2}>
                                    <label htmlFor='state'>State</label>
                                    <TextField
                                        id='state'
                                        variant='outlined'
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
                                    />
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

const countries = [
    'Bosnia & Herzegovina',
    'Germany',
    'Spain'
];

export default AccountProfile;