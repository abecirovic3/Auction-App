// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';
// import { useLocation } from 'react-router-dom';
// import useShopService from 'hooks/useShopService';

const CategorySelector = () => {
    // const shopService = useShopService();
    const categories = useSelector(state => state.category.categories);
    // const filters = useSelector(state => state.productFilters.filters);
    // TODO move error handling to shopService
    // const errorAlerts = useSelector(state => state.shop.errorAlerts);
    // const { state } = useLocation();

    // useEffect(() => {
    //     if (Object.keys(filters.subCategories).length === 0 || state?.categoryId) {
    //         shopService.setInitialCategoryFilters(state?.categoryId ? state.categoryId : null);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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