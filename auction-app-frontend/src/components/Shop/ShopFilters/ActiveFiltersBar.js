import { IconButton } from '@mui/material';
import removeFilter from 'assets/img/x.png';

import 'assets/style/active-filters-bar.scss';
import { useSelector } from 'react-redux';

const ActiveFiltersBar = () => {
    const filters = useSelector(state => state.productFilters.filters);

    return (
        <div className='active-filters-container'>
            <div>
                <h5 className='filter-type'>Category</h5>
                <div className='filter-names-container'>
                    {Object.keys(filters.subCategories).map(subCategoryId => (
                        filters.subCategories[subCategoryId].selected &&
                        <div key={subCategoryId}>
                            <h5 className='filter-name'>
                                {filters.subCategories[subCategoryId].parentCategoryName}
                                /{filters.subCategories[subCategoryId].name}</h5>
                            <IconButton>
                                <img src={removeFilter} alt='remove'/>
                            </IconButton>
                        </div>
                    ))}
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