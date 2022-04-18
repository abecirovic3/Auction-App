import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import hammer from 'assets/img/auction-hammer.png';

import 'assets/style/account-table.scss';

const AccountBids = () => {
    return (
        <div className='account-bids-container account-table-container'>
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
                            <TableCell>$ 80</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>120</TableCell>
                            <TableCell>
                                <Button
                                    className='table-btn'
                                    variant='outlined'
                                >
                                    Bid
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {
                    <div className='no-data-info-container'>
                        <img src={hammer} alt='hammer '/>
                        <h3 className='message'>You don’t have any bids and there are so many cool products available for sale.</h3>
                        <Button
                            className='start-btn'
                            variant='outlined'
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