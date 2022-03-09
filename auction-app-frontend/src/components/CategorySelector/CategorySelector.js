import { Paper, Stack } from '@mui/material';

const CategorySelector = () => {
    return (
        <Stack spacing={1}>
            <h3 style={{color: '#8367D8'}}>Categories</h3>
            <Paper style={{padding: '5px', borderRadius: 0}}>Category 1</Paper>
            <Paper style={{padding: '5px', borderRadius: 0}}>Category 1</Paper>
            <Paper style={{padding: '5px', borderRadius: 0}}>Category 1</Paper>
            <Paper style={{padding: '5px', borderRadius: 0}}>Category 1</Paper>
        </Stack>
    );
};

export default CategorySelector;