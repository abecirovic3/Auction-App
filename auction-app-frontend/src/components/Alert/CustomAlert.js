import { Alert, Collapse, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';

import AlertTheme from 'themes/AlertTheme';
import 'assets/style/custom-alert.scss'

const CustomAlert = ({ color, title, message, showAlertDuration }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (showAlertDuration > 0) {
            console.log("Usao u postavke alerta");
            const hideAlertTimeout = setTimeout(() => {setShowAlert(false)}, showAlertDuration);
            return () => {
                clearTimeout(hideAlertTimeout);
            }
        }
    }, [showAlertDuration]);

    return (
        <ThemeProvider theme={AlertTheme} >
            <div className='custom-alert-container'>
                <Collapse in={showAlert}>
                    <Alert
                        icon={false}
                        color={color}
                    >
                        <p className='strong'>{title} &nbsp; </p>
                        <p>{message}</p>
                    </Alert>
                </Collapse>
            </div>
        </ThemeProvider>
    );
};

CustomAlert.defaultProps = {
    color: 'info',
    showAlertDuration: 5000
}

export default CustomAlert;