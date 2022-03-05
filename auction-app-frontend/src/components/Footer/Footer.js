import { Link } from 'react-router-dom';

import '../../assets/style/footer.scss'
import SocialMediaBtnContainer from '../SocialMediaBtnContainer/SocialMediaBtnContainer';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content-container'>
                <div>
                    <h4 className='title'>AUCTION</h4>
                    <Link to='/about' >About Us</Link>
                    <Link to='/terms' >Terms and Conditions</Link>
                    <Link to='/privacy' >Privacy and Policy</Link>
                </div>
                <div>
                    <h4 className='title'>GET IN TOUCH</h4>
                    <h4 className='contact-info'>Call us at +123 797-567-2535</h4>
                    <h4 className='contact-info'>support@auction.com</h4>
                    <SocialMediaBtnContainer />
                </div>
            </div>
        </div>
    );
};

export default Footer;