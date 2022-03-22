import { useState } from 'react';
import { Checkbox, Collapse, IconButton } from '@mui/material';

import plusIcon from 'assets/img/plus.png';
import minusIcon from 'assets/img/minus.png';

import 'assets/style/top-level-category.scss';

const TopLevelCategory = ({ category }) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className='top-level-category-container'>
            <div className="selector">
                <h3 className='top-level-category-name'>{category.name}</h3>
                <IconButton size='medium' onClick={() => {setExpand(!expand)}}>
                    <img src={expand ? minusIcon : plusIcon} alt='toggle'/>
                </IconButton>
            </div>
            <Collapse in={expand}>
                <div className='sub-categories-container'>
                    {category.subCategories.map(subCategory => (
                        <div className='sub-category-selector'>
                            <Checkbox color='primary' />
                            <h3 className='sub-category-name'>{subCategory.name}{` (${subCategory.numberOfProducts})`}</h3>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    );
};

export default TopLevelCategory;