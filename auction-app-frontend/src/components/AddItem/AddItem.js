import { useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';

import Stepper from 'components/Stepper/Stepper';

import MainTheme from 'themes/MainTheme';
import AddBasicInfo from 'components/AddItem/AddBasicInfo/AddBasicInfo';
import AddPriceInfo from 'components/AddItem/AddPriceInfo/AddPriceInfo';
import AddLocationInfo from 'components/AddItem/AddLocationInfo/AddLocationInfo';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    function cancel() {
        navigate('/account');
    }

    function next() {
        setActiveStep(activeStep + 1);
    }

    function back() {
        setActiveStep(activeStep - 1);
    }

    function submit() {
        // temporary
        navigate('/account/seller');
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div style={{
                width: '60%',
                margin: 'auto'
            }}>
                <Stepper step={activeStep} />

                {activeStep === 0 &&
                    <AddBasicInfo cancel={cancel} nextStep={next} />
                }

                {activeStep === 1 &&
                    <AddPriceInfo cancel={cancel} nextStep={next} back={back} />
                }

                {activeStep === 2 &&
                    <AddLocationInfo cancel={cancel} back={back} submit={submit} />
                }
            </div>
        </ThemeProvider>
    );
};

export default AddItem;