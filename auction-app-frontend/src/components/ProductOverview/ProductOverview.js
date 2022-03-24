import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductService from 'services/ProductService';
import BiddingService from 'services/BiddingService';
import useLoginService from 'hooks/useLoginService';

import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';
import CustomAlert from 'components/Alert/CustomAlert';
import ProductImageGallery from 'components/ProductImageGallery/ProductImageGallery';
import ProductOverviewInfo from 'components/ProductOverviewInfo/ProductOverviewInfo';

import 'assets/style/product-overview.scss';

const ProductOverview = () => {
    const params = useParams();
    const [product, setProduct] =useState(null);
    const [errorAlert, setErrorAlert] = useState(null);
    const [bidInfoAlerts, setBidInfoAlerts] = useState([]);
    const LoginService = useLoginService();

    useEffect(() => {
        ProductService.getProductById(params.id)
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => {
                setErrorAlert(
                    err.response?.data ||
                    { error: 'Connection Error', message: 'Could not establish connection to server' }
                );
            });
    }, [params.id, bidInfoAlerts]);

    function processBid(productId, bidAmount) {
        BiddingService.placeBid(productId, bidAmount)
            .then(response => {
                setBidInfoAlerts([...bidInfoAlerts, { color: 'success', message: 'Congrats! You are the highest bidder!' }]);
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setBidInfoAlerts([...bidInfoAlerts, { color: 'warning', message: err.response.data.message }]);
                }
                else if (err.response.status === 403) {
                    LoginService.reinitiateLogin();
                } else {
                    setErrorAlert(
                        err.response?.data ||
                        { error: 'Connection Error', message: 'Could not establish connection to server' }
                    );
                }
            });
    }

    return (
        <div className='product-overview-container'>
            {errorAlert && <CustomAlert color='error' title={errorAlert.error} message={errorAlert.message} showAlertDuration={60000}  />}

            {product &&
                <>
                    <BreadCrumbsBar title={product.name} />

                    {bidInfoAlerts.map((infoAlert, i) => (
                        <CustomAlert
                            key={i}
                            color={infoAlert.color}
                            message={infoAlert.message}
                            showAlertDuration={10000}
                            marginBottom={0}
                        />
                    ))}

                    <div className='product-overview-content-container'>
                        <div className='product-image-gallery'>
                            <ProductImageGallery images={product.images} />
                        </div>
                        <div className='product-info'>
                            <ProductOverviewInfo product={product} placeBid={processBid} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductOverview;