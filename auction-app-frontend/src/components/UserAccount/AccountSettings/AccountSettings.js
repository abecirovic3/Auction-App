import { Button, Grid } from '@mui/material';

import 'assets/style/account-settings.scss';

const AccountSettings = () => {
    return (
        <div className='account-settings-container'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className='deactivate-container'>
                        <h3>Account</h3>
                        <h4>Do you want to deactivate account?</h4>
                        <Button className='deactivate-btn' variant='outlined'>Deactivate</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default AccountSettings;