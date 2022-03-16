import { Button, TextField } from '@mui/material';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import 'assets/style/product-overview.scss';
import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';

const ProductOverview = () => {
    return (
        <div className='product-overview-container'>
            <BreadCrumbsBar title='Product Name'/>
            <div className='product-overview-content-container'>
                <div className='product-image-gallery'>
                    <ProductImageGallery />
                </div>
                <div className='product-info'>
                    <h1>Name</h1>
                    <p>Start price</p>
                    <div className='product-bid-info'>
                        <p>Highest bid</p>
                        <p>Number of bids</p>
                        <p>Time left</p>
                    </div>
                    <div className='bid-placement-container'>
                        <TextField variant='outlined' placeholder='Smt higher from highest bid' />
                        <Button variant='outlined'>Place Bid</Button>
                    </div>
                    <div className='product-details'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse obcaecati optio rem reprehenderit sunt vel! Alias cum earum fugiat molestias, non qui soluta temporibus. Expedita optio pariatur sint vel!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;