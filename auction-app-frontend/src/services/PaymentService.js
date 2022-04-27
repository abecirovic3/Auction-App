import api from 'services/Api';
import TokenService from 'services/TokenService';

function addPaymentInfo() {
    return api.post(`/payment/create-account-link/${TokenService.getUserCredentials().id}`);
}

const PaymentService = {
    addPaymentInfo,
};

export default PaymentService;