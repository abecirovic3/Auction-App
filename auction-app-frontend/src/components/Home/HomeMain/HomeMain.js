import { Grid } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import 'assets/style/home-page-main.scss';
import CategorySelector from 'components/CategorySelector/CategorySelector';

const HomeMain = () => {
    return (
        <StyledEngineProvider injectFirst>
            <div className='home-page-main-container'>
                <div className='home-page-main-content-container'>
                    <Grid
                        container
                        columnSpacing={2}
                        justifyContent='space-around'
                    >
                        <Grid item xs={2.5} >
                            <CategorySelector />
                        </Grid>
                        <Grid item xs={9.5} >
                            <div style={{height: '200px', backgroundColor: 'gray'}}> PRODUCT </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default HomeMain;