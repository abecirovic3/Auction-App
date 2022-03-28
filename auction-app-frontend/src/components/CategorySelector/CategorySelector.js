import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/material';

import { setErrorAlerts } from 'features/shop/shopSlice';

import CategoryService from 'services/CategoryService';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';

const CategorySelector = () => {
    const [categories, setCategories] = useState([]);
    const errorAlerts = useSelector(state => state.shop.errorAlerts);
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                dispatch(setErrorAlerts([
                    ...errorAlerts,
                    err.response?.data ||
                    {
                        error: 'Connection Error',
                        message: 'Could not establish connection to server'
                    }
                ]));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='category-selector-container'>
            <h3 className='filter-title'>PRODUCT CATEGORIES</h3>
            <Stack spacing={2}>
                {
                    categories.map(category => (
                        <TopLevelCategory
                            key={category.id}
                            category={category}
                        />
                    ))
                }
            </Stack>
        </div>
    );
};

export default CategorySelector;