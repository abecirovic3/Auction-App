import { useDispatch, useSelector } from 'react-redux';
import { setErrorAlerts } from 'features/addItem/addItemSlice';
import useLoginService from 'hooks/useLoginService';

function useAddItemService() {
    const dispatch = useDispatch();
    const loginService = useLoginService();
    const errorAlerts = useSelector(state => state.addItem.errorAlerts);

    const properties = [
        'name',
        'description',
        'startPrice',
        'startDate',
        'endDate',
        'category',
        'seller',
        'street',
        'street.name',
        'street.zipcode',
        'street.city',
        'street.city.name',
        'street.city.country',
        'street.city.country.name'
    ];


    function handleError(err) {
        if (err.response.status === 403 && !err.response.data) {
            loginService.reinitiateLogin();
        } else if (err.response.status === 403) {
            dispatch(setErrorAlerts([
                ...errorAlerts,
                {
                    error: 'Imgur Error',
                    message: err.response.data.error
                }
            ]));
        } else if (isFieldsError(err.response.data)) {
            const errObj = err.response.data;
            const errors = [];
            for (const key in errObj) {
                errors.push({
                   error: key,
                   message: errObj[key]
                });
            }
            dispatch(setErrorAlerts([...errorAlerts, ...errors]));
        } else if (err.response.data) {
            dispatch(setErrorAlerts([
                ...errorAlerts,
                err.response.data
            ]));
        } else {
            dispatch(setErrorAlerts([
                ...errorAlerts,
                {
                    error: 'Connection Error',
                    message: 'Could not establish connection to server'
                }
            ]));
        }
    }

    function isFieldsError(errData) {
        for (const property of properties) {
            if (property in errData) {
                return true;
            }
        }

        return false;
    }

    return {
        handleError
    }
}

export default useAddItemService;