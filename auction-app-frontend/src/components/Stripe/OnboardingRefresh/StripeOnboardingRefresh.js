import { useEffect } from 'react';

import useLoginService from 'hooks/useLoginService';
import PaymentService from 'services/PaymentService';

import 'assets/style/stripe-style.scss';

const StripeOnboardingRefresh = () => {
    const loginService = useLoginService();

    useEffect(() => {
        loginService.isUserLoggedIn()
            .then(() => {
                PaymentService.addPaymentInfo()
                    .then(response => {
                        window.open(response.data.url, '_self');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(() => {
                loginService.reinitiateLogin();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='stripe-page-container'>
            <h2>Redirecting back to Stripe...</h2>
        </div>
    );
};

export default StripeOnboardingRefresh