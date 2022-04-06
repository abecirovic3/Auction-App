import { useState } from 'react';
import { ThemeProvider } from '@mui/material';

import Stepper from 'components/Stepper/Stepper';

import MainTheme from 'themes/MainTheme';

const AddItem = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <ThemeProvider theme={MainTheme}>
            <div style={{
                width: '60%',
                margin: 'auto'
            }}>
                <Stepper step={activeStep} />
                <h1>Add Item</h1>
            </div>
        </ThemeProvider>
    );
};

export default AddItem;