import { IconButton } from '@mui/material';
import removeFilter from 'assets/img/x.png';

import 'assets/style/active-filters-bar.scss';

const ActiveFiltersBar = () => {
    return (
        <div className='active-filters-container'>
            <div>
                <h5 className='filter-type'>Filter Type</h5>
                <div className='filter-names-container'>
                    <div>
                        <h5 className='filter-name'>Filter name</h5>
                        <IconButton>
                            <img src={removeFilter} alt='remove'/>
                        </IconButton>
                    </div>
                    <div>
                        <h5 className='filter-name'>Filter name</h5>
                        <IconButton>
                            <img src={removeFilter} alt='remove'/>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='filter-box'>
                <div>
                    <h5>Clear All</h5>
                    <IconButton>
                        <img src={removeFilter} alt='remove'/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ActiveFiltersBar;