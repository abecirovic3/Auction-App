import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Dialog, Stack, TextField, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TokenService from 'services/TokenService';
import AuctionTimeUtil from 'utils/AuctionTimeUtil';
import PaymentService from 'services/PaymentService';
import useLoginService from 'hooks/useLoginService';
import ReviewService from 'services/ReviewService';

import CustomAlert from 'components/Alert/CustomAlert';
import SellerRatingOverview from 'components/ProductOverviewInfo/SellerRatingOverview';
import ReviewDialog from 'components/ProductOverviewInfo/ReviewDialog';

import RightArrow from '@mui/icons-material/ArrowForwardIosOutlined';
import userImagePlaceholder from 'assets/img/profile-placeholder.png';

import MainTheme from 'themes/MainTheme';
import 'assets/style/product-overview-info.scss';

const ProductOverviewInfo = ({ product, placeBid }) => {
    const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
    const loginService = useLoginService();
    const [bidAmount, setBidAmount] = useState('');
    const [bidValueError, setBidValueError] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loadingProductStatus, setLoadingProductStatus] = useState(true);
    const isInitialMount = useRef(true);
    const [errorAlerts, setErrorAlerts] = useState([]);
    const [activeTab, setActiveTab] = useState({ details: true, reviews: false });
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get(
            'session_id'
        );
        if (sessionId && !product.sold && showPayForm()) {
            loginService.isUserLoggedIn()
                .then(() => {
                    PaymentService.getPaymentSessionStatus(sessionId)
                        .then(response => {
                            setPaymentStatus(response.data['payment_status']);
                        })
                        .catch(err => {
                            if (err.response.status === 403) {
                                loginService.reinitiateLogin();
                            } else {
                                setErrorAlerts([...errorAlerts, err.response.data]);
                            }
                            setLoadingProductStatus(false);
                        })
                })
                .catch(() => {
                    loginService.reinitiateLogin();
                })
        } else if (product.sold) {
            setPaymentStatus('succeeded');
        } else {
            setLoadingProductStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const isReview = new URLSearchParams(window.location.search).get('review');
        if (!!isReview && product.sold
            && TokenService.getUserCredentials()?.id === product.highestBidder.id) {
            loginService.isUserLoggedIn()
                .then(() => {
                    setShowReviewDialog(true);
                })
                .catch(() => {
                    loginService.reinitiateLogin();
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setLoadingProductStatus(false);
        }
    }, [paymentStatus])

    function validateBid() {
        if (isNaN(parseFloat(bidAmount))) {
            setBidValueError(true);
            return false;
        } else {
            setBidValueError(false);
            return true;
        }
    }

    function handlePlaceBid() {
        if (validateBid()) {
            setBidAmount(parseFloat(bidAmount).toString());
            placeBid(product.id, parseFloat(bidAmount));
        }
    }

    function showPlaceBidForm() {
        return TokenService.getUserCredentials()?.id !== product.seller.id &&
            !AuctionTimeUtil.auctionEnded(product.endDate);
    }

    function showPayForm() {
        return AuctionTimeUtil.auctionEnded(product.endDate) && TokenService.getUserCredentials()?.id &&
            TokenService.getUserCredentials()?.id === product.highestBidder?.id
    }

    function handlePay() {
        PaymentService.initiatePayment({
            product: {
                id: product.id
            },
            buyer: {
                id: TokenService.getUserCredentials()?.id
            }
        })
            .then(response => {
                window.open(response.data.url, '_self');
            })
            .catch(err => {
                if (err.response.status === 403) {
                    loginService.reinitiateLogin();
                } else {
                    setErrorAlerts([...errorAlerts, err.response.data]);
                }
            });
    }

    function getPayFormElement() {
        if (paymentStatus === 'succeeded') {
            return <h1 className='sold-message'>SOLD</h1>
        } else if (paymentStatus === 'processing') {
            return <h2 className='processing-payment-message'>Processing payment...</h2>
        } else if (paymentStatus === 'requires_payment_method') {
            return <h2 className='processing-payment-message'>Payment details needed</h2>
        } else {
            return <h2 className='payment-failed'>Payment unsuccessful</h2>
        }
    }

    function handleSkipRating() {
        handleDialogClose();
    }

    function handleSubmitRating(rating) {
        ReviewService.postReview({
            user: {
                id: product.seller?.id
            },
            reviewer: {
                id: TokenService.getUserCredentials()?.id
            },
            rating: rating
        })
            .then(response => {
                console.log(response);
                navigate(`/shop/product-overview/${product.id}`);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                handleDialogClose();
            });
    }

    function handleDialogClose() {
        setShowReviewDialog(false);
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <Dialog
                open={showReviewDialog}
                onClose={handleDialogClose}
            >
                <ReviewDialog
                    skipRating={handleSkipRating}
                    submitRating={handleSubmitRating}
                    sellerName={product.seller.fullName}
                    sellerImage={product.seller.photoUrl}
                    userId={product.seller.id}
                    reviewerId={TokenService.getUserCredentials()?.id}
                />
            </Dialog>
            <div className='product-overview-info-container'>
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
                <Stack gap={4} >
                    <Stack gap={2} >
                        <h3 className='product-name'>{product.name}</h3>
                        <div>
                            <p className='label price-label'>Start from</p>
                            <p className='value'>${product.startPrice}</p>
                        </div>
                        <Stack className='product-bid-info' gap={1}>
                            <div>
                                <p className='label'>Highest bid:</p>
                                <p className='value'>{product.highestBid ? `${product.highestBid}` : '/'}</p>
                            </div>
                            <div>
                                <p className='label'>Number of bids:</p>
                                <p className='value'>{product.numberOfBids}</p>
                            </div>
                            <div>
                                <p className='label'>Time left:</p>
                                <p className='value'>{AuctionTimeUtil.getAuctionTimeLeftMessage(product.endDate)}</p>
                            </div>
                        </Stack>
                    </Stack>

                    {showPlaceBidForm() &&
                        <div className='bid-placement-container'>
                            <TextField
                                disabled={!userLoggedIn}
                                className='bid-input-field'
                                variant='outlined'
                                value={bidAmount}
                                onChange={e => setBidAmount(e.target.value)}
                                error={bidValueError}
                                helperText={bidValueError ? 'Please enter a valid numeric value' : ''}
                                placeholder={`Enter $${product.highestBid ? Math.round(product.highestBid + 1) : product.startPrice} or higher`}
                            />
                            <Button
                                disabled={!userLoggedIn}
                                className='form-btn'
                                variant='outlined'
                                endIcon={<RightArrow />}
                                onClick={() => {handlePlaceBid()}}
                            >
                                Place Bid
                            </Button>
                        </div>
                    }

                    {showPayForm() &&
                        <div className='pay-form-container'>
                            <div className='seller-info-container'>
                                <p className='label'>Seller:</p>
                                <img
                                    className='img-round'
                                    src={product.seller?.photoUrl || userImagePlaceholder}
                                    alt='user'
                                />
                                <p>{product.seller?.firstName + ' ' + product.seller?.lastName}</p>
                            </div>
                            {loadingProductStatus ?
                                <CircularProgress /> :
                                (!paymentStatus ?
                                        <Button
                                            disabled={!userLoggedIn}
                                            className='form-btn'
                                            variant='outlined'
                                            endIcon={<RightArrow />}
                                            onClick={handlePay}
                                        >
                                            Pay
                                        </Button> :
                                        getPayFormElement()
                                )
                            }
                        </div>
                    }

                    <div className='product-details-container'>
                        <div className='tab-selector'>
                            <Button
                                className={activeTab['details'] ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                                onClick={() => {
                                    setActiveTab({
                                        details: true,
                                        reviews: false
                                    })
                                }}
                            >
                                Details
                            </Button>
                            <Button
                                disabled={true}
                                className='tab-selector-btn'
                            >
                                Seller information
                            </Button>
                            <Button
                                className={activeTab['reviews'] ? 'tab-selector-btn-active' : 'tab-selector-btn'}
                                onClick={() => {
                                    setActiveTab({
                                        details: false,
                                        reviews: true
                                    })
                                }}
                            >
                                Customer reviews
                            </Button>
                        </div>
                        {activeTab.details ?
                            <p>{product.description}</p> :
                            <div>
                                <div className='seller-review-heading'>
                                    <img
                                        className='img-round'
                                        src={product.seller?.photoUrl || userImagePlaceholder}
                                        alt='user'
                                    />
                                    <p>{product.seller?.firstName + ' ' + product.seller?.lastName}</p>
                                </div>
                                <SellerRatingOverview ratings={product.seller.ratingCounters} />
                            </div>
                        }
                    </div>
                </Stack>
            </div>
        </ThemeProvider>
    );
};

export default ProductOverviewInfo;