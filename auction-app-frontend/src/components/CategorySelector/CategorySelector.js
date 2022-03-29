import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/material';

import { setErrorAlerts } from 'features/shop/shopSlice';

import CategoryService from 'services/CategoryService';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';
import { setSubCategories, setTopLevelCategories } from 'features/productFilters/productFiltersSlice';

const CategorySelector = () => {
    const [categories, setCategories] = useState([]);
    const errorAlerts = useSelector(state => state.shop.errorAlerts);
    const filters = useSelector(state => state.productFilters.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data);
                if (Object.keys(filters.subCategories).length === 0) {
                    const tlc = {};
                    const sc = {};
                    for (let category of response.data) {
                        tlc[category.id.toString()] = false;
                        for (let subCategory of category.subCategories) {
                            sc[subCategory.id.toString()] = {
                                name: subCategory.name,
                                parentCategoryName: category.name,
                                selected: false
                            };
                        }
                    }
                    dispatch(setTopLevelCategories(tlc));
                    dispatch(setSubCategories(sc));
                }
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