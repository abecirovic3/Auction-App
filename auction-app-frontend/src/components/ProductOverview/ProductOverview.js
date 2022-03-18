import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductService from 'services/ProductService';
import BiddingService from 'services/BiddingService';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';
import CustomAlert from 'components/Alert/CustomAlert';
import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';

import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';
import 'assets/style/product-overview.scss';
import { Collapse } from '@mui/material';

const ProductOverview = () => {
    const params = useParams();
    const [productData, setProductData] =useState(null);
    const [errorAlert, setErrorAlert] = useState(null);
    const [bidInfoAlert, setBidInfoAlert] = useState(null);


    useEffect(() => {
        ProductService.getProductById(params.id)
            .then(response => {
                setProductData(response.data);
            })
            .catch(err => {
                setErrorAlert(
                    err.response?.data ||
                    { error: 'Connection Error', message: 'Could not establish connection to server' }
                );
            })
    }, [params.id]);

    function processBid(productId, bidAmount) {
        BiddingService.placeBid(productId, bidAmount)
            .then(response => {
                setBidInfoAlert(response.data);
                setTimeout(() => {setBidInfoAlert(null)}, 10000);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='product-overview-container'>
            {errorAlert && <CustomAlert color='error' title={errorAlert.error} message={errorAlert.message} showAlertDuration={60000}  />}

            {productData &&
                <>
                    <BreadCrumbsBar title={productData.product.name} />

                    <Collapse in={bidInfoAlert != null} >
                        <CustomAlert color={bidInfoAlert?.status} message={bidInfoAlert?.message} showAlertDuration={-1} />
                    </Collapse>

                    <div className='product-overview-content-container'>
                        <div className='product-image-gallery'>
                            <ProductImageGallery images={productData.product.images} />
                        </div>
                        <div className='product-info'>
                            <ProductOverviewInfo productData={productData} placeBid={processBid} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductOverview;