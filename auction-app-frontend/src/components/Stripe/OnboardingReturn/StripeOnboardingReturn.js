import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useLoginService from 'hooks/useLoginService';
import PaymentService from 'services/PaymentService';
import StripeService from 'services/StripeService';

import CreditCardIcon from '@mui/icons-material/CreditCard';

import MainTheme from 'themes/MainTheme';
import 'assets/style/stripe-style.scss';

const StripeOnboardingReturn = () => {
  const loginService = useLoginService();
  const [onboardingInfo, setOnboardingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loginService.isUserLoggedIn()
        .then(() => {
          PaymentService.isOnboardingComplete()
              .then(response => {
                setOnboardingInfo(response.data);
                if (response.data['details-submitted']) {
                    StripeService.setStripeOnboardingFlag(true);
                } else {
                    StripeService.setStripeOnboardingFlag(false);
                }
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

    function addPaymentInfo() {
        loginService.isUserLoggedIn()
            .then(() => {
                setLoading(true);
                PaymentService.addPaymentInfo()
                    .then(response => {
                        setLoading(false);
                        window.open(response.data.url, '_self');
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    });
            })
            .catch(() => {
                loginService.reinitiateLogin();
            });
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='stripe-page-container'>
                {(onboardingInfo && onboardingInfo['details-submitted']) &&
                    <>
                        <h2>You are all set</h2>
                        <h3>You can close this window</h3>
                    </>
                }
                {(onboardingInfo && !onboardingInfo['details-submitted']) &&
                    <>
                        <h2>You haven't provided all the necessary payment information</h2>
                        <h3>You won't be able to publish your product until you enter all required info</h3>
                        <LoadingButton
                            variant='contained'
                            startIcon={<CreditCardIcon />}
                            onClick={addPaymentInfo}
                            loading={loading}
                            loadingPosition='start'
                        >
                            Add Missing Info
                        </LoadingButton>
                    </>
                }
            </div>
        </ThemeProvider>
  );
};

export default StripeOnboardingReturn;