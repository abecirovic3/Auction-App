import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Stepper from 'components/Stepper/Stepper';

import AddBasicInfo from 'components/AddItem/AddBasicInfo/AddBasicInfo';
import AddPriceInfo from 'components/AddItem/AddPriceInfo/AddPriceInfo';
import AddLocationInfo from 'components/AddItem/AddLocationInfo/AddLocationInfo';

import MainTheme from 'themes/MainTheme';
import CategoryService from 'services/CategoryService';
import ProductService from 'services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import TokenService from 'services/TokenService';
import { setAddItemInitial, setImageDeleteInProgress } from 'features/addItem/addItemSlice';
import ImgurService from 'services/ImgurService';
import CountryService from 'services/CountryService';

const AddItem = () => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const [activeStep, setActiveStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    useEffect(() => {
        if (userLoggedIn) {
            CategoryService.getAllCategoriesPure()
                .then(response => {
                    setCategories(response.data);
                })
                .catch(err => {
                    console.log(err);
                });

            CountryService.getAllCountries()
                .then(response => {
                    setCountries(response.data.map(country => country.name));
                })
                .catch(err => {
                    console.log(err);
                })
        }
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
                console.log(response);
                navigate('/account');
            })
            .catch(err => {
                console.log(err);
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
                console.log(response);
                navigate('/account/seller');
            })
            .catch(err => {
                console.log(err);
            })
    }

    function getProductData() {
        return {
            name: name,
            description: description,
            startPrice: Math.round(parseFloat(startPrice) * 100) / 100,
            startDate: (new Date(startDate)).toJSON(),
            endDate: (new Date(endDate)).toJSON(),
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
            <div style={{
                width: '60%',
                margin: 'auto'
            }}>
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