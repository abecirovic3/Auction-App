import { Button, Stack, TextField } from '@mui/material';

import bidNowIcon from 'assets/img/bid-now.svg';

import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = () => {

    return (
        <div className="product-overview-info-container">
            <Stack gap={4} >
                <Stack gap={2} >
                    <h3 className='product-name'>Name</h3>
                    <div>
                        <p className='label price-label'>Start from</p>
                        <p className='value'>$50</p>
                    </div>
                    <Stack className='product-bid-info' gap={1}>
                        <div>
                            <p className='label'>Highest bid:</p>
                            <p className="value">$55</p>
                        </div>
                        <div>
                            <p className='label'>Number of bids:</p>
                            <p className="value">1</p>
                        </div>
                        <div>
                            <p className='label'>Time left:</p>
                            <p className="value">10 Weeks 6 days</p>
                        </div>
                    </Stack>
                </Stack>

                <div className='bid-placement-container'>
                    <TextField className='bid-input-field' variant='outlined' placeholder='Smt higher from highest bid' />
                    <Button className='place-bid-btn' variant='outlined' endIcon={<img src={bidNowIcon} alt='Bid Now' />}>Place Bid</Button>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse obcaecati optio rem reprehenderit sunt vel! Alias cum earum fugiat molestias, non qui soluta temporibus. Expedita optio pariatur sint vel!</p>
                </div>
            </Stack>
        </div>
    );
};

export default ProductOverviewInfo;