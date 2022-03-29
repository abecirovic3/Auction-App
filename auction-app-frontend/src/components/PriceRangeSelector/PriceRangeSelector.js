import { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
    setDisableFilters,
    setPriceRange
} from 'features/productFilters/productFiltersSlice';

import ProductPriceRangeService from 'services/ProductPriceRangeService';

const PriceRangeSelector = () => {
    const [priceRangeFilter, setPriceRangeFilter] = useState([0, 0]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const dispatch = useDispatch();

    useEffect(() => {
        ProductPriceRangeService.getPriceRange()
            .then(response => {
                setMinMaxPrice([response.data.min, response.data.max]);
                setPriceRangeFilter([response.data.min, response.data.max]);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);


    function handleChange(event, newValue) {
        setPriceRangeFilter(newValue);
    }

    function handleChangeCommitted() {
        dispatch(setDisableFilters(true));
        dispatch(setPriceRange(priceRangeFilter));
    }

    return (
        <div className='price-range-selector-container'>
            <h3 className='filter-title'>Price Range</h3>
            <div className='price-range-labels-container'>
                <div className='label-container'>
                    <h3 className='price-label'>${priceRangeFilter[0]}</h3>
                </div>
                <h3 className='spacer'>-</h3>
                <div className='label-container'>
                    <h3 className='price-label'>+${priceRangeFilter[1]}</h3>
                </div>
            </div>
            <Slider
                min={minMaxPrice[0]}
                max={minMaxPrice[1]}
                value={priceRangeFilter}
                onChange={handleChange}
                onChangeCommitted={() => {handleChangeCommitted()}}
                disableSwap={true}
            />
        </div>
    );
};

export default PriceRangeSelector;