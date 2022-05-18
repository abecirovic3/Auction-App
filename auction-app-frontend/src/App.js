import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setLoggedIn } from 'features/login/loginSlice';

import AuthService from 'services/AuthService';
import TokenService from 'services/TokenService';

import Home from 'components/Home/Home';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import ForgotPassword from 'components/ForgotPassword/ForgotPassword';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import PrivacyAndPolicy from 'components/PricacyAndPolicy/PrivacyAndPolicy';
import TermsAndConditions from 'components/TermsAndConditions/TermsAndConditions';
import About from 'components/About/About';
import NotFound from 'components/NotFound/NotFound';
import ProductOverview from 'components/ProductOverview/ProductOverview';
import Shop from 'components/Shop/Shop';
import UserAccount from 'components/UserAccount/UserAccount';
import AddItem from 'components/AddItem/AddItem';
import RouteHistory from 'components/RouteHistory/RouteHistory';
import AccountSeller from 'components/UserAccount/AccountSeller/AccountSeller';
import AccountBids from 'components/UserAccount/AccountBids/AccountBids';
import AccountSettings from 'components/UserAccount/AccountSettings/AccountSettings';
import AccountWishlist from 'components/UserAccount/AccountWishlist/AccountWishlist';
import AccountProfile from 'components/UserAccount/AccountProfile/AccountProfile';
import StripeOnboardingRefresh from 'components/Stripe/OnboardingRefresh/StripeOnboardingRefresh';
import StripeOnboardingReturn from 'components/Stripe/OnboardingReturn/StripeOnboardingReturn';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!TokenService.getUserCredentials()) {
            dispatch(setLoggedIn(false));
        } else {
            AuthService.validateToken()
                .then(response => {
                    dispatch(setLoggedIn(true));
                })
                .catch(err => {
                    TokenService.removeUser();
                    dispatch(setLoggedIn(false));
                })
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <RouteHistory />
            <Navbar/>
            <div className='main-page-container'>
                <div className='main-page-content-container'>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/forgot-password' element={<ForgotPassword/>}/>
                        <Route path='/privacy' element={<PrivacyAndPolicy/>}/>
                        <Route path='/terms' element={<TermsAndConditions/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/shop' element={<Shop />} />
                        <Route path='/shop/product-overview/:id' element={<ProductOverview />}/>
                        <Route path='/shop/search/:search' element={<Shop />}/>
                        <Route path='/account' element={<UserAccount />}>
                            <Route path='profile' element={<AccountProfile />} />
                            <Route path='seller' element={<AccountSeller />} />
                            <Route path='bids' element={<AccountBids />} />
                            <Route path='wishlist' element={<AccountWishlist />} />
                            <Route path='settings' element={<AccountSettings />} />
                        </Route>
                        <Route path='/account/add-item' element={<AddItem />} />
                        <Route path='/stripe-onboarding-refresh' element={<StripeOnboardingRefresh />} />
                        <Route path='/stripe-onboarding-return' element={<StripeOnboardingReturn />} />
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
