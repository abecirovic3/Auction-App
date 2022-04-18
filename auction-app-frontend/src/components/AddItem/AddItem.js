import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import add from 'date-fns/add';

import CategoryService from 'services/CategoryService';
import ProductService from 'services/ProductService';
import TokenService from 'services/TokenService';
import ImgurService from 'services/ImgurService';
import CountryService from 'services/CountryService';
import useAddItemService from 'hooks/useAddItemService';

import { setAddItemInitial, setImageDeleteInProgress } from 'features/addItem/addItemSlice';

import Stepper from 'components/Stepper/Stepper';
import AddBasicInfo from 'components/AddItem/AddBasicInfo/AddBasicInfo';
import AddPriceInfo from 'components/AddItem/AddPriceInfo/AddPriceInfo';
import AddLocationInfo from 'components/AddItem/AddLocationInfo/AddLocationInfo';
import CustomAlert from 'components/Alert/CustomAlert';

import MainTheme from 'themes/MainTheme';
import 'assets/style/add-item.scss';

const AddItem = () => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

    const [activeStep, setActiveStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addItemService = useAddItemService();

    const name = useSelector(state => state.addItem.name);
    const description = useSelector(state => state.addItem.description);
    const startPrice = useSelector(state => state.addItem.startPrice);
    const startDate = useSelector(state => state.addItem.startDate);
    const endDate = useSelector(state => state.addItem.endDate);
    const subCategory = useSelector(state => state.addItem.subCategory);
    const imageData = useSelector(state => state.addItem.imageData);
    const address = useSelector(state => state.addItem.address);
    const zipCode = useSelector(state => state.addItem.zipCode);
    const city = useSelector(state => state.addItem.city);
    const country = useSelector(state => state.addItem.country);
    const errorAlerts = useSelector(state => state.addItem.errorAlerts);

    useEffect(() => {
        if (userLoggedIn) {
            CategoryService.getAllCategoriesPure()
                .then(response => {
                    setCategories(response.data);
                })
                .catch(err => {
                    addItemService.handleError(err);
                });

            CountryService.getAllCountries()
                .then(response => {
                    setCountries(response.data.map(country => country.name));
                })
                .catch(err => {
                    addItemService.handleError(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userLoggedIn]);

    useEffect(() => {
        return () => {
            dispatch(setAddItemInitial());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function cancel() {
        const PromiseArray = [];
        for (const image of imageData.images) {
            PromiseArray.push(ImgurService.deleteImage(image.delete_hash));
        }

        dispatch(setImageDeleteInProgress(true));

        Promise.all(PromiseArray)
            .then(response => {
                navigate('/account');
            })
            .catch(err => {
                addItemService.handleError(err);
            })
    }

    function next() {
        setActiveStep(activeStep + 1);
    }

    function back() {
        setActiveStep(activeStep - 1);
    }

    function submit() {
        ProductService.postProduct(getProductData())
            .then(response => {
                navigate('/account/seller');
            })
            .catch(err => {
                addItemService.handleError(err);
            });
    }

    function getProductData() {
        return {
            name: name,
            description: description,
            startPrice: Math.round(parseFloat(startPrice) * 100) / 100,
            // use add to offset the UTC time value by 2 hours for correct timezone
            startDate: (add(new Date(startDate), {
                hours: 2
            })).toJSON(),
            endDate: (add(new Date(endDate), {
                hours: 2
            })).toJSON(),
            category: getProductCategory(subCategory),
            images: imageData.images.map(image => {
                return {
                    imageUrl: image.url,
                    deleteHash: image.delete_hash
                }
            }),
            seller: TokenService.getUserCredentials(),
            street: {
                name: address,
                zipcode: zipCode,
                city: {
                    name: city,
                    country: {
                        name: country
                    }
                }
            }
        }
    }

    function getProductCategory(name) {
        for (const c of categories) {
            for (const sc of c.subCategories) {
                if (sc.name === name) {
                    return sc;
                }
            }
        }
        return null;
    }

    if (!userLoggedIn) {
        return <Navigate to={'/login'} state={ { beforeMyAccount: true } } />
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='add-item-container'>
                {
                    errorAlerts.map((alert, i) => (
                        <CustomAlert
                            key={i}
                            color='error'
                            title={alert.error}
                            message={alert.message}
                            showAlertDuration={60000}
                            marginBottom='10px'
                        />
                    ))
                }

                <Stepper step={activeStep} />

                {activeStep === 0 &&
                    <AddBasicInfo categories={categories} cancel={cancel} nextStep={next} />
                }

                {activeStep === 1 &&
                    <AddPriceInfo cancel={cancel} nextStep={next} back={back} />
                }

                {activeStep === 2 &&
                    <AddLocationInfo countries={countries} cancel={cancel} back={back} submit={submit} />
                }
            </div>
        </ThemeProvider>
    );
};

export default AddItem;