import { Button, Grid } from '@mui/material';

import 'assets/style/search-suggestion-bar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchSuggestionBar = ({ suggestion }) => {
    const location = useLocation();
    const navigate = useNavigate();

    function setSearchValue() {
        if (location.pathname.includes('/shop')) {
            navigate(`/shop/search/${encodeURI(suggestion)}`, { state: {localSearch: true} });
        } else {
            navigate(`/shop/search/${encodeURI(suggestion)}`);
        }
    }

    return (
        <div className='search-suggestion-container'>
            <div className='search-suggestion-content-container'>
                <Grid
                    container
                    columnSpacing={2}
                    justifyContent='space-around'
                    paddingTop={2}
                    paddingBottom={2}
                >
                    <Grid
                        item
                        xs={2.5}
                    >
                        <span />
                    </Grid>
                    <Grid
                        item
                        xs={9.5}
                    >
                        <h3>Did you mean?</h3>
                        <Button
                            className='suggestion-btn'
                            variant='text'
                            onClick={setSearchValue}
                        >
                            {suggestion}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SearchSuggestionBar;