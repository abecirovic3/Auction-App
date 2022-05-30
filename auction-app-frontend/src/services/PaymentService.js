import api from 'services/Api';
import TokenService from 'services/TokenService';

function addPaymentInfo() {
    return api.post(`/payment/create-account-link/${TokenService.getUserCredentials().id}`);
}

function isOnboardingComplete() {
    return api.get(`/payment/onboarding-process-complete/${TokenService.getUserCredentials().id}`);
}

function initiatePayment(data) {
    return api.post(`/payment/create-checkout-session`, data);
}

function getPaymentSessionStatus(sessionId) {
    return api.get(`payment/session-status/${sessionId}`);
}

const PaymentService = {
    addPaymentInfo,
    isOnboardingComplete,
    initiatePayment,
    getPaymentSessionStatus
};

export default PaymentService;