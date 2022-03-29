import { Checkbox, Collapse, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
    setDisableFilters,
    setTopLevelCategories,
    setSubCategories
} from 'features/productFilters/productFiltersSlice';

import plusIcon from 'assets/img/plus.png';
import minusIcon from 'assets/img/minus.png';

import 'assets/style/top-level-category.scss';

const TopLevelCategory = ({ category }) => {
    const disableFilters = useSelector(state => state.productFilters.disableFilters);
    const filters = useSelector(state => state.productFilters.filters);
    const topLevelCategories = useSelector(state => state.productFilters.topLevelCategories)
    const dispatch = useDispatch();

    function handleCheckboxChange(e) {
        dispatch(setDisableFilters(true));
        dispatch(setSubCategories({
            ...filters.subCategories,
            [e.currentTarget.id]: {
                ...filters.subCategories[e.currentTarget.id],
                selected: e.currentTarget.checked
            }
        }));
    }

    function expandCategory() {
        dispatch(setTopLevelCategories({
            ...topLevelCategories,
            [category.id.toString()]: !topLevelCategories[category.id.toString()]
        }));
    }

    return (
        <div className='top-level-category-container'>
            <div className="selector">
                <h3 className='top-level-category-name'>{category.name}</h3>
                <IconButton size='medium' onClick={() => {expandCategory()}}>
                    <img src={topLevelCategories[category.id.toString()] ? minusIcon : plusIcon} alt='toggle'/>
                </IconButton>
            </div>
            <Collapse in={topLevelCategories[category.id.toString()]}>
                <div className='sub-categories-container'>
                    {category.subCategories.map(subCategory => (
                        <div key={subCategory.id} className='sub-category-selector'>
                            <Checkbox
                                id={subCategory.id.toString()}
                                color='primary'
                                checked={
                                    filters.subCategories[subCategory.id.toString()]?.selected ?
                                        filters.subCategories[subCategory.id.toString()].selected :
                                        false
                                }
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