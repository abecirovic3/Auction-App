import { Button, Stack, TextField } from '@mui/material';

import bidNowIcon from 'assets/img/bid-now.svg';

import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = ({ product }) => {

    return (
        <div className="product-overview-info-container">
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
                            <p className="value">$X</p>
                        </div>
                        <div>
                            <p className='label'>Number of bids:</p>
                            <p className="value">Y</p>
                        </div>
                        <div>
                            <p className='label'>Time left:</p>
                            <p className="value">Z</p>
                        </div>
                    </Stack>
                </Stack>

                <div className='bid-placement-container'>
                    <TextField
                        className='bid-input-field'
                        variant='outlined'
                        placeholder='Smt higher from highest bid'
                    />
                    <Button
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
                    <p>{product.description}</p>
                </div>
            </Stack>
        </div>
    );
};

export default ProductOverviewInfo;