import { Alert, Collapse, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';

import AlertTheme from 'themes/AlertTheme';
import 'assets/style/custom-alert.scss'

const CustomAlert = ({ color, title, message, showAlertDuration, marginBottom }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (showAlertDuration > 0) {
            const hideAlertTimeout = setTimeout(() => {setShowAlert(false)}, showAlertDuration);
            return () => {
                clearTimeout(hideAlertTimeout);
            }
        }
    }, [showAlertDuration]);

    return (
        <ThemeProvider theme={AlertTheme} >
            <div className='custom-alert-container' style={{marginBottom: marginBottom}}>
                <Collapse in={showAlert}>
                    <Alert
                        icon={false}
                        color={color}
                    >
                        <p className='strong'>{title}</p>
                        <p>{message}</p>
                    </Alert>
                </Collapse>
            </div>
        </ThemeProvider>
    );
};

CustomAlert.defaultProps = {
    color: 'info',
    showAlertDuration: 5000,
    marginBottom: '20px'
}

export default CustomAlert;