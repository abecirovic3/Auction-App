import api from 'services/Api';

function getAllCountries() {
    return api.get('/countries');
}

const CountryService = {
    getAllCountries
};

export default CountryService;