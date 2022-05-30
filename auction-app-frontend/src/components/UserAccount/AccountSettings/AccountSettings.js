import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomAlert from 'components/Alert/CustomAlert';

import useLoginService from 'hooks/useLoginService';
import UserService from 'services/UserService';

import 'assets/style/account-settings.scss';

const AccountSettings = () => {
    const loginService = useLoginService();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogConfirm, setDialogConfirm] = useState(false);
    const [errorAlerts, setErrorAlerts] = useState([]);

    useEffect(() => {
        loginService.isUserLoggedIn()
            .catch(() => {
                loginService.setUserLoggedOut();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleDialogClose() {
        setDialogOpen(false);
    }

    function handleCancelDeactivation() {
        setDialogConfirm(false);
        handleDialogClose();
    }

    function handleConfirmDeactivation() {
        setDialogConfirm(true);
        handleDialogClose();
    }

    useEffect(() => {
        if (dialogConfirm) {
            UserService.deleteAccount()
                .then(() => {
                    navigate('/', { state: {deactivateAccount: true} });
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        loginService.setUserLoggedOut();
                    } else {
                        setErrorAlerts([...errorAlerts, err.response.data]);
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogConfirm]);

    return (
        <div className='account-settings-container'>
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className='deactivate-container'>
                        <h3>Account</h3>
                        <h4>Do you want to deactivate account?</h4>
                        <Button
                            className='deactivate-btn'
                            variant='outlined'
                            onClick={() => {setDialogOpen(true)}}
                        >
                            Deactivate
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to deactivate account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={handleCancelDeactivation}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleConfirmDeactivation} autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountSettings;