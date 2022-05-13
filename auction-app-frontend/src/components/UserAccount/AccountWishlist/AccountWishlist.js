import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import isPast from 'date-fns/isPast';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import useLoginService from 'hooks/useLoginService';
import UserService from 'services/UserService';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import wishlistHeart from 'assets/img/wishlist-heart.png';

import 'assets/style/account-table.scss';

const AccountWishlist = () => {
    const loginService = useLoginService();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loginService.isUserLoggedIn()
            .then(() => {
                UserService.getAllWishlistedProducts()
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(err => {
                        console.log(err);
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

    function handleDeleteFromWishlist(productId) {
        loginService.isUserLoggedIn()
            .then(() => {
                UserService.removeProductFromWishlist(productId)
                    .then(response => {
                        setProducts(products.filter(product => product.id !== productId));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(() => {
                loginService.setUserLoggedOut();
            });
    }

    return (
        <div className='account-wishlist-container account-table-container'>
            <div className='table-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width='13%'>Item</TableCell>
                            <TableCell width='22%'>Name</TableCell>
                            <TableCell width='13%'>Time left</TableCell>
                            <TableCell width='23%'>Highest bid</TableCell>
                            <TableCell width='17%' />
                            <TableCell width='12%' />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <img
                                            height='80px'
                                            width='80px'
                                            src={product.coverImageUrl || imagePlaceholder}
                                            alt="cover"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {product.name}
                                        <p className='product-hash'>#{product.id}</p>
                                    </TableCell>
                                    <TableCell>{getTimeLeftMessage(product.endDate)}</TableCell>
                                    <TableCell>{product.highestBid || '/'}</TableCell>
                                    <TableCell>
                                        <Button
                                            className='table-btn'
                                            variant='contained'
                                            color='gray'
                                            fullWidth
                                            onClick={() => {handleDeleteFromWishlist(product.id)}}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className='table-btn'
                                            variant='outlined'
                                            fullWidth
                                            onClick={ () => {
                                                navigate(`/shop/product-overview/${product.id}`)
                                            }}
                                        >
                                            {!isPast(new Date(product.end_date)) ?
                                                'Bid' :
                                                'View'
                                            }
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {products.length === 0 &&
                    <div className='no-data-info-container'>
                        <img src={wishlistHeart} alt='hammer '/>
                        <h3 className='message'>Your wishlist is empty! Start browsing the shop.</h3>
                        <Button
                            className='start-btn'
                            variant='outlined'
                            onClick={() => {navigate('/shop')}}
                        >
                            Visit Shop
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AccountWishlist;