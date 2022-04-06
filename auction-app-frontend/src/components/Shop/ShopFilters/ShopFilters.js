import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import CategorySelector from 'components/CategorySelector/CategorySelector';
import PriceRangeSelector from 'components/PriceRangeSelector/PriceRangeSelector';

import MainTheme from 'themes/MainTheme';
import 'assets/style/shop-filters.scss';

const ShopFilters = () => {
    return (
        <ThemeProvider theme={MainTheme}>
            <Stack spacing={4} className='shop-filters-container'>
                <CategorySelector />
                <PriceRangeSelector />
            </Stack>
        </ThemeProvider>
    );
};

export default ShopFilters;