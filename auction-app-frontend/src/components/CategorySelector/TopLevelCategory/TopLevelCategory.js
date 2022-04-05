import { Checkbox, Collapse, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import useShopService from 'hooks/useShopService';

import plusIcon from 'assets/img/plus.png';
import minusIcon from 'assets/img/minus.png';

import 'assets/style/top-level-category.scss';

const TopLevelCategory = ({ category }) => {
    const disableFilters = useSelector(state => state.productFilters.disableFilters);
    const filters = useSelector(state => state.productFilters.filters);
    const topLevelCategories = useSelector(state => state.productFilters.topLevelCategories);
    const shopService = useShopService();

    function handleCheckboxChange(e) {
        shopService.setSubCategoryFilter(e.currentTarget.id, e.currentTarget.checked);
    }

    function expandCategory() {
        shopService.flipTopLevelCategoryFilterValue(category.id);
    }

    function isSubCategoryChecked(subCategoryId) {
        return filters.subCategories[subCategoryId.toString()]?.selected ?
            filters.subCategories[subCategoryId.toString()].selected : false
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
                                checked={isSubCategoryChecked(subCategory.id)}
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