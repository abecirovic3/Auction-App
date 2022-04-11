import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import BidIcon from '@mui/icons-material/MonetizationOnOutlined';

import 'assets/style/product.scss';

const Product = ({ product, layoutStyle, imageStyle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='product-container'>
            <div className={layoutStyle}>
                <Link
                    to={`/shop/product-overview/${product.id}`}
                    state={{
                        fromShopPage: location.pathname.includes('/shop')
                    }}
                >
                    <img className={imageStyle} src={product.images[0]?.imageUrl || imagePlaceholder} alt={'Product'}/>
                </Link>
                <div className='product-details'>
                    <div>
                        <Link
                            to={`/shop/product-overview/${product.id}`}
                            state={{
                                fromShopPage: location.pathname.includes('/shop')
                            }}
                        >
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
                                endIcon={<HeartIcon />}
                            >
                                Wishlist
                            </Button>
                            <Button
                                variant='outlined'
                                endIcon={<BidIcon />}
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