import { useState } from 'react';
import { Checkbox, Collapse, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setDisableFilters, setTopLevelCategories, setSubCategories } from 'features/productFilters/productFiltersSlice';

import plusIcon from 'assets/img/plus.png';
import minusIcon from 'assets/img/minus.png';

import 'assets/style/top-level-category.scss';

const TopLevelCategory = ({ category }) => {
    const [expand, setExpand] = useState(false);
    const disableFilters = useSelector(state => state.productFilters.disableFilters);
    const filters = useSelector(state => state.productFilters.filters);
    const dispatch = useDispatch();

    function handleCheckboxChange(e) {
        console.log("Change");
        // dispatch(setDisableFilters(true));
        // const categoryId = parseInt(e.currentTarget.id);
        //
        // if (!e.currentTarget.checked) {
        //     let categoryIds = filters.categories.filter(id => id !== categoryId);
        //     dispatch(setFilters({...filters, categories: categoryIds}));
        // } else {
        //     dispatch(setFilters({...filters, categories: [...filters.categories, categoryId]}));
        // }
    }

    return (
        <div className='top-level-category-container'>
            <div className="selector">
                <h3 className='top-level-category-name'>{category.name}</h3>
                <IconButton size='medium' onClick={() => {dispatch(setTopLevelCategories({...filters.topLevelCategories, [category.id.toString()]: !filters.topLevelCategories[category.id.toString()]}))}}>
                    <img src={filters.topLevelCategories[category.id.toString()] ? minusIcon : plusIcon} alt='toggle'/>
                </IconButton>
            </div>
            <Collapse in={filters.topLevelCategories[category.id.toString()]}>
                <div className='sub-categories-container'>
                    {category.subCategories.map(subCategory => (
                        <div key={subCategory.id} className='sub-category-selector'>
                            <Checkbox
                                id={subCategory.id.toString()}
                                color='primary'
                                defaultChecked={filters.subCategories[subCategory.id.toString()]}
                                disabled={disableFilters}
                                onChange={e => {handleCheckboxChange(e)}}
                            />
                            <h3 className='sub-category-name'>{subCategory.name}{` (${subCategory.numberOfProducts})`}</h3>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    );
};

export default TopLevelCategory;