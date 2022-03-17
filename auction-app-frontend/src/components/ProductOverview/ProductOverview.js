import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductService from 'services/ProductService';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';
import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';

import 'assets/style/product-overview.scss';

const ProductOverview = () => {
    const params = useParams();
    const [productData, setProductData] =useState(null);

    useEffect(() => {
        console.log(params.id);
        ProductService.getProductById(params.id)
            .then(response => {
                console.log(response);
                setProductData(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [params.id]);

    return (
        <div className='product-overview-container'>
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