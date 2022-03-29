import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

import { setSubCategories, setMinPrice, setMaxPrice, setFilters } from 'features/productFilters/productFiltersSlice';

import removeFilter from 'assets/img/x.png';

import 'assets/style/active-filters-bar.scss';

const ActiveFiltersBar = () => {
    const filters = useSelector(state => state.productFilters.filters);
    const dispatch = useDispatch();

    function showCategoryFilterContainer() {
        for (const subCategoryId in filters.subCategories) {
            if (filters.subCategories[subCategoryId].selected) {
                return true
            }
        }
        return false;
    }

    function removeCategoryFilter(subCategoryId) {
        dispatch(setSubCategories({
            ...filters.subCategories,
            [subCategoryId]: {
                ...filters.subCategories[subCategoryId],
                selected: false
            }
        }));
    }

    function removePriceRangeFilter() {
        dispatch(setMinPrice(null));
        dispatch(setMaxPrice(null));
    }

    function removeAllFilters() {
        const clearedCategoryFilters = {};
        for (const categoryId in filters.subCategories) {
            clearedCategoryFilters[categoryId] = {
                name: filters.subCategories[categoryId].name,
                parentCategoryName: filters.subCategories[categoryId].parentCategoryName,
                selected: false
            }
        }
        dispatch(setFilters({
            minPrice: null,
            maxPrice: null,
            subCategories: clearedCategoryFilters,
            search: null
        }));
    }

    return (
        <div className='active-filters-container'>
            {showCategoryFilterContainer() &&
                <div>
                    <h5 className='filter-type'>Category</h5>
                    <div className='filter-names-container'>
                        {Object.keys(filters.subCategories).map(subCategoryId => (
                            filters.subCategories[subCategoryId].selected &&
                            <div key={subCategoryId}>
                                <h5 className='filter-name'>
                                    {filters.subCategories[subCategoryId].parentCategoryName}
                                    /{filters.subCategories[subCategoryId].name}</h5>
                                <IconButton onClick={() => {removeCategoryFilter(subCategoryId)}}>
                                    <img src={removeFilter} alt='remove'/>
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {(filters.minPrice != null && filters.maxPrice != null) &&
                <div>
                    <h5 className='filter-type'>Price range</h5>
                    <div>
                        <h5 className='filter-name'>${filters.minPrice}-${filters.maxPrice}</h5>
                        <IconButton onClick={() => {removePriceRangeFilter()}}>
                            <img src={removeFilter} alt='remove'/>
                        </IconButton>
                    </div>
                </div>
            }
            <div className='filter-box'>
                <div>
                    <h5>Clear All</h5>
                    <IconButton onClick={() => {removeAllFilters()}}>
                        <img src={removeFilter} alt='remove'/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ActiveFiltersBar;