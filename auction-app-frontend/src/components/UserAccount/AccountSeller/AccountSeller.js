import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import UserService from 'services/UserService';
import useLoginService from 'hooks/useLoginService';

import imagePlaceholder from 'assets/img/imagePlaceholder.png';
import cartIcon from 'assets/img/cart.png';

import 'assets/style/account-seller.scss';
import 'assets/style/account-table.scss';
import CustomAlert from 'components/Alert/CustomAlert';

const AccountSeller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const loginService = useLoginService();
    const [errorAlerts, setErrorAlerts] = useState([]);

    useEffect(() => {
        loginService.isUserLoggedIn()
            .then(() => {
                UserService.getAllProducts()
                    .then(response => {
                        setProducts(response.data);
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

    return (
      <div className='account-seller-container account-table-container'>
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
          <div>
              <Button
                  className='btn-tab'
                  variant='contained'
              >
                  Active
              </Button>
              <Button
                  disabled={true}
                  className='btn-tab btn-inactive'
                  variant='outlined'
                  color='dark'
              >
                  Sold
              </Button>
          </div>
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
                          products.map(product => (
                              <TableRow key={product.id}>
                                  <TableCell>
                                      <img
                                          height='80px'
                                          width='80px'
                                          src={product.images[0]?.imageUrl || imagePlaceholder}
                                          alt="cover"
                                      />
                                  </TableCell>
                                  <TableCell>
                                      {product.name}
                                      <p className='product-hash'>#{product.id}</p>
                                  </TableCell>
                                  <TableCell>{formatDistanceToNowStrict(new Date(product.endDate))}</TableCell>
                                  <TableCell>$ {product.startPrice}</TableCell>
                                  <TableCell>{product.numberOfBids || '/'}</TableCell>
                                  <TableCell>{product.highestBid ? `$ ${product.highestBid}` : '/'}</TableCell>
                                  <TableCell>
                                      <Button
                                          className='table-btn'
                                          variant='outlined'
                                          onClick={() => {navigate(`/shop/product-overview/${product.id}`)}}
                                      >
                                          View
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))
                      }
                  </TableBody>
              </Table>
              {products.length === 0 &&
                  <div className='no-data-info-container'>
                      <img src={cartIcon} alt='cart '/>
                      <h3 className='message'>You do not have any scheduled items for sale.</h3>
                      <Button
                          className='start-btn'
                          variant='outlined'
                          onClick={() => {navigate('/account/add-item')}}
                      >
                          Start Selling
                      </Button>
                  </div>
              }
          </div>
      </div>
    );
};

export default AccountSeller;
