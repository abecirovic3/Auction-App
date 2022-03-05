import { AppBar } from '@mui/material';
import NavbarTop from './NavbarTop/NavbarTop';
import NavbarBottom from './NavbarBottom/NavbarBottom';

const Navbar = () => {
    return (
        <AppBar
            position='fixed'
            sx={{
                boxShadow: 'none',
                backgroundColor: 'white'
            }}
        >
            <NavbarTop />
            <NavbarBottom />
        </AppBar>
    );
};

export default Navbar;