import { useSelector } from 'react-redux';
import { Button, Stack, TextField } from '@mui/material';

import bidNowIcon from 'assets/img/bid-now.svg';
import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = ({ productData }) => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

    return (
        <div className="product-overview-info-container">
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
                            <p className="value">{productData.highestBid ? `${productData.highestBid}` : '/'}</p>
                        </div>
                        <div>
                            <p className='label'>Number of bids:</p>
                            <p className="value">{productData.numberOfBids}</p>
                        </div>
                        <div>
                            <p className='label'>Time left:</p>
                            <p className="value">{productData.timeLeft}</p>
                        </div>
                    </Stack>
                </Stack>

                <div className='bid-placement-container'>
                    <TextField
                        disabled={!userLoggedIn}
                        className='bid-input-field'
                        variant='outlined'
                        placeholder={`Enter $${productData.highestBid ? Math.round(productData.highestBid + 1) : productData.product.startPrice} or higher`}
                    />
                    <Button
                        disabled={!userLoggedIn}
                        className='place-bid-btn'
                        variant='outlined'
                        endIcon={<img src={bidNowIcon} alt='Bid Now' />}
                    >
                        Place Bid
                    </Button>
                </div>

                <div className='product-details-container'>
                    <div className="tab-selector">
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
    );
};

export default ProductOverviewInfo;