import { useState } from 'react';

import image1 from 'assets/img/imagePlaceholder.png';
import image2 from 'assets/img/home-main-product.png';
import image3 from 'assets/img/about1.png';
import image4 from 'assets/img/about3.png';

import 'assets/style/product-image-gallery.scss';

const ProductImageGallery = () => {
    const [mainImage, setMainImage] = useState(image1);

    function handleSetMainImage(image) {
        setMainImage(image);
    }

    return (
        <div className='product-image-gallery-container'>
            <img className='main-image' src={mainImage} alt='Main' />
            <div className='image-selector-container'>
                <img
                    src={image1}
                    alt='Placeholder'
                    className='image-to-select'
                    onClick={() => {handleSetMainImage(image1)}}
                />
                <img
                    src={image2}
                    alt='Placeholder'
                    className='image-to-select'
                    onClick={() => {handleSetMainImage(image2)}}
                />
                <img
                    src={image3}
                    alt='Placeholder'
                    className='image-to-select'
                    onClick={() => {handleSetMainImage(image3)}}
                />
                <img
                    src={image4}
                    alt='Placeholder'
                    className='image-to-select'
                    onClick={() => {handleSetMainImage(image4)}}
                />
                <img
                    src={image4}
                    alt='Placeholder'
                    className='image-to-select'
                    onClick={() => {handleSetMainImage(image4)}}
                />
            </div>
        </div>
    );
};

export default ProductImageGallery;