import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Stack, TextField, ThemeProvider } from '@mui/material';

import TokenService from 'services/TokenService';
import BiddingService from 'services/BiddingService';

import bidNowIcon from 'assets/img/bid-now.svg';

import MainTheme from 'themes/MainTheme';
import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = ({ productData, placeBid }) => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const [bidAmount, setBidAmount] = useState('');
    const [bidValueError, setBidValueError] = useState(false);
    // const [bidAlert, setBidAlert] = useState(null);

    function validateBid() {
        if (isNaN(parseFloat(bidAmount))) {
            setBidValueError(true);
            return false;
        } else {
            setBidValueError(false);
            return true;
        }
    }

    function handlePlaceBid() {
        if (validateBid()) {
            setBidAmount(parseFloat(bidAmount).toString());
            placeBid(productData.product.id, parseFloat(bidAmount));
            // BiddingService.placeBid(productData.product.id, parseFloat(bidAmount))
            //     .then(response => {
            //         console.log(response);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='product-overview-info-container'>
                <Stack gap={4} >
                    <Stack gap={2} >
                        <h3 className='product-name'>{productData.product.name}</h3>
                        <div>
                            <p className='label price-label'>Start from</p>
                            <p className='value'>${productData.product.startPrice}</p>
                        </div>
                        <Stack className='product-bid-info' gap={1}>
                            <div>
                                <p className='label'>Highest bid:</p>
                                <p className='value'>{productData.highestBid ? `${productData.highestBid}` : '/'}</p>
                            </div>
                            <div>
                                <p className='label'>Number of bids:</p>
                                <p className='value'>{productData.numberOfBids}</p>
                            </div>
                            <div>
                                <p className='label'>Time left:</p>
                                <p className='value'>{productData.timeLeft}</p>
                            </div>
                        </Stack>
                    </Stack>

                    {TokenService.getUserCredentials()?.id !== productData.product.seller.id &&
                        <div className='bid-placement-container'>
                            <TextField
                                disabled={!userLoggedIn}
                                className='bid-input-field'
                                variant='outlined'
                                value={bidAmount}
                                onChange={e => setBidAmount(e.target.value)}
                                error={bidValueError}
                                helperText={bidValueError ? 'Please enter a valid numeric value' : ''}
                                placeholder={`Enter $${productData.highestBid ? Math.round(productData.highestBid + 1) : productData.product.startPrice} or higher`}
                            />
                            <Button
                                disabled={!userLoggedIn}
                                className='place-bid-btn'
                                variant='outlined'
                                endIcon={<img src={bidNowIcon} alt='Bid Now' />}
                                onClick={() => {handlePlaceBid()}}
                            >
                                Place Bid
                            </Button>
                        </div>
                    }

                    <div className='product-details-container'>
                        <div className='tab-selector'>
                            <Button
                                disabled={true}
                                className='tab-selector-btn-active'
                            >
                                Details
                            </Button>
                            <Button
                                disabled={true}
                                className='tab-selector-btn'
                            >
                                Seller information
                            </Button>
                            <Button
                                disabled={true}
                                className='tab-selector-btn'
                            >
                                Customer reviews
                            </Button>
                        </div>
                        <p>{productData.product.description}</p>
                    </div>
                </Stack>
            </div>
        </ThemeProvider>
    );
};

export default ProductOverviewInfo;