import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import wishlistIcon from 'assets/img/wishlist.png';
import bidIcon from 'assets/img/bid-round.png';
import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import 'assets/style/product.scss';

const Product = ({ product, layoutStyle }) => {
    const navigate = useNavigate();

    function previewProduct() {
        navigate(`/shop/product-overview/${product.id}`);
    }

    return (
        <div onClick={() => {previewProduct()}} className='product-container'>
            <div className={layoutStyle}>
                <img className='cover-img' src={product.images[0]?.imageUrl || imagePlaceholder} alt={'Product'}/>
                <div className='product-details'>
                    <div>
                        <h3 className='name'>{product.name}</h3>
                        {layoutStyle === 'horizontal-container' &&
                            <p className='description'>{product.description}</p>
                        }
                    </div>
                    <div>
                        <p className='start-price-label'>Start from</p>
                        <p className='price-tag'> &nbsp;${product.startPrice}</p>
                    </div>
                    {layoutStyle === 'horizontal-container' &&
                        <div>
                            <Button variant='outlined' endIcon={<img src={wishlistIcon} alt='wishlist'/>}>Wishlist</Button>
                            <Button variant='outlined' endIcon={<img src={bidIcon} alt='bid'/>}>Bid</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

Product.defaultProps = {
    layoutStyle: 'vertical-container'
}

export default Product;