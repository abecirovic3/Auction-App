import 'assets/style/product.scss';

const Product = ({ name, startPrice, img, imgAlt }) => {
    return (
        <div className='product-container'>
            <img style={{maxHeight: '350px', maxWidth: '100%', overflow: 'hidden'}} src={img} alt={imgAlt}/>
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