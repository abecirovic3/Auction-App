import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import ReviewService from 'services/ReviewService';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import userImagePlaceholder from 'assets/img/profile-placeholder.png';

import 'assets/style/user-review-dialog.scss';
import useLoginService from 'hooks/useLoginService';
import CustomAlert from 'components/Alert/CustomAlert';

const ReviewDialog = ({ skipRating, submitRating, sellerName, sellerImage, userId, reviewerId }) => {
    const [starsRating, setStarsRating] = useState(0);
    const [selectedStarsRating, setSelectedStarsRating] = useState(0);
    const loginService = useLoginService();
    const [errorAlerts, setErrorAlerts] = useState([]);

    useEffect(() => {
        ReviewService.getReviewRating(userId, reviewerId)
            .then(response => {
                setSelectedStarsRating(response.data?.rating || 0);
            })
            .catch(err => {
                if (err.response.status === 403) {
                    loginService.reinitiateLogin();
                } else {
                    setErrorAlerts([...errorAlerts, err.response.data]);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='review-dialog-container'>
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
            <h3 className='heading'>SELLER RATING</h3>
            <img
                className='img-round'
                src={sellerImage || userImagePlaceholder}
                alt='user'
            />
            <p className='name-label'>{sellerName}</p>
            <h2>Please, rate a seller!</h2>
            <div className='stars'>
                <div
                    onMouseEnter={() => {setStarsRating(1)}}
                    onMouseLeave={() => {setStarsRating(0)}}
                    onClick={() => {setSelectedStarsRating(1)}}
                >
                    {(starsRating >= 1 || selectedStarsRating >= 1) ?
                        <StarIcon color='primary' /> :
                        <StarBorderIcon color='primary' />
                    }
                </div>
                <div
                    onMouseEnter={() => {setStarsRating(2)}}
                    onMouseLeave={() => {setStarsRating(0)}}
                    onClick={() => {setSelectedStarsRating(2)}}
                >
                    {(starsRating >= 2 || selectedStarsRating >= 2) ?
                        <StarIcon color='primary' /> :
                        <StarBorderIcon color='primary' />
                    }
                </div>
                <div
                    onMouseEnter={() => {setStarsRating(3)}}
                    onMouseLeave={() => {setStarsRating(0)}}
                    onClick={() => {setSelectedStarsRating(3)}}
                >
                    {(starsRating >= 3 || selectedStarsRating >= 3) ?
                        <StarIcon color='primary' /> :
                        <StarBorderIcon color='primary' />
                    }
                </div>
                <div
                    onMouseEnter={() => {setStarsRating(4)}}
                    onMouseLeave={() => {setStarsRating(0)}}
                    onClick={() => {setSelectedStarsRating(4)}}
                >
                    {(starsRating >= 4 || selectedStarsRating >= 4) ?
                        <StarIcon color='primary' /> :
                        <StarBorderIcon color='primary' />
                    }
                </div>
                <div
                    onMouseEnter={() => {setStarsRating(5)}}
                    onMouseLeave={() => {setStarsRating(0)}}
                    onClick={() => {setSelectedStarsRating(5)}}
                >
                    {(starsRating >= 5 || selectedStarsRating >= 5) ?
                        <StarIcon color='primary' /> :
                        <StarBorderIcon color='primary' />
                    }
                </div>
            </div>
            <div className='button-bar'>
                <Button
                    className='skip-btn'
                    variant='outlined'
                    onClick={() => {skipRating()}}
                >
                    Skip
                </Button>
                <Button
                    disabled={!selectedStarsRating}
                    variant='contained'
                    onClick={() => {submitRating(selectedStarsRating)}}
                >
                    Done
                </Button>
            </div>
        </div>
    );
};

export default ReviewDialog;