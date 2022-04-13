import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Stack, TextField, ThemeProvider } from '@mui/material';

import TokenService from 'services/TokenService';
import AuctionTimeUtil from 'utils/AuctionTimeUtil';

import RightArrow from '@mui/icons-material/ArrowForwardIosOutlined';

import MainTheme from 'themes/MainTheme';
import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = ({ product, placeBid }) => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const [bidAmount, setBidAmount] = useState('');
    const [bidValueError, setBidValueError] = useState(false);

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
            placeBid(product.id, parseFloat(bidAmount));
        }
    }

    function showPlaceBidForm() {
        return TokenService.getUserCredentials()?.id !== product.seller.id && !AuctionTimeUtil.auctionEnded(product.endDate);
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='product-overview-info-container'>
                <Stack gap={4} >
                    <Stack gap={2} >
                        <h3 className='product-name'>{product.name}</h3>
                        <div>
                            <p className='label price-label'>Start from</p>
                            <p className='value'>${product.startPrice}</p>
                        </div>
                        <Stack className='product-bid-info' gap={1}>
                            <div>
                                <p className='label'>Highest bid:</p>
                                <p className='value'>{product.highestBid ? `${product.highestBid}` : '/'}</p>
                            </div>
                            <div>
                                <p className='label'>Number of bids:</p>
                                <p className='value'>{product.numberOfBids}</p>
                            </div>
                            <div>
                                <p className='label'>Time left:</p>
                                <p className='value'>{AuctionTimeUtil.getAuctionTimeLeftMessage(product.endDate)}</p>
                            </div>
                        </Stack>
                    </Stack>

                    {showPlaceBidForm() &&
                        <div className='bid-placement-container'>
                            <TextField
                                disabled={!userLoggedIn}
                                className='bid-input-field'
                                variant='outlined'
                                value={bidAmount}
                                onChange={e => setBidAmount(e.target.value)}
                                error={bidValueError}
                                helperText={bidValueError ? 'Please enter a valid numeric value' : ''}
                                placeholder={`Enter $${product.highestBid ? Math.round(product.highestBid + 1) : product.startPrice} or higher`}
                            />
                            <Button
                                disabled={!userLoggedIn}
                                className='place-bid-btn'
                                variant='outlined'
                                endIcon={<RightArrow />}
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
                        <p>{product.description}</p>
                    </div>
                </Stack>
            </div>
        </ThemeProvider>
    );
};

export default ProductOverviewInfo;