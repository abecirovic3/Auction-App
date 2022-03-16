import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';
import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';

import 'assets/style/product-overview.scss';

const ProductOverview = () => {
    return (
        <div className='product-overview-container'>
            <BreadCrumbsBar title='Product Name'/>
            <div className='product-overview-content-container'>
                <div className='product-image-gallery'>
                    <ProductImageGallery />
                </div>
                <div className='product-info'>
                    <ProductOverviewInfo />
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;