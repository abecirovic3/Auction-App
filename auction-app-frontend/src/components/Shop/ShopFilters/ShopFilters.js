import { Stack } from '@mui/material';
import CategorySelector from 'components/CategorySelector/CategorySelector';
import { ThemeProvider } from '@mui/material/styles';
import MainTheme from 'themes/MainTheme';

import 'assets/style/shop-filters.scss';

const ShopFilters = () => {
    return (
        <ThemeProvider theme={MainTheme}>
            <Stack spacing={2} className='shop-filters-container'>
                <CategorySelector />
                <h1>Price filter</h1>
            </Stack>
        </ThemeProvider>
    );
};

export default ShopFilters;