import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import imagePlaceholder from 'assets/img/imagePlaceholder.png';

import wishlistHeart from 'assets/img/wishlist-heart.png';

import 'assets/style/account-table.scss';

const AccountWishlist = () => {
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
                        <TableRow>
                            <TableCell>
                                <img
                                    height='80px'
                                    width='80px'
                                    src={imagePlaceholder}
                                    alt="cover"
                                />
                            </TableCell>
                            <TableCell>
                                Name
                                <p className='product-hash'>#12345</p>
                            </TableCell>
                            <TableCell>12h</TableCell>
                            <TableCell>120</TableCell>
                            <TableCell>
                                <Button
                                    className='table-btn'
                                    variant='contained'
                                    color='gray'
                                    fullWidth
                                >
                                    Remove
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    className='table-btn'
                                    variant='outlined'
                                    fullWidth
                                >
                                    Bid
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {
                    <div className='no-data-info-container'>
                        <img src={wishlistHeart} alt='hammer '/>
                        <h3 className='message'>Your wishlist is empty! Start browsing the shop.</h3>
                        <Button
                            className='start-btn'
                            variant='outlined'
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