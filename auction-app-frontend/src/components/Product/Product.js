import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

import CustomAlert from 'components/Alert/CustomAlert';

import TokenService from 'services/TokenService';
import UserService from 'services/UserService';
import useLoginService from 'hooks/useLoginService';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import BidIcon from '@mui/icons-material/MonetizationOnOutlined';

import 'assets/style/product.scss';

const Product = ({ product, layoutStyle, imageStyle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const loginService = useLoginService();
    const [addedTiWishlist, setAddedToWishlist] = useState(false);
    const [errorAlerts, setErrorAlerts] = useState([]);
    const [hover, setHover] = useState(false);

    function showWishlistButton() {
        return !TokenService.getUserCredentials()?.id ||
            (!product.wishlistedByUser && TokenService.getUserCredentials()?.id !== product.seller?.id)
    }

    function showBidButton() {
        return !TokenService.getUserCredentials()?.id ||
            TokenService.getUserCredentials()?.id !== product.seller?.id;
    }

    function handleAddToWishlist() {
        UserService.addProductToWishlist(product.id)
            .then(response => {
                setAddedToWishlist(true);
            })
            .catch(err => {
                if (err.response?.status === 403) {
                    loginService.reinitiateLogin();
                } else {
                    setErrorAlerts([...errorAlerts, err.response.data]);
                }
            });
    }

    function handleBidAction() {
        navigate(
            `/shop/product-overview/${product.id}`,
            {
                state: {
                    fromShopPage: location.pathname.includes('/shop')
                }
            }
        );
    }

    return (
        <div
            className='product-container'
            onMouseEnter={() => {setHover(layoutStyle === 'vertical-container')}}
            onMouseLeave={() => {setHover(false)}}
        >
            {
                errorAlerts.map((err, i) =>
                    <CustomAlert
                        key={i} color='error'
                        error={err}
                        showAlertDuration={60000}
                        marginBottom='10px'
                    />
                )
            }
            <div
                className='hover-buttons-div'
                style={{
                    display: hover ? 'flex' : 'none',
                }}
            >
                {addedTiWishlist ?
                    <h3 className='added-to-wishlist-msg'>Added to wishlist</h3> :
                    (showWishlistButton() &&
                        <Button
                            color='white'
                            variant='contained'
                            endIcon={<HeartIcon />}
                            disabled={!TokenService.getUserCredentials()?.id}
                            onClick={handleAddToWishlist}
                        >
                            Wishlist
                        </Button>
                    )
                }
                {showBidButton() &&
                    <Button
                        color='white'
                        variant='contained'
                        endIcon={<BidIcon />}
                        disabled={!TokenService.getUserCredentials()?.id}
                        onClick={handleBidAction}
                    >
                        Bid
                    </Button>
                }
            </div>
            <div className={layoutStyle}>
                <Link
                    to={`/shop/product-overview/${product.id}`}
                    state={{
                        fromShopPage: location.pathname.includes('/shop')
                    }}
                >
                    <img
                        className={imageStyle}
                        src={product.images[0]?.imageUrl || imagePlaceholder}
                        alt={'Product'}
                        style={{
                            opacity: hover && layoutStyle === 'vertical-container' ? '50%' : '100%'
                        }}
                    />
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
                            {addedTiWishlist ?
                                <h3 className='added-to-wishlist-msg'>Added to wishlist</h3> :
                                (showWishlistButton() &&
                                    <Button
                                        disabled={!TokenService.getUserCredentials()?.id}
                                        variant='outlined'
                                        endIcon={<HeartIcon />}
                                        onClick={handleAddToWishlist}
                                    >
                                        Wishlist
                                    </Button>
                                )
                            }
                            {showBidButton() &&
                                <Button
                                    disabled={!TokenService.getUserCredentials()?.id}
                                    variant='outlined'
                                    endIcon={<BidIcon />}
                                    onClick={handleBidAction}
                                >
                                    Bid
                                </Button>
                            }
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