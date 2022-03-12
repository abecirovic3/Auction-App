import 'assets/style/product.scss';

const Product = ({ name, startPrice, img, imgAlt }) => {
    return (
        <div className='product-container'>
            <img src={img} alt={imgAlt}/>
            <div className='product-details'>
                <h3 className='name'>{name}</h3>
                <p className='start-price-label'>Start from</p>
                <p className='price-tag'> &nbsp;${startPrice}</p>
            </div>
        </div>
    );
};

Product.defaultProps = {
    imgAlt: 'Image',
}

export default Product;