import api from 'services/Api';
import TokenService from 'services/TokenService';

function placeBid(productId, amount) {
    return api.post('/bid',
        {
            product: { id: productId },
            user: { id: TokenService.getUserCredentials().id },
            amount: amount
        });
}

const BiddingService = {
    placeBid
};

export default BiddingService;