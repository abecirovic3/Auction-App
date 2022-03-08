import { useSelector } from 'react-redux';
import { AppBar } from '@mui/material';

import NavbarTop from 'components/Navbar/NavbarTop/NavbarTop';
import NavbarBottom from 'components/Navbar/NavbarBottom/NavbarBottom';

const Navbar = () => {
    const isSetNotFoundError = useSelector((state) => state.notFoundHandler.notFoundError);

    return (
        <AppBar
            position='fixed'
            sx={{
                boxShadow: 'none',
                backgroundColor: 'white'
            }}
        >
            <NavbarTop />
            {!isSetNotFoundError && <NavbarBottom />}
        </AppBar>
    );
};

export default Navbar;