import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';

const CategorySelector = () => {
    const categories = useSelector(state => state.category.categories);

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