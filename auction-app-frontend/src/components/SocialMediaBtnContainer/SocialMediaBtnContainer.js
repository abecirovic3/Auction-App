import { IconButton } from '@mui/material';
import facebookIcon from 'assets/img/navbarFacebook.svg';
import instagramIcon from 'assets/img/navbarInstagram.svg';
import twitterIcon from 'assets/img/navbarTwitter.svg';

const SocialMediaBtnContainer = () => {
    return (
        <div>
            <IconButton sx={{paddingLeft: 0}} onClick={() => {window.open('https://www.facebook.com/AtlantBH'); }}>
                <img src={facebookIcon} alt='Facebook' />
            </IconButton>
            <IconButton onClick={() => {window.open('https://www.instagram.com/atlantbh/?hl=en')}}>
                <img src={instagramIcon} alt='Instagram' />
            </IconButton>
            <IconButton onClick={() => {window.open('https://twitter.com/atlantbh?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor')}}>
                <img src={twitterIcon} alt='Twitter' />
            </IconButton>
        </div>
    );
};

export default SocialMediaBtnContainer;