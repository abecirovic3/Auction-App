import api from 'services/Api';
import TokenService from 'services/TokenService';

function addPaymentInfo() {
    return api.post(`/payment/create-account-link/${TokenService.getUserCredentials().id}`);
}

function isOnboardingComplete() {
    return api.get(`/payment/onboarding-process-complete/${TokenService.getUserCredentials().id}`);
}

const PaymentService = {
    addPaymentInfo,
    isOnboardingComplete,
};

export default PaymentService;