import { useState, useEffect, useRef } from 'react';
import { InputAdornment, Slider, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
    setPriceRange
} from 'features/productFilters/productFiltersSlice';

import ProductPriceRangeService from 'services/ProductPriceRangeService';

const PriceRangeSelector = () => {
    const isInitialMount = useRef(true);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [minPriceField, setMinPriceField] = useState('');
    const [maxPriceField, setMaxPriceField] = useState('');
    const [priceSlider, setPriceSlider] = useState([0, 0]);
    const disableFilters = useSelector(state => state.productFilters.disableFilters);
    const filters = useSelector(state => state.productFilters.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        ProductPriceRangeService.getPriceRange()
            .then(response => {
                const min = response.data.min;
                const max = response.data.max;
                setMinMaxPrice([min, max]);
                setPriceSlider([min, max]);
                setMinPriceField(min);
                setMaxPriceField(max);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (filters.minPrice === null && filters.maxPrice === null) {
                setPriceSlider([minMaxPrice[0], minMaxPrice[1]]);
                setMinPriceField(minMaxPrice[0].toString());
                setMaxPriceField(minMaxPrice[1].toString());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.minPrice, filters.maxPrice]);

    function handleSliderChange(event, newValue) {
        setPriceSlider(newValue);
        setMaxPriceField(newValue[1].toString());
        setMinPriceField(newValue[0].toString());
    }

    function handleChangeCommitted() {
        const min = priceSlider[0] === minMaxPrice[0] ? null : priceSlider[0];
        const max = priceSlider[1] === minMaxPrice[1] ? null : priceSlider[1];

        if (min !== filters.minPrice || max !== filters.maxPrice) {
            if (min == null && max == null) {
                dispatch(setPriceRange([min, max]));
            } else {
                dispatch(setPriceRange([priceSlider[0], priceSlider[1]]));
            }
        }
    }

    function handleFieldChange(e) {
        if (e.target.id === 'minPriceInput') {
            setMinPriceField(e.target.value);
        }
        else if (e.target.id === 'maxPriceInput') {
            setMaxPriceField(e.target.value);
        }
    }

    function handleFieldSubmit(e) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            const newValue = [];

            if (e.target.id === 'minPriceInput') {
                newValue.push(value, priceSlider[1]);
            }
            else if (e.target.id === 'maxPriceInput') {
                newValue.push(priceSlider[0], value);
            }

            const min = newValue[0] === minMaxPrice[0] ? null : priceSlider[0];
            const max = newValue[1] === minMaxPrice[1] ? null : priceSlider[1];

            if (min !== filters.minPrice || max !== filters.maxPrice) {
                if (min == null && max == null) {
                    dispatch(setPriceRange([min, max]));
                } else {
                    dispatch(setPriceRange([newValue[0], newValue[1]]));
                }
                setPriceSlider(newValue);
            }
        } else {
            setMinPriceField(priceSlider[0].toString());
            setMaxPriceField(priceSlider[1].toString());
        }
    }

    return (
        <div className='price-range-selector-container'>
            <h3 className='filter-title'>Price Range</h3>
            <div className='price-range-labels-container'>
                <TextField
                    id='minPriceInput'
                    className='label-input'
                    disabled={disableFilters}
                    variant='outlined'
                    value={minPriceField}
                    onChange={e => {handleFieldChange(e)}}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleFieldSubmit(e)
                        }
                    }}
                    onBlur={e => {handleFieldSubmit(e)}}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                    }}
                />
                <h3 className='spacer'>-</h3>
                <TextField
                    id='maxPriceInput'
                    className='label-input'
                    disabled={disableFilters}
                    variant='outlined'
                    value={maxPriceField}
                    onChange={e => {handleFieldChange(e)}}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleFieldSubmit(e)
                        }
                    }}
                    onBlur={e => {handleFieldSubmit(e)}}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>+$</InputAdornment>,
                    }}
                />
            </div>
            <Slider
                disabled={disableFilters}
                min={minMaxPrice[0]}
                max={minMaxPrice[1]}
                value={priceSlider}
                onChange={handleSliderChange}
                onChangeCommitted={() => {handleChangeCommitted()}}
                disableSwap={true}
            />
        </div>
    );
};

export default PriceRangeSelector;