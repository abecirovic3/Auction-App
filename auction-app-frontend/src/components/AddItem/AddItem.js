import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import Stepper from 'components/Stepper/Stepper';

import AddBasicInfo from 'components/AddItem/AddBasicInfo/AddBasicInfo';
import AddPriceInfo from 'components/AddItem/AddPriceInfo/AddPriceInfo';
import AddLocationInfo from 'components/AddItem/AddLocationInfo/AddLocationInfo';

import MainTheme from 'themes/MainTheme';
import CategoryService from 'services/CategoryService';
import { setCategories } from 'features/category/categorySlice';

const AddItem = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(response => {
                dispatch(setCategories(response.data));
            })
            .catch(err => {
                console.log(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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