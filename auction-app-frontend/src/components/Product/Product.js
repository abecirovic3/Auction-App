import { useNavigate } from 'react-router-dom';
import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import 'assets/style/product.scss';

const Product = ({ product }) => {
    const navigate = useNavigate();

    function previewProduct() {
        navigate('/shop/product-overview', { state: {product} });
    }

    return (
        <div onClick={() => {previewProduct()}} className='product-container'>
            <img className='cover-img' src={product.images[0]?.imageUrl || imagePlaceholder} alt={'Product'}/>
            <div className='product-details'>
                <h3 className='name'>{product.name}</h3>
                <p className='start-price-label'>Start from</p>
                <p className='price-tag'> &nbsp;${product.startPrice}</p>
            </div>
        </div>
    );
};

export default Product;