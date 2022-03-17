import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductService from 'services/ProductService';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';
import CustomAlert from 'components/Alert/CustomAlert';
import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';
import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';

import 'assets/style/product-overview.scss';

const ProductOverview = () => {
    const params = useParams();
    const [productData, setProductData] =useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        ProductService.getProductById(params.id)
            .then(response => {
                setProductData(response.data);
            })
            .catch(err => {
                setAlert(
                    err.response?.data ||
                    { error: 'Connection Error', message: 'Could not establish connection to server' }
                );
            })
    }, [params.id]);

    return (
        <div className='product-overview-container'>
            {alert && <CustomAlert color='error' title={alert.error} message={alert.message} showAlertDuration={60000}  />}
            {productData &&
                <>
                    <BreadCrumbsBar title={productData.product.name} />
                    <div className='product-overview-content-container'>
                        <div className='product-image-gallery'>
                            <ProductImageGallery images={productData.product.images} />
                        </div>
                        <div className='product-info'>
                            <ProductOverviewInfo productData={productData} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductOverview;