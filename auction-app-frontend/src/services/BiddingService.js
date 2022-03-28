import api from 'services/Api';

function placeBid(bid) {
    return api.post('/bid', bid);
}

const BiddingService = {
    placeBid
};

export default BiddingService;