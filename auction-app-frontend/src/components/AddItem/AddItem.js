import { useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';

import Stepper from 'components/Stepper/Stepper';

import MainTheme from 'themes/MainTheme';
import AddBasicInfo from 'components/AddItem/AddBasicInfo/AddBasicInfo';
import AddPriceInfo from 'components/AddItem/AddPriceInfo/AddPriceInfo';
import AddLocationInfo from 'components/AddItem/AddLocationInfo/AddLocationInfo';

const AddItem = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <ThemeProvider theme={MainTheme}>
            <div style={{
                width: '60%',
                margin: 'auto'
            }}>
                <Stepper step={activeStep} />

                {activeStep === 0 &&
                    <AddBasicInfo />
                }

                {activeStep === 1 &&
                    <AddPriceInfo />
                }

                {activeStep === 2 &&
                    <AddLocationInfo />
                }

                <div className='form-navigation'>
                    <Button variant='outlined'>
                        Cancel
                    </Button>
                    <div>
                        {activeStep >= 1 &&
                            <Button variant='outlined' onClick={() => setActiveStep(activeStep - 1)}>
                                Back
                            </Button>
                        }
                        <Button variant='contained' onClick={() => setActiveStep(activeStep + 1)}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AddItem;