import { Stack } from '@mui/material';
import CategorySelector from 'components/CategorySelector/CategorySelector';

const ShopFilters = () => {
    const categories = [
        { id: 1, name: 'Fashion'},
        { id: 2, name: 'Accesories'},
        { id: 3, name: 'Jewlery'},
        { id: 4, name: 'Shoes'},
        { id: 5, name: 'Sportware'},
        { id: 6, name: 'Home'},
        { id: 7, name: 'Electronics'},
        { id: 8, name: 'Mobile'},
        { id: 9, name: 'Computer'},
        { id: 10, name: 'All Categories'},
    ];

    return (
        <Stack spacing={2}>
            <CategorySelector categories={categories} />
            <h1>Price filter</h1>
        </Stack>
    );
};

export default ShopFilters;