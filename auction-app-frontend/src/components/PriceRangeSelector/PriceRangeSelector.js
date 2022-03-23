import { useState } from 'react';
import { Slider } from '@mui/material';

const PriceRangeSelector = () => {
    const [price, setPrice] = useState([30, 50]);

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };

    return (
        <div className='price-range-selector-container'>
            <h3 className='filter-title'>Price Range</h3>
            <div className='price-range-labels-container'>
                <div className='label-container'>
                    <h3 className='price-label'>${price[0]}</h3>
                </div>
                <h3 className='spacer'>-</h3>
                <div className='label-container'>
                    <h3 className='price-label'>+${price[1]}</h3>
                </div>
            </div>
            <Slider
                min={30}
                max={500}
                value={price}
                onChange={handleChange}
                disableSwap={true}
            />
        </div>
    );
};

export default PriceRangeSelector;