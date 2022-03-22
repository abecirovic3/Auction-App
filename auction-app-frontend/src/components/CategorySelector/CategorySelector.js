import { Paper, Stack } from '@mui/material';

const CategorySelector = ( { categories }) => {
    return (
        <Stack spacing={1}>
            {
                categories.map(category => (
                    <Paper key={category.id} className='category'>{category.name}</Paper>
                ))
            }
        </Stack>
    );
};

export default CategorySelector;