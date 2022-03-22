import { Stack } from '@mui/material';

import TopLevelCategory from 'components/CategorySelector/TopLevelCategory/TopLevelCategory';

const CategorySelector = () => {
    const categories = [
        {
            id: 1,
            subCategories: [
                {
                    id: 5,
                    subCategories: null,
                    name: "Shoes",
                    numberOfProducts: 1
                },
                {
                    id: 6,
                    subCategories: null,
                    name: "Jewellery",
                    numberOfProducts: 1
                }
            ],
            name: "Women",
            numberOfProducts: null
        },
        {
            id: 2,
            subCategories: [
                {
                    id: 7,
                    subCategories: null,
                    name: "Keyboards",
                    numberOfProducts: 2
                },
                {
                    id: 8,
                    subCategories: null,
                    name: "Monitors",
                    numberOfProducts: 1
                },
                {
                    id: 9,
                    subCategories: null,
                    name: "CPU",
                    numberOfProducts: 1
                },
                {
                    id: 10,
                    subCategories: null,
                    name: "Mobile Phones",
                    numberOfProducts: 1
                }
            ],
            name: "Technology",
            numberOfProducts: null
        },
        {
            id: 3,
            subCategories: [
                {
                    id: 11,
                    subCategories: null,
                    name: "Blankets",
                    numberOfProducts: 1
                }
            ],
            name: "Kids",
            numberOfProducts: null
        },
        {
            id: 4,
            subCategories: [
                {
                    id: 12,
                    subCategories: null,
                    name: "Chainsaws",
                    numberOfProducts: 1
                }
            ],
            name: "Tools",
            numberOfProducts: null
        }
    ];
    return (
        <div className='category-selector-container'>
            <h3 className='product-categories-title'>PRODUCT CATEGORIES</h3>
            <Stack spacing={2}>
                {
                    categories.map(category => (
                        <TopLevelCategory key={category.id} category={category}/>
                    ))
                }
            </Stack>
        </div>
    );
};

export default CategorySelector;