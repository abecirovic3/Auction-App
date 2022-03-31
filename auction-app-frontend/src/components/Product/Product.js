import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

import wishlistIcon from 'assets/img/wishlist.png';
import bidIcon from 'assets/img/bid-round.png';
import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import 'assets/style/product.scss';

const Product = ({ product, layoutStyle, imageStyle }) => {
    const navigate = useNavigate();

    return (
        <div className='product-container'>
            <div className={layoutStyle}>
                <Link to={`/shop/product-overview/${product.id}`}>
                    <img className={imageStyle} src={product.images[0]?.imageUrl || imagePlaceholder} alt={'Product'}/>
                </Link>
                <div className='product-details'>
                    <div>
                        <Link to={`/shop/product-overview/${product.id}`}>
                            <h3 className='name'>{product.name}</h3>
                        </Link>
                        {layoutStyle === 'horizontal-container' &&
                            <p className='description'>{product.description}</p>
                        }
                    </div>
                    <div>
                        <p className='start-price-label'>{product.highestBid ? 'Highest bid' : 'Start from'}</p>
                        <p className='price-tag'> &nbsp;${product.highestBid ? product.highestBid : product.startPrice}</p>
                    </div>
                    {layoutStyle === 'horizontal-container' &&
                        <div>
                            <Button
                                disabled={true}
                                variant='outlined'
                                endIcon={<img src={wishlistIcon} alt='wishlist'/>}
                            >
                                Wishlist
                            </Button>
                            <Button
                                variant='outlined'
                                endIcon={<img src={bidIcon} alt='bid'/>}
                                onClick={() => {navigate(`/shop/product-overview/${product.id}`)}}
                            >
                                Bid
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

Product.defaultProps = {
    layoutStyle: 'vertical-container',
    imageStyle: 'cover-img'
}

export default Product;