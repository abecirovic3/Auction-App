import { useState } from 'react';
import { Select, MenuItem, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import gridGrayIcon from 'assets/img/grid-gray.png';
import gridPurpleIcon from 'assets/img/grid-purple.png';
import listGrayIcon from 'assets/img/list-gray.png';
import listPurpleIcon from 'assets/img/list-purple.png';

import MainTheme from 'themes/MainTheme';
import 'assets/style/shop-product-grid.scss';
import Product from 'components/Product/Product';

const ShopProductsGrid = () => {
    const [itemWidth, setItemWidth] = useState(4);

    const products = [
        {
            "id": 6,
            "name": "Blanket",
            "description": "Wool",
            "startPrice": 20.25,
            "startDate": "2022-03-18T12:30:00",
            "endDate": "2022-03-26T13:00:00",
            "images": [],
            "seller": {
                "id": 2,
                "firstName": "Samir",
                "lastName": "Becirovic",
                "email": "samir@gmail.com",
                "password": "$2a$10$.qUGRJSTuULDs5jgAFd3gOJfv4V/Zc0o44DmduZicw9IMtLIzbIXm",
                "role": "ROLE_USER",
                "dateOfBirth": null,
                "phoneNumber": null,
                "photoUrl": null
            },
            "size": null,
            "color": null,
            "highestBid": null,
            "numberOfBids": null
        },
        {
            "id": 7,
            "name": "Chainsaw",
            "description": "STIHL",
            "startPrice": 550.99,
            "startDate": "2022-06-23T03:00:00",
            "endDate": "2022-07-29T03:00:00",
            "images": [
                {
                    "id": 5,
                    "imageUrl": "https://stihlusa-images.imgix.net/Product/2951/ms180.png?w=710&h=532&fit=fill&format=auto&fill=solid"
                }
            ],
            "seller": {
                "id": 2,
                "firstName": "Samir",
                "lastName": "Becirovic",
                "email": "samir@gmail.com",
                "password": "$2a$10$.qUGRJSTuULDs5jgAFd3gOJfv4V/Zc0o44DmduZicw9IMtLIzbIXm",
                "role": "ROLE_USER",
                "dateOfBirth": null,
                "phoneNumber": null,
                "photoUrl": null
            },
            "size": null,
            "color": null,
            "highestBid": null,
            "numberOfBids": null
        },
        {
            "id": 4,
            "name": "CPU",
            "description": "AMD Ryzen",
            "startPrice": 170.99,
            "startDate": "2022-09-12T09:20:00",
            "endDate": "2022-11-21T09:45:00",
            "images": [
                {
                    "id": 4,
                    "imageUrl": "https://cdn.vox-cdn.com/thumbor/U-Odug3YSBUq7R_v6h7loTNQcDE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16331109/3rd_Gen_Ryzen__1_.jpg"
                }
            ],
            "seller": {
                "id": 2,
                "firstName": "Samir",
                "lastName": "Becirovic",
                "email": "samir@gmail.com",
                "password": "$2a$10$.qUGRJSTuULDs5jgAFd3gOJfv4V/Zc0o44DmduZicw9IMtLIzbIXm",
                "role": "ROLE_USER",
                "dateOfBirth": null,
                "phoneNumber": null,
                "photoUrl": null
            },
            "size": null,
            "color": null,
            "highestBid": null,
            "numberOfBids": null
        }
    ];

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='shop-products-grid-container'>
                <div className='sort-and-layout-selector'>
                    <Select className='sort-select' value={1}>
                        <MenuItem value={1}>Default Sorting</MenuItem>
                        <MenuItem value={2}>Other Sorting</MenuItem>
                        <MenuItem value={3}>Some Other Sorting</MenuItem>
                    </Select>
                    <div>
                        <Button
                            id='grid-layout-btn'
                            startIcon={<img src={itemWidth === 4 ? gridPurpleIcon : gridGrayIcon} alt='grid' />}
                            color={itemWidth === 4 ? 'primary' : 'secondary'}
                            onClick={() => {setItemWidth(4)}}
                        >
                            Grid
                        </Button>
                        <Button
                            id='list-layout-btn'
                            startIcon={<img src={itemWidth === 12 ? listPurpleIcon : listGrayIcon} alt='list' />}
                            color={itemWidth === 12 ? 'primary' : 'secondary'}
                            onClick={() => {setItemWidth(12)}}
                        >
                            List
                        </Button>
                    </div>
                </div>
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid key={product.id} item xs={itemWidth}>
                            <Product
                                product={product}
                                layoutStyle={itemWidth === 4 ? 'vertical-container' : 'horizontal-container'}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default ShopProductsGrid;