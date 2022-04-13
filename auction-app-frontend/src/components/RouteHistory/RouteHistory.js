import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLastRoute } from 'features/routeHistory/routeHistorySlice';

const RouteHistory = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const routeHistory = useSelector(state => state.routeHistory.routes);

    useEffect(() => {
        dispatch(setLastRoute([routeHistory[1], location.pathname]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, dispatch]);

    return (
        <></>
    );
};

export default RouteHistory;