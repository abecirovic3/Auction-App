import { useLocation } from 'react-router-dom';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';
import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';

import 'assets/style/product-overview.scss';

const ProductOverview = () => {
    const { state } = useLocation();

    return (
        <div className='product-overview-container'>
            <BreadCrumbsBar title='Product Name'/>
            <div className='product-overview-content-container'>
                <div className='product-image-gallery'>
                    <ProductImageGallery images={state.product.images} />
                </div>
                <div className='product-info'>
                    <ProductOverviewInfo product={state.product} />
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;