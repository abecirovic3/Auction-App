import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';

import CategoryService from 'services/CategoryService';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';

const CategorySelector = () => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className='category-selector-container'>
            <h3 className='filter-title'>PRODUCT CATEGORIES</h3>
            {categories &&
                <Stack spacing={2}>
                    {
                        categories.map(category => (
                            <TopLevelCategory key={category.id} category={category}/>
                        ))
                    }
                </Stack>
            }
        </div>
    );
};

export default CategorySelector;