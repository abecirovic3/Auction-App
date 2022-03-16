import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import 'assets/style/product.scss';

const Product = ({ product, imgAlt }) => {
    return (
        <div className='product-container'>
            <img className='cover-img' src={product.images[0]?.imageUrl || imagePlaceholder} alt={imgAlt}/>
            <div className='product-details'>
                <h3 className='name'>{product.name}</h3>
                <p className='start-price-label'>Start from</p>
                <p className='price-tag'> &nbsp;${product.startPrice}</p>
            </div>
        </div>
    );
};

Product.defaultProps = {
    imgAlt: 'Image',
}

export default Product;