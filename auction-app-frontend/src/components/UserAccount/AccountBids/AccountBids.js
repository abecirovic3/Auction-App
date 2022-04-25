import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';


import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import isPast from 'date-fns/isPast'

import UserService from 'services/UserService';
import useLoginService from 'hooks/useLoginService';

import CustomAlert from 'components/Alert/CustomAlert';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import hammer from 'assets/img/auction-hammer.png';

import 'assets/style/account-table.scss';

const AccountBids = () => {
    const loginService = useLoginService();
    const navigate = useNavigate();

    const [bids, setBids] = useState([]);
    const [errorAlerts, setErrorAlerts] = useState([]);

    useEffect(() => {
        loginService.isUserLoggedIn()
            .then(() => {
                UserService.getAllBids()
                    .then(response => {
                        setBids(response.data);
                    })
                    .catch(err => {
                        if (err.response.status === 403) {
                            loginService.setUserLoggedOut();
                        } else {
                            setErrorAlerts([...errorAlerts, err.response.data]);
                        }
                    });
            })
            .catch(() => {
                loginService.setUserLoggedOut();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getTimeLeftMessage(endDate) {
        if (isPast(new Date(endDate))) {
            return 'Auction ended';
        }
        return formatDistanceToNowStrict(new Date(endDate));
    }

    function handleTableButtonClick(productId, auctionEndDate, userBid, highestBid) {
        if (!isPast(auctionEndDate) || userBid !== highestBid) {
            navigate(`/shop/product-overview/${productId}`)
        } else {
            console.log('Redirect to payment form');
        }
    }

    return (
        <div className='account-bids-container account-table-container'>
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
            <div className='table-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width='13%'>Item</TableCell>
                            <TableCell width='22%'>Name</TableCell>
                            <TableCell width='13%'>Time left</TableCell>
                            <TableCell width='13%'>Your price</TableCell>
                            <TableCell width='13%'>No. bids</TableCell>
                            <TableCell width='13%'>Highest bid</TableCell>
                            <TableCell width='13%' />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bids.map(bid => (
                                <TableRow key={bid.product?.id}>
                                    <TableCell>
                                        <img
                                            height='80px'
                                            width='80px'
                                            src={bid.product?.images[0]?.imageUrl || imagePlaceholder}
                                            alt="cover"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {bid.product?.name}
                                        <p className='product-hash'>#{bid.product?.id}</p>
                                    </TableCell>
                                    <TableCell>{getTimeLeftMessage(bid.product?.endDate)}</TableCell>
                                    <TableCell>{bid.amount}</TableCell>
                                    <TableCell>{bid.product?.numberOfBids}</TableCell>
                                    <TableCell>{bid.product?.highestBid}</TableCell>
                                    <TableCell>
                                        <Button
                                            className='table-btn'
                                            variant='outlined'
                                            onClick={() => {
                                                handleTableButtonClick(
                                                    bid.product?.id,
                                                    new Date(bid.product?.endDate),
                                                    bid.amount,
                                                    bid.product?.highestBid
                                                )
                                            }}
                                        >
                                            {isPast(new Date(bid.product?.endDate)) ?
                                                (bid.amount === bid.product?.highestBid ? 'Pay' : 'View') :
                                                'Bid'
                                            }
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {bids.length === 0 &&
                    <div className='no-data-info-container'>
                        <img src={hammer} alt='hammer '/>
                        <h3 className='message'>You don’t have any bids and there are so many cool products available for sale.</h3>
                        <Button
                            className='start-btn'
                            variant='outlined'
                            onClick={() => {navigate('/shop')}}
                        >
                            Start Bidding
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AccountBids;