import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PersonIcon from '@mui/icons-material/Person';

import { ThemeProvider } from '@mui/material';

import MainTheme from 'themes/MainTheme';
import 'assets/style/seller-rating.scss';

const SellerRatingOverview = ({ ratings }) => {

    function getNumberOfRatings() {
        return (ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5'])
    }

    function calculateAverageRating() {
        const numberOfRatings = getNumberOfRatings();
        if (numberOfRatings === 0) {
            return 0;
        }

        return (ratings['1'] + 2 * ratings['2'] + 3 * ratings['3'] + 4 * ratings['4'] + 5 * ratings['5'])
            / numberOfRatings;
    }

    function starsArray() {
        const arr = [];
        let i;
        const avg = calculateAverageRating();
        for (i = 1; i <= avg; i++) {
            arr.push(<StarIcon key={i} color='primary' />);
        }
        if (avg - Math.floor(avg) >= 0.5) {
            arr.push(<StarHalfIcon key={i} color='primary' />);
            i++
        }
        for (let j = i; j <= 5; j++) {
            arr.push(<StarBorderIcon key={j} color='primary' />);
        }
        return arr;
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='seller-rating-overview-container'>
                <div className='average-rating'>
                    <h1 className='avg-rating-value'>{calculateAverageRating().toFixed(1)}</h1>
                    {starsArray()}
                    <div className='ratings-count'>
                        <PersonIcon />
                        <h3 className='count-message'>{getNumberOfRatings()} total</h3>
                    </div>
                </div>
                <div className='rating-bars'>
                    {
                        Object.keys(ratings).map(rating => {
                            let percentage = 0;
                            if (ratings[rating] !== 0) {
                                percentage = Math.round((ratings[rating] / getNumberOfRatings()) * 100);
                            }
                            return (
                                <div className='row' key={rating}>
                                    <div className='bar-rating'>
                                        <StarIcon color='primary' />
                                        <h3>{rating}</h3>
                                    </div>
                                    <div className='bar-outline'>
                                        <div
                                            className='bar'
                                            style={{
                                                width: `${percentage}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SellerRatingOverview;