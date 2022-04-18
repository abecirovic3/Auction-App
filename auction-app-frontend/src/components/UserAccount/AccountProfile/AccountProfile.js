import { useState } from 'react';
import { Collapse, IconButton } from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                <div>
                    <h1>Personal Info Stuff</h1>
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
                    <div>
                        <h1>Card Info</h1>
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
                    <div>
                        <h1>Location Info</h1>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default AccountProfile;