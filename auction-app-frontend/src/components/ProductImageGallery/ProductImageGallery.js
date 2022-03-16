import { useState } from 'react';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import 'assets/style/product-image-gallery.scss';

const ProductImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]?.imageUrl || imagePlaceholder);

    function handleSetMainImage(imageUrl) {
        setMainImage(imageUrl);
    }

    return (
        <div className='product-image-gallery-container'>
            <img className='main-image' src={mainImage} alt='Main' />
            <div className='image-selector-container'>
                {
                    images.map((image, i) => (
                        <img
                            key={i}
                            src={image.imageUrl}
                            alt='Placeholder'
                            className='image-to-select'
                            onClick={() => {handleSetMainImage(image.imageUrl)}}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ProductImageGallery;